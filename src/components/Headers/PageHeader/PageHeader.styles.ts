import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 1rem;
	margin-bottom: 1.5rem;
`;

export const TitleWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;

	h4 {
		text-transform: uppercase;
	}

	img {
		height: 2rem;
		margin: 0 .5rem .5rem;
	}
`;
