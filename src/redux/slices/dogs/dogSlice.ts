import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getBreeds
} from 'services/api/dogAPI';

interface DogsState {
    dogs?: any;
	breeds?: any;
	loading: boolean;
	error: boolean;
	errorMessages: string[];
	errorMessage: string;
	images: string[][];
}

const initialState: DogsState = {
    dogs: [],
	breeds: [],
	loading: false,
	error: false,
	errorMessages: [],
	errorMessage: '',
	images: [],
};

export const getDogBreeds = createAsyncThunk(
	'dogs/getDogBreeds',
	async (payload: any, { rejectWithValue }) => {
		const response = await getBreeds();
		if (response.errors) {
			return rejectWithValue(response);
		}
		return response;
	}
);

export const dogSlice = createSlice({
	name: 'dogs',
	initialState,
	reducers: {
		resetErrorState: (state) => {
			state.error = false;
			state.errorMessages = [];
			state.errorMessage = '';
		},
		setGlobalErrorState: (state, action) => {
			state.error = true;
			state.errorMessage = action.payload;
		},
		setImages: (state, action) => {
			const images = [...state.images];
			const index = action.payload.index;
			
			if(images.length > 0) {
				images.splice(index, 1, action.payload.images.message);
			} else {
				images.push(action.payload.images.message);
			}

			state.images = images
		},
		resetRowImages: (state, action) => {
			const images = [...state.images];
			const index = action.payload.index;
			
			images.splice(index, 1, []);

			state.images = images;
		},
		resetAllRows: (state) => {
			state.images = [[]];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDogBreeds.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(getDogBreeds.fulfilled, (state, action: any) => {
				state.loading = false;
                const breeds = Object.keys(action.payload.message);

                state.dogs = action.payload.message;
				state.breeds = breeds;

				state.error = false;
				state.errorMessages = [];
			})
			.addCase(getDogBreeds.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			})
	},
});

export const { resetErrorState, setGlobalErrorState, setImages, resetRowImages, resetAllRows } = dogSlice.actions;

export default dogSlice.reducer;
