import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')`
   max-height: 500px;
   overflow-y: scroll;
   padding: .5rem;

   img {
        height: 200px;
        width: 200px;
        object-fit: cover;
        transition: all .2s ease-in-out;
        border-radius: .5rem;

        &:hover {
            opacity: .5;
            cursor: pointer;
            transform: scale(1.01);
        }
   }
`;