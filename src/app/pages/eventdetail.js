import React, { Component } from 'react';
import styled from 'styled-components';
import backgroundarya from '../assets/background.jpg';
import { MdDateRange, MdLocationOn, MdAttachMoney } from "react-icons/md";
import { withRouter } from 'react-router-dom';
import { BaseURL } from '../constant/variables';
import { showAlert } from '../constant/functions';
import Loader from '../components/loader';

const FlexContainerRoot = styled.div`
    max-width: 100%;
    display:flex;
    width:100%;
    justify-content: center;
    padding: 5rem;

    @media (max-width: 50px0){
        padding: 1rem;
    }
`

const LoadingContainer = styled.div`
    width:100%;
    background:black;
    display:flex;
    justify-content:center;
    height: 100%;
    align-items: center;
    z-index: 99;
    position: fixed;
`

const Flex = styled.div`
    color: white;
    display:flex;
    border-radius: 30px;
    align-items:center;
    justify-content: center;
    margin:2rem;  
    
    @media (max-width: 500px){
        margin: .3rem;
        margin-bottom:3rem;
    }
`

const Title = styled.h2`
    text-align: center;
    font-size: 9rem;
    color: white;
    padding-top: 10rem;
    height: 220px;
    transition: all .4s ease;

    @media (max-width: 500px) {
        padding-top: 0rem;
        opacity: 0;
        height: 0px;
    }
`

const OneThirdFlex = styled.div`
    width: 300px;
    height: 100%;
    background-image: url("${backgroundarya}");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 30px 0px 0px 30px;
    transition: all .3s ease;
    
    @media (max-width: 770px){
        opacity: 0;
        width: 0px;
    }
`

const TwoThirdFlex = styled.div`
    padding:1rem;
    position:relative;
    background: black;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all .4s ease;

    @media (max-width: 770px){
        border: solid 2px #FFC20F;
        border-radius: 30px;
        height: 100%;
        flex: 1;
    }

    @media screen and (min-width: 550px) and (max-width: 770px) {
        width: 490px;
    }
    @media screen and (min-width: 470px) and (max-width: 550px) {
        width: 450px;
    }
    @media screen and (min-width: 420px) and (max-width: 470px) {
        width: 400px;
    }
    @media screen and (min-width: 360px) and (max-width: 420px) {
        width: 340px;
    }
    @media screen and (min-width: 320px) and (max-width: 360px) {
        width: 310px;
    }
    @media screen and (max-width: 320px) {
        width: 300px;
    }
`

const SmallTitle = styled.h2`
    font-size: 4rem;

    @media (max-width: 500px) {
        margin:1rem auto;
    }
`

const SmallSubTitle = styled.h4`
    font-size: 2rem;
`

const FlexContainer = styled.div`
   
    display:flex;
    flex-direction: column;
`

const Item = styled.div`
    margin: 1rem;
    padding:1rem;
    display:flex;
    border-radius:10px;
    border: solid 2px #FFC20F; 
    background:black;
    align-items: center;

    @media (max-width: 500px){
        margin: .3rem;
        margin-bottom:1rem;
    }
`

const LinkButton = styled.button`
    border: solid 2px #FFC20F;
    background:#FFC20F;
    color:black;
    font-weight: bold;
    padding:2rem;
    border-radius:10px;
    font-size:2rem;
    margin-left:1rem;
    transition: all .5s;

    &:hover {
        background: #FFC20F;
        color: black;
        cursor: pointer;
    }

    @media (max-width: 500px) {
        margin: .3rem;
    }
`

const TitleContainer = styled.div`
    margin-top:2rem;
    margin-left:2rem;
` 


const Button = styled.div`
    display:flex;
    align-items:center;
    border: solid 2px #FFC20F;
    margin: 2rem;
    padding: 1rem;
    background:black;
    text-align:center;
    font-size:2rem;
    border-radius:10px;
    transition: all .5s;

    &:hover {
        background: #FFC20F;
        color: black;
        cursor: pointer;
    }

    @media (max-width: 500px){
        margin: .3rem;
        margin-bottom:1rem;
    }
`

const XFlex = styled.div`
    display:flex;
    width:100%;

    @media (max-width: 550px) {
        margin-top:1rem;
        justify-content:center;
        flex-direction: column;

         & > div {
             display:inline-block;
         }
     }
`

const RelativeRoot = styled.div`
    position: relative;
    width:100vw;
    display: inline-block;
    overflow-x: hidden;
`
class EventDetailPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: "",
            name: "",
            email: "",
            event : [],
            isLoading: false,
            isError: true,
            textTitle: ""
        }
    }

    async componentDidMount(){
        try{
            this.setState({
                isLoading: true
            })
            const id = this.props.match.params.id
            let response = await fetch(`${BaseURL}/cart/id`, { 
                method: 'POST', 
                body: JSON.stringify({id:id}),
                headers: { 'Content-type': 'application/json' }
            })
            if(response.status != 200){
                this.setState({
                    "textTitle": `Oops, we didn't catch that.\nPlease try again :(`
                })
            } else {
                this.setState({
                    "textTitle": "Your Cart."
                })
            }
            let decodedData = await response.json()
            this.setState({
                id: decodedData.id,
                name: decodedData.name,
                email: decodedData.email,
                event: decodedData.cart,
                isLoading: false,
                isError: false
            })
        }catch(err){
            this.setState({
                isError: true,
                isLoading: false
            })
        }
    }

    async handleCheckOut(cartID){
        console.log("cartID"+cartID)
        this.setState({
            "isLoading": true
        })
        let response = await fetch(BaseURL+"/checkout/history/create", { 
            method: 'POST', 
            body: JSON.stringify({id:cartID}),
            headers: { 'Content-type': 'application/json' }
        })
        if(response.status == 200){
            let decodedResponse = await response.json();
            await showAlert("Success", 1).then((_) => {
                this.props.history.push({
                    pathname: `/ticket/${decodedResponse.id}`
                })
            })
            this.setState({
                "isLoading": false,
                "isError": false
            })
        }  else {
            this.setState({
                "isLoading": false,
                "isError": true
            })
        }
    }

    render(){
        return(
            this.state.isLoading ?<LoadingContainer><Loader/></LoadingContainer>  :
            this.state.isError ? <LoadingContainer><Title>{this.state.textTitle.split('\n').map((item,i)=> {
                return <p key={i}>{item}</p>
            })}</Title></LoadingContainer> :
            <RelativeRoot>
            <Title>{this.state.textTitle}</Title>
            <FlexContainerRoot>
                <Flex>
                    <OneThirdFlex/>
                    <TwoThirdFlex>
                        <TitleContainer><SmallTitle>{this.state.event.name}</SmallTitle></TitleContainer>
                        <FlexContainer>
                            <Item><SmallSubTitle><MdLocationOn/> {this.state.event.venue}</SmallSubTitle></Item>
                            <Item><SmallSubTitle><MdDateRange/>  {this.state.event.date}</SmallSubTitle></Item>
                            <Item><SmallSubTitle><MdAttachMoney/> {this.state.event.price}</SmallSubTitle></Item>
                            <XFlex>
                                {
                                    this.state.event.tags.map((tag)=> {
                                    return <Button key={tag}>{tag}</Button>
                                    })
                                }
                            </XFlex>
                        </FlexContainer>
                        <LinkButton onClick={() => this.handleCheckOut(this.state.id)}>CHECK OUT</LinkButton>
                    </TwoThirdFlex>
                </Flex>
            </FlexContainerRoot>   
            </RelativeRoot>
        )
    }
}

export default withRouter(EventDetailPage);
