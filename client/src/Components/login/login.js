import React from "react";
import "./login.css"  
import {useNavigate} from "react-router-dom"
function Login(props)
{

const navigate = useNavigate();

    return(
        <div class="login-page">
  <div class="form">
    <form class="register-form">
      <input type="text" placeholder="name"/>
      <input type="password" placeholder="password"/>
      <input type="text" placeholder="email address"/>
      <button>create</button>
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    <form class="login-form">
      <input type="text" placeholder="מספר זהות"/>
      <input type="password" placeholder="סיסמה"/>
      <button 
      onClick={()=>navigate("/Home")}
      >login</button>
    </form>
  </div>
</div>
    )
}

export default Login