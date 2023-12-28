import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import movieReducer from './slices/movies.slice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			movie: movieReducer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
