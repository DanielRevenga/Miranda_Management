import axios from "axios";
import { useState } from "react";
import { MainContainer } from "../../styles/components/MainContainer";

interface userData {
   username: string;
   password: string;
}
      
export default function Register() {

   const [registerUsername, setRegisterUsername] = useState("");
   const [registerPassword, setRegisterPassword] = useState("");
   const [loginUsername, setLoginUsername] = useState("");
   const [loginPassword, setLoginPassword] = useState("");
   const [userData, setUserData] = useState<userData>({
      username: "",
      password: ""
   });
   
   const registerHandler = () => {
      axios({
         method: "post",
         data: {
            username: registerUsername,
            password: registerPassword
         },
         withCredentials: true,
         url: "http://localhost:5000/register",
      }).then((res) => console.log(res));
   };
   const loginHandler = () => {
      axios({
         method: "post",
         data: {
            username: loginUsername,
            password: loginPassword
         },
         withCredentials: true,
         url: "http://localhost:5000/login",
      }).then((res) => console.log(res));
   };
   const getUserHandler = () => {
      axios({
         method: "get",
         withCredentials: true,
         url: "http://localhost:5000/user",
      }).then((res) => {
         setUserData(res.data);
         console.log(res.data);
      }) 
   };

   return (
   
      <MainContainer>
         {/* REGISTER */}
         <div>
            <h2>Register</h2>
            <input type="text" name="registerUsername" placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
            <input type="text" name="registerPassword" placeholder="password" onChange={e => setRegisterPassword(e.target.value)} />

            <button onClick={registerHandler}>Submit</button>
         </div>

         {/* LOGIN */}
         <div>
            <h2>Login</h2>
            <input type="text" name="loginUsername" placeholder="username" onChange={e => setLoginUsername(e.target.value)} />
            <input type="text" name="loginPassword" placeholder="password" onChange={e => setLoginPassword(e.target.value)} />

            <button onClick={loginHandler}>Submit</button>
         </div>

         {/* USER */}
         <div>
            <h2>Get User</h2>

            <button onClick={getUserHandler}>Submit</button>

            {
               userData.username 
                  ? <h1>Welcome Back {userData.username}</h1>
                  : null
            }
         </div>
      </MainContainer>
         
   );
}