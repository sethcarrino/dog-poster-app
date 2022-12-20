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
}

const initialState: DogsState = {
    dogs: [],
	breeds: [],
	loading: false,
	error: false,
	errorMessages: [],
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
                const breeds = Object.keys(action.payload.message);

                state.dogs = action.payload.message;
				state.breeds = breeds;

				state.loading = false;
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

export default dogSlice.reducer;
