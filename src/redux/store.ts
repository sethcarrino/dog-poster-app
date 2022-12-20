import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import dogReducer from './slices/dogs/dogSlice';

export const store = configureStore({
	reducer: {
		dog: dogReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
