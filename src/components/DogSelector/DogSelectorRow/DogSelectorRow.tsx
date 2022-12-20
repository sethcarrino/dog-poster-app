import { useState, useMemo } from 'react';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import WithLoader from 'components/HOC/WithLoader';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

import {
	getBreedImages, getSubBreedImages
} from 'services/api/dogAPI';
import { setGlobalErrorState, setImages, resetRowImages, resetErrorState } from 'redux/slices/dogs/dogSlice';

import { Grid, Typography } from 'components';
import * as S from "./DogSelectorRow.styles";

type DogSelectorRowProps = {
    rowIndex: number;
}

const ImageCountWithLoader = WithLoader(Typography);

export const DogSelectorRow = ({ rowIndex }: DogSelectorRowProps) => {
    const [breed, setBreed] = useState<string>('');
    const [subBreed, setSubBreed] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dogs = useSelector(
		(state: RootState) => state.dog.dogs
	);
    const dogBreeds = useSelector(
		(state: RootState) => state.dog.breeds
	);
    const dogImages = useSelector(
		(state: RootState) => state.dog.images
	);
    const dispatch = useDispatch<AppDispatch>();

    const breedOptions = useMemo(() => dogBreeds && dogBreeds.map((breed: any) => {
        const capitalizedBreed = breed.charAt(0).toUpperCase() + breed.slice(1);
        
        return { value: breed, label: capitalizedBreed }
    }), [dogBreeds])

    const subBreedOptions = useMemo(() => {
        if(dogs && dogs[breed] && dogs[breed].length > 0) {
            return dogs[breed].map((subBreed: any) => {
                const capitalizedSubBreed = subBreed.charAt(0).toUpperCase() + subBreed.slice(1);
                
                return { value: subBreed, label: capitalizedSubBreed }
            })
        } else {
            return [];
        }
    }, [dogs, breed])

    const handleBreedChange = async (value: string) => {
        setBreed(value);
        dispatch(resetErrorState());
        dispatch(resetErrorState());
        if(value === 'none') {
            dispatch(resetRowImages({ index: rowIndex }))
        } else {
            setLoading(true);
            try {
                const breedImages = await getBreedImages(value);
                dispatch(setImages({ images: breedImages, index: rowIndex }));
            } catch(error) {
                dispatch(setGlobalErrorState('There was a problem fetching breed images'))
            } finally {
                setLoading(false);
            }
        }
    }

    const handleSubBreedChange = async (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSubBreed(value);
        dispatch(resetErrorState());

        if(value === 'none') {
            handleBreedChange(breed);
        } else {
            setLoading(true);
            try {
                const subBreedImages = await getSubBreedImages(breed, value);
                dispatch(setImages({ images: subBreedImages, index: rowIndex }));
            } catch(error) {
                dispatch(setGlobalErrorState('There was a problem fetching sub-breed images'))
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <S.Wrapper className="fade-in dog-selector-row">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <InputLabel id="breed-id">Breed</InputLabel>
                        <Select
                            labelId="breed"
                            id="breed-id"
                            value={breed}
                            onChange={(e: SelectChangeEvent) => handleBreedChange(e.target.value)}
                            label="Breed"
                        >
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            {breedOptions && breedOptions.map((option: any) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <InputLabel id="breed-id">Sub-Breed</InputLabel>
                        <Select
                            labelId="subBreed"
                            id="subBreed-id"
                            value={subBreed}
                            onChange={handleSubBreedChange}
                            label="Sub-Breed"
                            disabled={!breed || breed === 'none'}
                        >
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            {subBreedOptions && subBreedOptions.map((option: any) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} className="image-count-wrapper">
                    <ImageCountWithLoader loading={!!loading} variant="body1" className="subtitle">
						{`${(dogImages && dogImages[rowIndex]?.length) || 0 } pics`}
                    </ImageCountWithLoader>
                </Grid>
            </Grid>
        </S.Wrapper>
    )
}