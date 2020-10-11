import React, { Component } from 'react';
import styled from 'styled-components';
import backgroundarya from '../assets/background.jpg';
import { MdDateRange, MdLocationOn, MdAttachMoney } from "react-icons/md";
import { withRouter } from 'react-router-dom';
import { BaseURL } from '../constant/variables';
import Loader from '../components/loader';

const FlexContainerRoot = styled.div`
    max-width: 100%;
    display:flex;
    flex-wrap: wrap;
    padding: 5rem;
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
    flex:3;
    flex-basis: 33%;
    width: 100%;
    display:flex;
    border-radius: 30px;
    align-items:center;
    justify-content: center;
    margin:2rem;  
    
    @media (max-width: 375px) {
        margin: .3rem;
        margin-bottom:3rem;
    }
`

const Title = styled.h2`
    text-align: center;
    font-size: 9rem;
    color: white;
    padding-top: 10rem;
`

const OneThirdFlex = styled.div`
    flex:1;
    height: 100%;
    align-items:center;
    flex-direction: column;
    
    & img {
        height: 100%;
        width: 100%;
        background-size:auto;
        border-radius: 30px;
    }

    @media (max-width: 375px) {
       display:none;
    }
`

const TwoThirdFlex = styled.div`
    padding:1rem;
    position:relative;
    flex:2;
    background: black;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 375px) {
       flex:1;
       border: solid 2px #FFC20F;
       border-radius: 30px;
    }
`

const SmallTitle = styled.h2`
    font-size: 3rem;

    @media (max-width: 375px) {
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

    @media (max-width: 375px){
        margin: .3rem;
        margin-bottom:1rem;
    }
`

const LinkButton = styled.button`
    border: solid 2px #FFC20F;
    background:#FFC20F;
    color:black;
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

    @media (max-width: 375px) {
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

    @media (max-width: 375px) {
        margin: .3rem;
        margin-bottom:1rem;
    }
`

const XFlex = styled.div`
    display:flex;
    width:100%;

    @media (max-width: 375px) {
        margin-top:1rem;
        justify-content:center;
        flex-direction: column;
     }
`

const RelativeRoot = styled.div`
    position: relative;
    width:100vw;
    height:100%;
`
class EventDetailPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: "",
            email: "",
            events : [],
            isLoading: false,
            isError: true
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
            let decodedData = await response.json()
            console.log(decodedData)
            this.setState({
                name: decodedData.name,
                email: decodedData.email,
                events: decodedData.carts,
                isLoading: false
            })
        }catch(err){
            this.setState({
                isError: true,
                isLoading: false
            })
        }
    }

    handleCheckOut(eventID){
        this.props.history.push({
            pathname: "/ticket",
            state: {
                eventID
            }
        })
    }

    render(){
        return(
            this.state.isLoading ?<LoadingContainer><Loader/></LoadingContainer>  :
            <RelativeRoot>
            <Title>Your Carts.</Title>
            <FlexContainerRoot>
            {this.state.events.map((event) => {
                return(
                <Flex key={event.id}>
                    <OneThirdFlex><img src={backgroundarya} alt="Concert"/></OneThirdFlex>
                    <TwoThirdFlex>
                        <TitleContainer><SmallTitle>{event.name}</SmallTitle></TitleContainer>
                        <FlexContainer>
                            <Item><SmallSubTitle><MdLocationOn/> {event.venue}</SmallSubTitle></Item>
                            <Item><SmallSubTitle><MdDateRange/>  {event.date}</SmallSubTitle></Item>
                            <Item><SmallSubTitle><MdAttachMoney/> {event.price}</SmallSubTitle></Item>
                            <XFlex>
                                {
                                    event.tags.map((tag)=> {
                                    return <Button key={tag}>{tag}</Button>
                                    })
                                }
                            </XFlex>
                        </FlexContainer>
                        <LinkButton onClick={() => this.handleCheckOut(event.id)}>CHECK OUT</LinkButton>
                    </TwoThirdFlex>
                </Flex>
            )
            })
        }
            </FlexContainerRoot>   
            </RelativeRoot>
        )
    }
}

export default withRouter(EventDetailPage);