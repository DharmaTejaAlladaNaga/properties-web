import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const[befoerLogin, setBeforeLogin] = useState(["Login", "Create Account"]);
  const[afterLogin, setAfterLogin] = useState(["View Profile", "Update Profile", "Logout"]);
  const [token,setToken] = useState("");  
  const [loginData, setLoginData] = useState({email:"", password: "" });
  const history = useHistory();
  const location = useLocation();
  
  // <!---Change Input Values---!>
  const handelChange = (e) => {
                                const value = e.target.value;
                                setLoginData({...loginData,[e.target.name]: value});
                              };
  // <!---  Submit Login---!>
  const handleSubmit = (e) => {
                                e.preventDefault();
                                const userData = {email: loginData.email, password: loginData.password};
                                axios.post("http://192.168.68.102/api/api/login",userData,{headers: {
                                                                                                  // 'Authorization': `bearer ${token}`,
                                                                                                     'Content-Type' : 'multipart/form-data','connection' :'keep-alive','Accept': 'application/json'
                                                                                                    }
                                                                                          })
                                .then((response) => {
                                                      if(response.status === 200){
                                  
                                                          if(response.data.user.user_type === 0){
                                                                alert("Logged in Success")
                                                            history.push({pathname : "/app/Home",  ...location.state = true  })
                                                            setToken(response.data.authorization.token)
                                                          }else{
                                                                history.push({pathname : "/app/Dashboard"})
                                                                setToken(response.data.authorization.token)
                                                                }
                                                                                }
                                                     
                                    
                                      })
                                .catch((err) => {
                                  
                                                  toast(err.message)
                                                  })
              }

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
          <ToastContainer />
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
             <form onSubmit={handleSubmit}>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" name="email" value={loginData.email} onChange={handelChange}/>
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="***************" name="password" value={loginData.password} onChange={handelChange} />
              </Label>

              <Button className="mt-4" type="submit">
                Log in
              </Button>
              </form>
              <hr className="my-8" />

              {/* <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/app/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/app/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
