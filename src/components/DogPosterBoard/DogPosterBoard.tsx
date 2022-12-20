import { Suspense, useMemo } from 'react';
import { Loader, Grid } from 'components';

import { useSelector } from 'react-redux';
import {  RootState } from 'redux/store';

import * as S from './DogPosterBoard.styles';

export const DogPosterBoard = () => {
    const dogImages = useSelector(
		(state: RootState) => state.dog.images
	);

    const shuffleArray = (array: any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
    
    const randomizedDogImages = useMemo(() => shuffleArray([...dogImages].flat()), [dogImages])

    return (
        <Suspense fallback={<Loader />}>
            <S.Wrapper>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {randomizedDogImages.map((image: string) => 
                        <Grid item xs={4} key={image}>
                            <img className="fade-in" src={image} alt="Dog Poster" onClick={() => window.open(image, '_blank')}/>
                        </Grid>
                    )}
                </Grid>
            </S.Wrapper>
        </Suspense>
    )
}