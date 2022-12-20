import { useState } from 'react';
import { Suspense, useEffect } from 'react';
import { Box, Container, DogSelector, PageHeader, Paper, Modal, Loader, DogPosterBoard } from 'components';
import WithLoader from 'components/HOC/WithLoader';

import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds } from 'redux/slices/dogs/dogSlice';
import { AppDispatch, RootState } from 'redux/store';

import * as S from './App.styles';

const DogSelectorWithLoader = WithLoader(DogSelector);

const App = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const loading = useSelector(
		(state: RootState) => state.dog.loading
	);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDogBreeds(''));
  }, [dispatch])

  const handleDogPosterModal = () => {
    setModalVisibility(true);
  }

  const handleCloseDogPosterModal = () => {
    setModalVisibility(false);
  }

  return (
    <S.Wrapper>
      <Suspense fallback={<Loader />}>
        <Container>
          <Box className="fade-in">
            <Paper>
              <PageHeader 
                title="Dog Poster Generator" 
                subtitle="Select the dog breed(s) you want a poster of and then click 'Generate'"
              />
              <S.DogSelectorWrapper>
                <DogSelectorWithLoader loading={loading} handleDogPosterModal={handleDogPosterModal} />
              </S.DogSelectorWrapper>
            </Paper>
          </Box>
        </Container>
        <a className="vecteezy-attr" href="https://www.vecteezy.com/free-vector/dog-background">Dog Background Vectors by Vecteezy</a>
        <Modal
          open={modalVisibility}
          onClose={handleCloseDogPosterModal}
          title="Your Selected Dog Images"
          content="Choose a poster below from the generated dog images"
          onRequestClose={handleCloseDogPosterModal}
        >
          <DogPosterBoard />
			</Modal>
      </Suspense>
    </S.Wrapper>
  );
}

export default App;