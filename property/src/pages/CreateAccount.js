import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateAccount() {
  const [token,setToken] = useState("");  
  const history = useHistory();
  const location = useLocation();
  const [signUpData, setSignupData] = useState({name:"",
                                                email : "",
                                                password: "" ,
                                                user_type: "",
                                                mobile : " "
                                              });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.user_type === "") {
      errors.user_type = "Please Select Uesr TYPE";
    }
    if (inputValues.name = "") {
      errors.name = "Name is required";
    }
    
    if (inputValues.email.length < 15) {
      errors.email = "Email is too short";
    }
    if (inputValues.password.length < 5) {
      errors.password = "Password is too short";
    }
    if ( inputValues.mobile < 18) {
      errors.mobile = "Minimum age is 18";
    }
    return errors;
  };
     // <!---Change Input Values---!>
   const handelChange = (e) => {
    const value = e.target.value;
    setSignupData({...signUpData,[e.target.name]: value});
  };

  // <!---  Submit Login---!>
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {user_type:signUpData.user_type ,name : signUpData.name,email: signUpData.email, password: signUpData.password, mobile : signUpData.mobile};
   console.log("regid", userData)
    axios.post("http://192.168.68.102/api/api/register",userData,{headers: {
                                                                      // 'Authorization': `bearer ${token}`,
                                                                         'Content-Type' : 'multipart/form-data','connection' :'keep-alive','Accept': 'application/json'
                                                                        }
                                                              })
    .then((response) => {
                          if(response.status === 200){
                              if(response.data.user.user_type === 0){
                                    console.log("login", location.state);
                                history.push({pathname : "/app/Home", })
                                setToken(response.data.authorization.token)
                              }else{
                                    history.push({pathname : "/app/Dashboard"})
                                    setToken(response.data.authorization.token)
                                    }
                                                    }else if (response.status !== 200 ){
                                                      setErrors(validateValues(signUpData));
                                                      setSubmitting(true)
                                                    }
                         
        
          })
    .catch((err) => {
      
                      toast(err.message)
                      })
}

const finishSubmit = () => {
  console.log(setSignupData);
};
useEffect(() => {
  if (Object.keys(errors).length === 0 && submitting) {
    finishSubmit();
  }
}, [errors]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <ToastContainer/>
              {Object.keys(errors).length === 0 && submitting ? 
                   ( <span className="success">Successfully submitted ✓</span>  )

             : null}
              <form onSubmit={handleSubmit}>
                <Label>I am</Label>
                <Label  className="mt-4" radio>
                <Input type="radio" name="usertype" id="user" value={signUpData.user_type = 1}  onChange={handelChange}/>
                <span className="ml-3 mr-3">User</span>
                </Label>
                <Label radio>
                <Input type="radio" name="usertype" id="agent" value={signUpData.user_type = 2} onChange={handelChange}/>
                <span className="ml-3 mr-3">Agent</span>
                </Label><Label  radio>
                <Input type="radio" name="usertype" id="builder" value={signUpData.user_type = 3} onChange={handelChange}/>
                <span className="ml-3 mr-3">Builder/Owner</span>
                </Label>
                {errors.user_type ? (<p className="error">Email should be at least 15 characters long</p>) : null} 
              <Label className="mt-4">
                <span>Name</span>
                <Input className="mt-1" type="text" placeholder="Please Enter Name *" name ="name" value={signUpData.name} onChange={handelChange}/>
              </Label>
              {errors.name ? (<p className="error">Email should be at least 15 characters long</p>) : null}
              <Label className="mt-4">
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" name ="email" value={signUpData.email} onChange={handelChange} />
              </Label>
              {errors.email ? (<p className="error">Email should be at least 15 characters long</p>) : null}
              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" placeholder="***************" type="password"  name ="password" value={signUpData.password} onChange={handelChange} />
              </Label>
              {errors.password ? (<p className="error">Email should be at least 15 characters long</p>) : null}
              <Label className="mt-4">
                <span>Mobile Number</span>
                <Input className="mt-1" placeholder="please enter mobile number *" type="number" name ="mobile" value={signUpData.mobile} onChange={handelChange} />
              </Label>
              {errors.mobile ? (<p className="error">Email should be at least 15 characters long</p>) : null}
              {/* <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label> */}
              <Button block className="mt-4" type="submit">
                Create account
              </Button>
              </form>
              
              <hr className="my-8" />
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/app/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
