import axios from 'axios';
import React, { Dispatch } from 'react';
import { UnknownAction } from 'redux';
import { API_LIST } from '../config/api.config';
import { RequestHelper } from '../helpers/requestHelper';
import { errorToastHelper } from '../helpers/toast.Helper';
import { setIsEdit, setMoviesList, setPagination, setSelectedMovie } from '../store/slices/movies.slice';
import { MoviesDTO, PaginationDTO } from '../types/movies.types';
import { getToken } from '../helpers/localstorage.helper';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';
import AuthService from './auth.service';

interface getMoviesProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
	page?: number;
}
interface AddMoviesProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
	payload: MoviesDTO;
}
interface UpdateMoviesProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
	payload: MoviesDTO;
}

const MoviesService = () => {
	const navigate = useNavigate();
	const { LogoutService } = AuthService();
	const getMoviesList = ({ dispatch, setLoading, page }: getMoviesProps) => {
		setLoading(true);

		const url = `${API_LIST.GET_MOVIES}/?page=${page}`;

		axios(RequestHelper('GET', page ? url : API_LIST.GET_MOVIES))
			.then((response: any) => {
				const _data: any = response?.data?.data;

				console.log(_data?.data);
				dispatch(setMoviesList(_data?.data));
				dispatch(setPagination({ count: _data?.count } as PaginationDTO));
				setLoading(false);
			})
			.catch((error: any) => {
				if (error?.response?.status === 401) {
					LogoutService({ dispatch });
				}
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage, 'GetMoviesError');
				setLoading(false);
			});
	};

	const AddMovieService = ({ dispatch, setLoading, payload }: AddMoviesProps) => {
		setLoading(true);
		console.log(payload);
		const formData = new FormData();
		formData.append('title', payload.title);
		formData.append('publish_year', payload.publish_year.toString());
		formData.append('poster_image', payload.poster_image.file);

		axios
			.post(API_LIST.ADD_MOVIES, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					authorization: `Bearer ${getToken()}`,
				},
			})
			.then((response: any) => {
				const _data: any = response?.data?.data;
				getMoviesList({ setLoading, dispatch });
				setLoading(false);
				navigate(ROUTES.HOME);
			})
			.catch((error: any) => {
				if (error?.response?.status === 401) {
					LogoutService({ dispatch });
				}
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage, 'AddMoviesError');
				setLoading(false);
			});
	};

	const UpdateMovieService = ({ dispatch, setLoading, payload }: UpdateMoviesProps) => {
		console.log(payload);
		let image;
		if (payload?.poster_image?.file) {
			image = payload.poster_image?.file;
		} else {
			image = payload.poster_image;
		}

		const formData = new FormData();
		formData.append('title', payload.title);
		formData.append('publish_year', payload.publish_year.toString());
		formData.append('poster_image', image);
		formData.append('_id', payload._id ?? '');

		console.log(formData);
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.UPDATE_MOVIES, { payload: formData }))
			.then((response: any) => {
				const _data: any = response?.data?.data;
				dispatch(setSelectedMovie({} as MoviesDTO));
				dispatch(setIsEdit(false));
				getMoviesList({ setLoading, dispatch });
				setLoading(false);
				navigate(ROUTES.HOME);
			})
			.catch((error: any) => {
				if (error?.response?.status === 401) {
					LogoutService({ dispatch });
				}
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage, 'UpdateMoviesError');
				setLoading(false);
			});
	};

	return { getMoviesList, AddMovieService, UpdateMovieService };
};

export default MoviesService;
