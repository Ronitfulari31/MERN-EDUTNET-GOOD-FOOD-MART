import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
const Login = () => {
  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const onChangeInput = e => {
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }

  const loginSubmit =async e => {
    e.preventDefault()
    try{
      await axios.post('/user/login',{...user})

      localStorage.setItem('firstLogin',true)

      window.location.href = "/"
      
    }catch(err){
      alert(err.response.data.msg)
    }
  }


  return (

    <div > {/* Wrap everything in the container */}
      <div className="image-container"> {/* Image container above */}
        image here!!<img src="" alt="" /> {/* Replace with your image path */}
      </div>
      <br>
      </br>

      <div className="login-box"> {/* Styles for login box */}
        <h2>Log In to Your Account</h2>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
          />
          
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
          />

          <div className="row">
            <button type="submit">Login</button>
            <p>No account? <Link to="/register" >Create one here</Link></p>
          </div>
        </form>

      </div>
      
    </div>
    

    
    
  )
}

export default Login
