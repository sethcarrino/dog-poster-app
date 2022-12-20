import { useState, useRef, useEffect } from 'react';
import { DogSelectorRow } from './DogSelectorRow';
import * as S from './DogSelector.styles';
import { Button, Loader } from 'components';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from 'react-redux';
import { resetRowImages } from 'redux/slices/dogs/dogSlice';
import { AppDispatch, RootState } from 'redux/store';

type DogSelectorProps = {
    handleDogPosterModal?: () => void;
}

export const DogSelector = ({ handleDogPosterModal }: DogSelectorProps) => {
    const [rowIndices, setRowIndices] = useState([0]);
    const [reset, setReset] = useState<boolean>(false);
    const dogImages = useSelector(
		(state: RootState) => state.dog.images
	);
    const dispatch = useDispatch<AppDispatch>();
    const rowSectionRef = useRef<any>(null);

    const scrollToBottom = () => {
        if(rowSectionRef?.current) {
            rowSectionRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }

    useEffect(() => {
        scrollToBottom();
      }, [rowIndices]);

    const handleRowIndicess = () => {
        const lastIndex = rowIndices[rowIndices.length - 1];
        const indices = [...rowIndices];
        const incrementedIndex = lastIndex + 1;
        indices.push(incrementedIndex);

        setRowIndices(indices);
    }

    const handleResetIndices = () =>{
        setRowIndices([0]);
        setReset(true);
        rowIndices.forEach((i) => {
            dispatch(resetRowImages({ index: i }))
        })

        setTimeout(() => setReset(false), 250)
    }

    const buttonIsDisabled = (dogImages && dogImages.length === 0) || (dogImages && dogImages.length === 1 && dogImages[0].length === 0)

    return (
        <S.Wrapper>
            <S.RowWrapper>
                {reset ? <Loader/> : rowIndices.map(i => <DogSelectorRow key={`row-${i}`} rowIndex={i}  />)}
                <div ref={rowSectionRef} />
            </S.RowWrapper>
            <Button 
                text='Add Dog'
                variant='text'
                startIcon={<AddIcon />}
                onClick={handleRowIndicess}
            />
            <S.ActionWrapper>
                <Button 
                  text="Generate"
                  onClick={handleDogPosterModal}
                  disabled={buttonIsDisabled}
                />
                <Button 
                  text="Start Over"
                  variant="text"
                  onClick={handleResetIndices}
                  disabled={buttonIsDisabled}
                />
              </S.ActionWrapper>
        </S.Wrapper>
    )
}