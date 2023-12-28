import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesDTO, PaginationDTO } from '../../types/movies.types';

interface MoviesState {
	MovieList: MoviesDTO[];
	selectedMovie: MoviesDTO;
	isEdit: boolean;
	pagination: PaginationDTO;

	// Other authentication-related state can be stored here
}

const initialState: MoviesState = {
	MovieList: [],
	selectedMovie: {} as MoviesDTO,
	isEdit: false,
	pagination: { perPage: 10 } as PaginationDTO,
};

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setMoviesList: (state: any, action: PayloadAction<MoviesDTO[]>) => {
			state.MovieList = action.payload;
		},
		setSelectedMovie: (state: any, action: PayloadAction<MoviesDTO>) => {
			state.selectedMovie = action.payload;
		},
		setIsEdit: (state: any, action: PayloadAction<boolean>) => {
			state.isEdit = action.payload;
		},
		setPagination: (state: any, action: PayloadAction<PaginationDTO>) => {
			state.pagination = action.payload;
		},
	},
});

/**
 * Handle expired token error
 * @handleExpiredToken
 * @returns
 */

export const { setMoviesList, setSelectedMovie, setIsEdit, setPagination } = moviesSlice.actions;
export default moviesSlice.reducer;
