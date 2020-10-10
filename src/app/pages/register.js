import React, { Component } from 'react'
import logoImg from '../../app/assets/noticket.png'
import styles from '../../app/style.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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


export default class RegisterPage extends Component {

    register(){

    }

    render(){
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
                            <label htmlFor="Email">Email</label>
                            <input type="text" name="email" placeholder="Enter Your Email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Username">Username</label>
                            <input type="text" name="username" placeholder="Enter Your Username"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="password" placeholder="Enter Your Password"></input>
                        </div>
                    </div>
                </div>
                <Button onClick={this.register}>
                    REGISTER
                </Button>
                <p style={{color:"black", "fontSize": "1.3rem"}}>Have an Account? <Link to="/login">Sign In Here</Link></p>
                </div>
            </div>
            </div>
        )
    }
}