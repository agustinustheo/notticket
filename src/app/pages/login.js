import React, {useState } from 'react'
import logoImg from '../../../src/notticket.png'
import styles from '../../app/style.css'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios' 
import { BaseURL } from "../constant/variables";
import { showAlert } from '../constant/functions';
import styled from "styled-components";
import Loader from "../pages/components/loader";

const LoadingContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    height: 100%;
    align-items: center;
    z-index: 99;
    position: fixed;
`

function Login(){
    const [isLoaded, setIsLoaded] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const postLogin = () =>{
       let email = document.getElementById('email').value
       let password = document.getElementById('password').value

       if(email.length === 0 || password.lengt === 0){
           showAlert("Email and password must be filled",0)
       }
       else{
            setIsLoaded(false)
            const token = Buffer.from(`${email}.${password}`, 'utf8').toString('base64')
        
            var config = {
                headers: { 
                'Authorization': `Basic ${token}`,
                'Content-type': 'application/json'
                }
            }
    
            Axios.post(`${BaseURL}/user/login`,{
                email,
                password
            }, config).then(response => {
                console.log(response)
            }).catch(err => {
                setIsLoaded(true)
                showAlert("Error", 0)
            })
       }
       

    }
        return(
            <div className="App">
            <div className="Login">
            <div className="containerZ">
                <div className="content">
               
                    <div className="image">
                        <img src={logoImg} alt="logo"></img>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" name="email" placeholder="Enter Your email"  
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input id="password" type="password" name="password" placeholder="Enter Your Password"></input>
                        </div>
                        <h5 style={{color:"white"}}>Dont have an Account? <Link to="/register">Sign Up Here</Link></h5>
                    </div>
                    <div className="loaderClass">
                        {isLoaded ? 
                    <LoadingContainer style={{"opacity": "0", "display": "none"}}><Loader/></LoadingContainer> :
                    <LoadingContainer style={{"opacity": "1", "display": "flex"}}><Loader/></LoadingContainer>  }
                    </div>
                </div>
                <div className="footer">
                <Button variant="warning" size="lg" block onClick={postLogin}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                </Button>
                </div>
                </div>
              
            </div>
            </div>
        )
}
    export default Login