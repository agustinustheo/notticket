import React from 'react';
import styled, { keyframes } from 'styled-components';
  
const SpinningAnimation = keyframes`
0% {
    transform: rotate(0deg);
}

100% {
    transform: rotate(360deg);
}
`;

const LoaderContainer = styled.div`
    position: fixed;
    z-index:9999;
    background:#D3D3D3;
    padding:3.5rem;
    border-radius: 30px;
    box-shadow: 1rem 1rem 2rem rgba(0.5);
`

const ProgressBar = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: .7rem solid black;
    border-top: .7rem solid white;
    animation: ${SpinningAnimation} 1s ease-in-out infinite;
`

const Loader = () => {
    return (
        <LoaderContainer>
            <ProgressBar />
        </LoaderContainer>
    )
}

export default Loader;