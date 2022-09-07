import styled from 'styled-components';

const Theme = ({
	bgColor,
	children,
}: {
	bgColor: string;
	children: JSX.Element[];
}) => {
	return <StyledTheme color={bgColor}>{children}</StyledTheme>;
};

const StyledTheme = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${props => props.color};
	overflow: hidden;
`;

export default Theme;
