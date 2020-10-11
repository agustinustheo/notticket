import React, { Component } from 'react'
import styled from 'styled-components'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { BaseURL } from '../constant/variables'
import Loader from "../components/loader";
import { withRouter } from 'react-router-dom';

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
    
    @media (max-width: 500px){
        flex-direction: column;
    }
`

const OneThirdFlex = styled.div`
    flex:1;
    height: 100%;
    align-items:center;
    flex-direction: column;

    @media (max-width: 500px){
        display: none;
    }
`

const TwoThirdFlex = styled.div`
    position:relative;
    flex:2;
    height: 100%;
    display:flex;
    flex-direction: column;
    perspective: 4rem;

    @media (max-width: 500px){
        display: none;
    }
`

const Title = styled.h2`
    font-size: 8rem;
    color: white;

    @media (max-width: 500px){
        margin-top: 2rem;
    }
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

    @media (max-width: 500px){
        flex-direction: column;
        background : red;
    }
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

    @media (max-width: 500px){
        margin: 0 auto;
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
    max-width: 100vw;
    overflow-y:hidden;
    color: white;

    @media (max-width: 500px){
        margin:2rem;
        height:100%;
        & * {
            max-width: 100vw;
        }
    }
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

const SingularFlex = styled.div`
    width:100%;
    max-width: 100vw;
    height: 100%;
    display: inherit;
    flex-direction: column;
    text-align: center;

    & > * {
        max-width: 100vw !important;
    }
    
    @media (min-width: 500px){
        display: none;
    }    
`

const BorderedSingularFlex = styled.div`
    width:100%;
    max-width: 100vw;
    height: 100%;
    display: inherit;
    flex-direction: column;
    text-align: center;
    border: solid 3px #FFC20F;
    border-radius: 30px;
    margin-top:6rem;
    padding:2rem;

    & > * {
        max-width: 100vw !important;
    }
    
    @media (min-width: 500px){
        display: none;
    }    
`

const LoadingContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    height: 100%;
    align-items: center;
    background: black;
    z-index: 99;
    position: fixed;
`
const Border = styled.div`
    margin-top:3rem;
    padding:2rem;
    
    height: auto;
    width:100%;
`

const FullBorder = styled.div`
    margin-top:3rem;
    padding:2rem;
    border: dashed 6px #FFC20F;
    border-radius:10px;
    height: auto;
    width:100%;
    box-shadow 0 0 2rem rgba(0,0,0.0.5);
`


class TicketPage extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            id: "",
            name: "",
            email: "",
            cart: [],
            isError: false,
            isLoading: false
        }
        
    }
  
    async fetchData(){
        try{
            this.setState({
                isLoading: true
            })
            const id = this.props.match.params.id
            let response = await fetch(`${BaseURL}/checkout/history/id`, { 
                method: 'POST', 
                body: JSON.stringify({id: id}),
                headers: { 'Content-type': 'application/json' }
            })
            let decodedData = await response.json() 
          
            this.setState({
                id: decodedData.id,
                name: decodedData.name,
                email: decodedData.email,
                cart: decodedData.cart,
                isLoading: false,
                isError: false
            })
        }
        catch(err){
            this.setState({
                isError: true,
                isLoading: false
            })
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        return(
            this.state.isLoading ?  <LoadingContainer><Loader/></LoadingContainer> :
            this.state.isError ? <LoadingContainer><Title>Something Went Wrong :(</Title></LoadingContainer> :
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
                                        <SubTitle>{this.state.cart.name}</SubTitle>
                                        <SmallSubtitle>Venue : {this.state.cart.venue}</SmallSubtitle>
                                        <SmallSubtitle>Date  : {this.state.cart.date}</SmallSubtitle>
                                    </LeftSpace>
                                </YFlex>
                                <XFlex>
                                    <Button><FaFacebook/>&nbsp;&nbsp;Facebook</Button>
                                    <Button><FaInstagram/>&nbsp;&nbsp;Instagram</Button>
                                    <Button><FaTwitter/>&nbsp;&nbsp;Tweet</Button>   
                                </XFlex>
                            </YFlex>
                            <LeftBorderedFlex><Rotated>No {this.state.id.substring(0,8)}</Rotated></LeftBorderedFlex>
                        </TicketContainer>
                    </TwoThirdFlex>
                </Flex>
                    <SingularFlex>
                        <Title>You're In.</Title>
                        <br/>
                        <SubTitle>Share Your Ticket to Social Media to jazz up the concert!</SubTitle>
                        <LinkButton>COPY TICKET URL</LinkButton>
                    </SingularFlex>
                    <BorderedSingularFlex>
                        <YFlex ref={this.childRef}>   
                            <Avatar><img src="https://github.com/aryasurya21.png" alt="aryasurya21"/></Avatar>
                            <SmallTitle>{this.state.name}</SmallTitle>
                            <SmallSubtitle>{this.state.email}</SmallSubtitle>
                            <Border>
                                <SubTitle>{this.state.cart.name}</SubTitle>
                                <SmallSubtitle>{this.state.cart.venue}</SmallSubtitle>
                                <SmallSubtitle>{this.state.cart.date}</SmallSubtitle>
                            </Border>
                            <FullBorder>
                                <SmallTitle>No {this.state.id.substring(0,8)}</SmallTitle>
                            </FullBorder>
                            <br/>
                            <Button><FaFacebook/>&nbsp;&nbsp;Share to Facebook</Button>
                            <Button><FaInstagram/>&nbsp;&nbsp;Post on Instagram</Button>
                            <Button><FaTwitter/>&nbsp;&nbsp;Tweet</Button>   
                        </YFlex>
                    </BorderedSingularFlex>
            </Background>
        )
    }
}

export default withRouter(TicketPage);