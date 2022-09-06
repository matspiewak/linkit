import styled from 'styled-components'
import { Link, LinkStyle } from '../types/UserContentTypes';


const Link = ({ link, linkStyle }: { link: Link, linkStyle: LinkStyle }) => {
    console.log(linkStyle.radius)
    return (
        // @ts-ignore
        <StyledLink linkStyle={linkStyle}>
            <StyledAnchor href={link.url} target="_blank" rel="noreferrer">
                {link.text}
            </StyledAnchor>
        </StyledLink>
    )
}
// @ts-ignore
const StyledLink = styled.div`
    width: 100%;
    max-width: 600px;
    height: 50px;
    padding: 0.25em;
    background-color: ${props =>
        // @ts-ignore
        props.linkStyle.background_color};
    color: ${props =>
        // @ts-ignore
        props.linkStyle.font_color};
    font-weight: ${props =>
        // @ts-ignore
        props.linkStyle.font_weight};
    border-radius: ${props =>
        // @ts-ignore
        props.linkStyle.radius};
    border: ${props =>
        // @ts-ignore
        props.linkStyle.border};
    box-shadow: ${props =>
        // @ts-ignore
        props.linkStyle.shadow};
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