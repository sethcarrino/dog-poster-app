import { styled } from '@mui/material/styles';
import { colors } from 'theme';
import bg from './assets/vecteezy-dog-bg.jpg';

export const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url(${bg});
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .vecteezy-attr {
        color: #000;
        font-weight: bold;
        text-decoration: none;
        text-align: center;

        &:hover {
            opacity: .5;
        }
    } 

    .error-message {
        color: ${colors.red.main};
        text-align: center;
        width: 100%;
    }
`;
