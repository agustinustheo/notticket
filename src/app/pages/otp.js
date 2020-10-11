import React, {useState } from 'react'
import styled from "styled-components";
import styles from '../../app/style.css'
import Loader from "./components/loader";
import { BaseURL } from "../constant/variables";
import logoImg from '../../../src/notticket.png'
import { showAlert } from '../constant/functions';

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

function OTP(){
    const [isLoaded, setIsLoaded] = useState(true)
    const [otp, setOTP] = useState("")
    const postOTP = () =>{
       let otp = document.getElementById('otp').value

       if(otp.length === 0){
           showAlert("OTP cannot be empty",0)
       }
       else{
            setIsLoaded(false)
            const token = Buffer.from(`${otp}`, 'utf8').toString('base64')
        
            var config = 
            { 
                method: 'GET', 
                headers: { 
                    'Authorization': `Basic ${token}`,
                    'Content-type': 'application/json'
                }
            }
    
            fetch(`${BaseURL}/user/otp`, config)
            .then(response => {
                if(response.status === 200) showAlert("Success", 1)
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
                            <label htmlFor="otp">OTP</label>
                            <input id="otp" type="text" name="otp" placeholder="Enter Your OTP"></input>
                        </div>
                </div>
                    <div className="loaderClass">
                        {isLoaded ? 
                    <LoadingContainer style={{"opacity": "0", "display": "none"}}><Loader/></LoadingContainer> :
                    <LoadingContainer style={{"opacity": "1", "display": "flex"}}><Loader/></LoadingContainer>  }
                    </div>
                </div>
                <Button onClick={postOTP}>
                    SUBMIT
                </Button>
                </div>
            </div>
            </div>
        )
}
    
export default OTP
