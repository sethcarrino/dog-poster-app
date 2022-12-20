import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { BasicSelect, Grid, Typography } from 'components';
import * as S from "./DogSelectorRow.styles";

type DogSelectorValues = {
	breed: string;
    subBreed: string;
};

export const DogSelectorRow = () => {
    const dogBreeds = useSelector(
		(state: RootState) => state.dog.breeds
	);
    const breedOptions = useMemo(() => dogBreeds.map((breed: any) => {
        const capitalizedBreed = breed.charAt(0).toUpperCase() + breed.slice(1);
        
        return { value: breed, label: capitalizedBreed }
    }), [dogBreeds])

    const schema = yup
		.object({
			breed: yup.string().required(),
            subBreed: yup.string().required(),
		})
		.required();
    const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		reset,
		watch,
	} = useForm<DogSelectorValues>({ resolver: yupResolver(schema) });
    return (
        <S.Wrapper>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={5}>
                    <BasicSelect
                        name="breed"
                        control={control}
                        options={breedOptions}
                        label="Breed"
                        error={!!errors.breed}
                        defaultValue={watch('breed')}
                        required
                    />
                </Grid>
                <Grid item xs={5}>
                    <BasicSelect
                        name="subBreed"
                        control={control}
                        options={dogBreeds}
                        label="Sub-Breed"
                        error={!!errors.subBreed}
                        defaultValue={watch('subBreed')}
                        required
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body1" className="subtitle">
						number
					</Typography>
                </Grid>
            </Grid>
        </S.Wrapper>
    )
}