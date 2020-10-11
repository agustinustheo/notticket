import React, { useState, Component } from 'react'
import styled from "styled-components";
import styles from '../../app/style.css'
import Loader from "./components/loader";
import { BaseURL } from "../constant/variables";
import logoImg from '../../../src/notticket.png'
import { showAlert } from '../constant/functions';
import { render } from '@testing-library/react';
import { withRouter } from 'react-router-dom'

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

class OTPPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded: true,
            otp: "",
            id: ""
        }
    }

    setIsLoaded = (type) => {
        this.setState({isLoaded: type})
    }

    setOTP = (otp) => {
        this.setState({otp: otp})   
    }

    getId = () => {
        return this.props.history.location.state.id
    }

    postOTP = () =>{
       let otp = document.getElementById('otp').value

       if(otp.length === 0){
           showAlert("OTP cannot be empty",0)
       }
       else{
            this.setIsLoaded(false)
            const token = Buffer.from(`${otp}`, 'utf8').toString('base64')
            
            var config = 
            { 
                method: 'POST', 
                headers: { 
                    'Authorization': `Basic ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id: this.getId()})
            }
            
            fetch(`${BaseURL}/user/otp`, config)
            .then(response => {
                if(response.status === 200){
                    response.json().then(data => {
                        console.log(data)
                        showAlert("Success", 1)
                        this.setIsLoaded(true)
                    })
                }
                
                throw new Error('Something went wrong.')
            }).catch(err => {
                console.log(err)
                this.setIsLoaded(true)
                showAlert("Error", 0)
            })
       }
    }

    render(){
        let otp = this.state.otp
        let isLoaded = this.state.isLoaded

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
                            <input id="otp" type="text" name="otp" placeholder="Enter Your OTP"  
                            value={otp}
                            onChange={e => {
                                this.setOTP(e.target.value)
                            }}></input>
                        </div>
                </div>
                    <div className="loaderClass">
                        {isLoaded ? 
                    <LoadingContainer style={{"opacity": "0", "display": "none"}}><Loader/></LoadingContainer> :
                    <LoadingContainer style={{"opacity": "1", "display": "flex"}}><Loader/></LoadingContainer>  }
                    </div>
                </div>
                <Button onClick={this.postOTP}>
                    SUBMIT
                </Button>
                </div>
            </div>
            </div>
        )
    }
}
    
export default withRouter(OTPPage);
