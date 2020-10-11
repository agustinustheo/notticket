import styled from "styled-components"
import { Link } from 'react-router-dom'
import styles from '../../app/style.css'
import { withRouter } from 'react-router-dom'
import { BaseURL } from "../constant/variables"
import Loader from "../pages/components/loader"
import logoImg from '../../../src/notticket.png'
import { showAlert } from '../constant/functions'
import React, { Component } from 'react'

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

class LoginPage extends Component {
    constructor(){
        super()

        this.state = {
            isLoaded: true,
            email: ""
        }
    }

    push = (path, data) => {
        console.log(data)
        this.props.history.push({
            pathname: path,
            state: data
        })
    }

    setIsLoaded = (type) => {
        this.setState({isLoaded: type})
    }

    setEmail = (email) => {
        this.setState({email: email})   
    }

    postLogin = () => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
 
        if(email.length === 0 || password.lengt === 0){
            showAlert("Email and password must be filled",0)
        }
        else{
            this.setIsLoaded(false)
            const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
        
            var config = 
            { 
                method: 'GET', 
                headers: { 
                    'Authorization': `Basic ${token}`,
                    'Content-type': 'application/json'
                }
            }
    

            fetch(`${BaseURL}/user/login`, config)
            .then(response => {
                if(response.status === 200){
                    response.json().then(data => {
                        console.log(data)
                        if(data.login_status){
                            showAlert("Success", 1)
                            this.setIsLoaded(true)
                            this.push("/otp", { id: data.id })
                        }
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
        let email = this.state.email
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
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" name="email" placeholder="Enter Your email"  
                            value={email}
                            onChange={e => {
                                this.setEmail(e.target.value)
                            }}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" placeholder="Enter Your Password"></input>
                        </div>
                    </div>
                    <div className="loaderClass">
                        {isLoaded ? 
                            <LoadingContainer style={{"opacity": "0", "display": "none"}}><Loader/></LoadingContainer> :
                            <LoadingContainer style={{"opacity": "1", "display": "flex"}}><Loader/></LoadingContainer>  }
                    </div>
                </div>
                <Button onClick={this.postLogin}>
                    LOGIN
                </Button>
                <p style={{color:"black", "fontSize": "1.3rem"}}>Don't have an Account? <Link to="/register">Sign Up Here</Link></p>
                </div>
            </div>
            </div>
        )
    }
}
    
export default withRouter(LoginPage)