import React, { Component } from 'react'
import styled from 'styled-components'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { BaseURL } from '../constant/variables'
import Loader from "../components/loader";

const Flex = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex:3;
    width:80%;
    margin: 0 auto;
    display:flex;
    height: 40rem;
    align-items:center;
    justify-content: center;   
`

const OneThirdFlex = styled.div`
    flex:1;
    height: 100%;
    align-items:center;
    flex-direction: column;
`

const TwoThirdFlex = styled.div`
    position:relative;
    flex:2;
    height: 100%;
    display:flex;
    flex-direction: column;
    perspective: 4rem;
`

const Title = styled.h2`
    font-size: 8rem;
`

const SubTitle = styled.h4`
    font-size: 3rem;
    display: inline-block;
`

const PureFlex = styled.div`
    display:flex;
    align-items:center;   
`

const LeftBorderedFlex = styled.div`
    display:flex;
    align-items:center;   
    border-left: dashed .4rem #FFC20F;
`

const YFlex = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`

const TicketContainer = styled.div`
    position:absolute;
    display: flex;
    background:black;
    box-shadow: 0 0 2rem #FFC20F;
    justify-content: space-between;
    top:50%;
    left: 50%;
    transform:translate(-50%, -50%);
    width:90%;
    height:80%;
    border: solid 2px #FFC20F;
    border-radius:3rem;
    transition: all .5s;
`

const Avatar = styled.div`
    display:inline-block;
    margin-top:2rem;
    margin-left: 2rem;
    border-radius: 50%;
    width:12rem;
    height:12rem;

    & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`

const XFlex = styled.div`
    display:flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin-left: 3%;
    transform:translateY(-10%);
`

const SmallTitle = styled.h2`
    font-size:3rem;
`

const SmallSubtitle = styled.h4`
    font-size: 1.5rem;
`

const LeftSpace = styled.div`
    margin-left:2.5rem;
`

const Background = styled.div`
    height:100vh;
    width:100vw;
    overflow-y:hidden;
    color: white;
`

const Rotated = styled.h2`
    transform: rotate(90deg);
    font-size:3rem;
`

const Button = styled.div`
    display:flex;
    align-items:center;
    border: solid 2px #FFC20F;
    margin:1rem;
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

const LinkButton = styled.button`
    border: solid 2px #FFC20F;
    background:black;
    color:white;
    padding:2rem;
    border-radius:10px;
    font-size:2rem;
    margin-top:3rem;
    transition: all .5s;

    &:hover {
        background: #FFC20F;
        color: black;
    }
`

const LoadingContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    height: 100%;
    align-items: center;
    z-index: 99;
    position: fixed;
`


export default class TicketPage extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            name: "Arya",
            email: "arya.surya021@gmail.com",
            avatar: "",
            eventID: "",
            eventName: "Mama Dede Concerto #12",
            eventDate: "11th October 2020",
            eventVenue: "Zoom",
            eventLink: "https://zoom",
            eventTags: [],
            isError: false,
            isLoading: false
        }
        
    }
  
    async componentDidMount(){
        try{
            this.setState({
                isLoading: true
            })
            let id = this.props.history.location.state.eventID
            let response = await fetch(`${BaseURL}/concert`, { method: 'POST', body: 
                JSON.stringify(id)
            })
            let decodedData = await response.json() 
            console.log(decodedData)
            this.setState({
                eventID: decodedData.id,
                eventName: decodedData.event_name,
                eventVenue: decodedData.event_venue,
                eventDate: decodedData.event_date,
                eventLink: decodedData.event_link,
                isLoading: false
            })
        }
        catch(err){
            this.setState({
                isError: true
            })
        }
    }

    render(){
        return(
            this.state.isLoading ?  <LoadingContainer><Loader/></LoadingContainer> :
            <Background>
                <Flex>
                    <OneThirdFlex>
                        <Title>You're In.</Title>
                        <br/>
                        <SubTitle>Share Your Ticket to Social Media to jazz up the concert!</SubTitle>
                        <LinkButton>COPY TICKET URL</LinkButton>
                    </OneThirdFlex>
                    <TwoThirdFlex ref={this.parentRef}>
                        <TicketContainer ref={this.childRef}>
                            <YFlex>
                                <PureFlex>
                                <Avatar><img src="https://github.com/aryasurya21.png" alt="aryasurya21"/></Avatar>
                                <LeftSpace>
                                    <SmallTitle>{this.state.name}</SmallTitle>
                                    <br/>
                                    <SmallSubtitle>{this.state.email}</SmallSubtitle>
                                </LeftSpace>
                                </PureFlex>
                                <YFlex>
                                    <LeftSpace>
                                        <SubTitle>{this.state.eventName}</SubTitle>
                                        <SmallSubtitle>Venue : {this.state.eventVenue}</SmallSubtitle>
                                        <SmallSubtitle>Date  : {this.state.eventDate}</SmallSubtitle>
                                    </LeftSpace>
                                </YFlex>
                                <XFlex>
                                    <Button><FaFacebook/>&nbsp;&nbsp;Facebook</Button>
                                    <Button><FaInstagram/>&nbsp;&nbsp;Instagram</Button>
                                    <Button><FaTwitter/>&nbsp;&nbsp;Tweet</Button>   
                                </XFlex>
                            </YFlex>
                            <LeftBorderedFlex><Rotated>No {this.state.eventID.substring(0,7)}</Rotated></LeftBorderedFlex>
                        </TicketContainer>
                    </TwoThirdFlex>
                </Flex>
            </Background>
        )
    }
}