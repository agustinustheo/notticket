import React, { Component } from 'react'
import logoImg from '../../../src/notticket.png'
import styles from '../../app/style.css'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default class RegisterPage extends Component {
    render(){
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
                        <h5 style={{color:"white"}}>Have an Account? <Link to="/login">Sign In Here</Link></h5>
                    </div>
                    
                </div>
                <div className="footer">
                <Button variant="warning" size="lg" block>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Register&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}