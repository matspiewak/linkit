import styled from 'styled-components';
import { Link, LinkStyle } from '../types/UserContentTypes';
import Image from 'next/image';

const Link = ({ link, linkStyle }: { link: Link; linkStyle: LinkStyle }) => {
	return (
		// @ts-ignore
		<StyledLink linkStyle={linkStyle}>
			<StyledAnchor href={link.url} target='_blank' rel='noreferrer'>
				{
					//!TODO restore Next Image after upload support is added
					/* {link.icon && <Image
					src={link.icon}
					height='24px'
					width='24px'
					alt={link.icon}
				/>} */
				}
				<span>{link.text}</span>
			</StyledAnchor>
		</StyledLink>
	);
};
// @ts-ignore
const StyledLink = styled.div`
	width: calc(100% - 40px);
	max-width: 600px;
	height: 55px;
	margin: 0 10px;
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

	&:hover {
		transform: translate(4px, 4px);
		box-shadow: rgb(0 0 0) 6px 6px 0px 0px;
	}
	&:active {
		transform: translate(7.5px, 7.5px);
		box-shadow: rgb(0 0 0) 2.5px 2.5px 0px 0px;
	}
`;

const StyledAnchor = styled.a`
	display: inline-block;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.3em;
`;

export default Link;
