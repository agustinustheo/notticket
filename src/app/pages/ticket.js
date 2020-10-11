import React, { Component } from 'react'
import styled from 'styled-components'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { BaseURL } from '../constant/variables'
import styles from '../../app/style.css'
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
color:white;
`

const Title = styled.h2`
font-size: 8rem;
`

const SubTitle = styled.h4`
font-size: 3rem;

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

const TwoThirdFlex = styled.div`
position:relative;
flex:2;
height: 100%;
display:flex;
flex-direction: column;
perspective: 4rem;
`


const PureFlex = styled.div`
display:inline-block;
align-items:center;   
`

const LeftBorderedFlex = styled.div`
width:100%; 
border-left: dashed .4rem #FFC20F;
`

const YFlex = styled.div`
display:inline;
`

const TicketContainer = styled.div`
display:block;
background:black;
width:90%;
height:80%;
border: solid 2px #FFC20F;
        border-radius:3rem;
        transition: all .5s;
        box-shadow: 0 0 2rem #FFC20F;
`

const Avatar = styled.div`
display:inline-block;
margin-top:2rem;
margin-left: 2rem;
border-radius: 50%;
width:12rem;
height:12rem;
& > img {
border-radius: 50%;
}
`

const XFlex = styled.div`
width:100%;
`

const SmallTitle = styled.h2`
    font-size:3rem;
`

const Line = styled.div`
border-top: dashed 2px #FFC20F;
width:100%; 

`

const SmallSubtitle = styled.h4`
    font-size: 1.5rem;
`

const LeftSpace = styled.div`
    display:inline-block;
    margin-left:2.5rem;
`
const Button = styled.div`
    border: solid 2px #FFC20F;
    margin:1rem;
    padding: 1rem;
    display: inline-block;
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
const Rotated = styled.h2`
    text-align:center;
    font-size:2rem;
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
            <div className="App">
            <div className="row">
            <div className="half-row">
            <OneThirdFlex>
                        <Title>You're In.</Title>
                        <br/>
                        <SubTitle>Share Your Ticket to Social Media to jazz up the concert!</SubTitle>
                        <LinkButton>COPY TICKET URL</LinkButton>
                    </OneThirdFlex>
            </div>

                    <div className="half-row0">
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
                                    <br></br>
                                    <Line></Line>
                                    <Rotated>No 085782523656</Rotated>
                                    <Line></Line>
                                    <br></br>
                                    <Button><FaFacebook/>&nbsp;&nbsp;Facebook</Button>
                                    <Button><FaInstagram/>&nbsp;&nbsp;Instagram</Button>
                                    <Button><FaTwitter/>&nbsp;&nbsp;Tweet</Button>   
                                </XFlex>
                            </YFlex>
                        </TicketContainer>
                        </div>
          </div>
          </div>
        )
    }
}