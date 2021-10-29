import styled from 'styled-components';

export const AppFrame = styled.div`
    position : relative;
    height: 90vh;
    :after {
        content  : "";
        position : absolute;
        bottom   : 0;
        left     : 0;
        background-image : linear-gradient(to bottom, 
                          rgba(255,255,255, 0), 
                          rgba(255,255,255, 1) 90%);
        width    : 100%;
        height   : 4em;
    }
`;
export const CardsContainer = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-row-gap: 10px;
    height: 100%;
    overflow: scroll;
    background-color: rgb(245, 245, 255);
`;

export const BackCard = styled.img`
    :hover {
        transform: scale(1.1);
        cursor: pointer;
    }
    transition: 0.5s;
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: center;
    background-color: rgb(235, 235, 255);
    height: 8vh;
    align-items: center;
`;

export const StartButton = styled.a`
    padding: 10px 20px;
    color: white;
    font-size: 1.2rem;
    font-weight: 900;
    background-color: green;
    border-radius: 20px;
    :hover {
        transform: scale(1.1);
        cursor: pointer;
    }
    transition: 0.5s;
`;
