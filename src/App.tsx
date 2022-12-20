import { useEffect } from 'react';
import { Box, Button, Container, DogSelector, PageHeader, Paper, Loader } from 'components';

import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds } from 'redux/slices/dogs/dogSlice';
import { AppDispatch, RootState } from 'redux/store';

import * as S from './App.styles';

export const App = () => {
  const loading = useSelector((state: RootState) => state.dog.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDogBreeds(''));
  }, [])

  return (
    <S.Wrapper>
      <Container>
        <Box className="fade-in">
          <Paper>
            <PageHeader title="Dog Poster Generator" />
            <S.DogSelectorWrapper>
              { loading ? <Loader /> : <DogSelector /> }
            </S.DogSelectorWrapper>
            <S.ActionWrapper>
              <Button 
                text="Generate"
              />
              <Button 
                text="Start Over"
                variant="text"
              />
            </S.ActionWrapper>
          </Paper>
        </Box>
      </Container>
      <a className="vecteezy-attr" href="https://www.vecteezy.com/free-vector/dog-background">Dog Background Vectors by Vecteezy</a>
    </S.Wrapper>
  );
}