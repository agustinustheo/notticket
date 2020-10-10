import React, {useState } from 'react'
import logoImg from '../../../src/notticket.png'
import styles from '../../app/style.css'
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


const Button = styled.div`
    display:flex;
    align-items:center;
    border: solid 2px #FFC20F;
    margin:1rem;
    width: 100%;
    padding: 1rem;
    background:#FFC20F;
    justify-content: center;
    font-size:2rem;
    border-radius:10px;
    transition: all .5s;

    &:hover {
        background: #FFC20F;
        color: black;
        cursor: pointer;
    }
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
                        <div style={{"textAlign": "center"}}>
                            <img id="imgnya" src={logoImg} alt="logo"></img>
                        </div>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <input id="email" type="text" name="email" placeholder="Enter Your email"  
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}></input>
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" name="password" placeholder="Enter Your Password"></input>
                        </div>
                        <p style={{color:"black", "fontSize": "1.3rem"}}>Dont have an Account? <Link to="/register">Sign Up Here</Link></p>
                    </div>
                    <div className="loaderClass">
                        {isLoaded ? 
                    <LoadingContainer style={{"opacity": "0", "display": "none"}}><Loader/></LoadingContainer> :
                    <LoadingContainer style={{"opacity": "1", "display": "flex"}}><Loader/></LoadingContainer>  }
                    </div>
                </div>
                <Button onClick={postLogin}>
                    LOGIN
                </Button>
                </div>
            </div>
            </div>
        )
}
    
export default Login