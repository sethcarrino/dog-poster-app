import { DogSelectorRow } from './DogSelectorRow';
import * as S from './DogSelector.styles';
import { Button } from 'components';
import AddIcon from '@mui/icons-material/Add';

export const DogSelector = () => {
    return (
        <S.Wrapper>
            <DogSelectorRow />
            <Button 
                text='Add Dog'
                variant='text'
                startIcon={<AddIcon />}
            />
        </S.Wrapper>
    )
}