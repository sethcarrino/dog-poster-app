import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')`
    margin-bottom: 1.5rem;

    button {
        margin-top: .5rem;
    }
`;

export const RowWrapper = styled('div')`
    max-height: 370px;
    overflow-y: scroll;
`;

export const ActionWrapper = styled('div')`
    display: flex;
    align-item: center;
    justify-content: center;

    button {
        margin: .5rem;
    }
`;