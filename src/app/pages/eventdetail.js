import React, { Component } from 'react';
import styled from 'styled-components';
import backgroundarya from '../assets/background.jpg';
import { MdDateRange, MdLocationOn, MdAttachMoney } from "react-icons/md";

const Flex = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex:3;
    width:50%;
    margin: 0 auto;
    background:black;
    display:flex;
    height: 45rem;
    border-radius: 30px;
    align-items:center;
    justify-content: center;   
`

const Background = styled.div`
    height:100vh;
    width:100vw;
    overflow-y:hidden;
    background: black;
    color: white;
`
const OneThirdFlex = styled.div`
    flex:1;
    height: 100%;
    align-items:center;
    flex-direction: column;
    
    & img {
        position:absolute;
        z-index: -1;
        height: 100%;
        width: 100%;
        background-size:auto;
        border-radius: 30px;
    }
`

const TwoThirdFlex = styled.div`
    padding:1rem;
    border: solid 1px #FFC20F;
    position:relative;
    flex:2;
    background: black;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`

const SmallTitle = styled.h2`
    font-size: 3rem;
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
`

const TitleContainer = styled.div`
    margin-top:2rem;
    margin-left:2rem;
` 


const Button = styled.div`
    display:flex;
    align-items:center;
    border: solid 2px #FFC20F;
    margin: 1rem;
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
`

const XFlex = styled.div`
    display:flex;
    width:100%;
`

export default class EventDetailPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "Arya",
            email: "arya.surya021@gmail.com",
            avatar: "",
            eventName: "Mama Dede Concerto #12",
            eventDate: "11th October 2020",
            eventPrice: "Rp. 205.000",
            venueName: "Zoom",
            link: "https://zoom"
        }
    }

    componentDidMount(){
        //TODO : HIT API
    }

    render(){
        return(
            <Background>
                <Flex>
                    <OneThirdFlex><img src={backgroundarya} alt="Concert Image"/></OneThirdFlex>
                    <TwoThirdFlex>
                        <TitleContainer><SmallTitle>{this.state.eventName}</SmallTitle></TitleContainer>
                        <FlexContainer>
                            <Item><SmallSubTitle><MdLocationOn/> {this.state.venueName}</SmallSubTitle></Item>
                            <Item><SmallSubTitle><MdDateRange/>  {this.state.eventDate}</SmallSubTitle></Item>
                            <Item><SmallSubTitle><MdAttachMoney/> {this.state.eventPrice}</SmallSubTitle></Item>
                            <XFlex>
                                <Button>#Mama</Button> 
                                <Button>#LastConcerto</Button> 
                                <Button>#212</Button>
                            </XFlex>
                        </FlexContainer>
                        <LinkButton>CHECK OUT</LinkButton>
                    </TwoThirdFlex>
                </Flex>
            </Background>
        )
    }
}