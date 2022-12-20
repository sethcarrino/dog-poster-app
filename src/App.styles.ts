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
    background-attachment: local;

    .vecteezy-attr {
        color: #000;
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-size: .75rem;

        &:hover {
            opacity: .5;
        }
    } 

    .made-with-text {
        color: #fff;
        font-weight: bold;
        text-align: center;
    }

    .error-message {
        color: ${colors.red.main};
        text-align: center;
        width: 100%;
    }
`;
