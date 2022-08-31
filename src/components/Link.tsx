import { Link } from "../types/UserContentTypes";
import styled from 'styled-components'


const Link = ({ link, linkStyle }: { link: Link, linkStyle: any }) => {
    return (
        <StyledLink linkStyle={linkStyle} >
            <StyledAnchor href={link.url} target="_blank" rel="noreferrer">
                {link.text}
            </StyledAnchor>
        </StyledLink>
    )
}

const StyledLink = styled.div`
    width: 100%;
    max-width: 600px;
    height: 50px;
    padding: 0.25em;
    background-color: ${props => props.linkStyle.backgroundColor};
    color: ${props => props.linkStyle.font.color};
    font-weight: ${props => props.linkStyle.font.bold}
    border-radius: ${props => props.linkStyle.borderRadius}px;
    border: ${props => props.linkStyle.border}
`;

const StyledAnchor = styled.a`
display: inline-block;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

export default Link;