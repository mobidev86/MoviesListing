import { Dispatch } from 'react';
import axios from 'axios';
import { API_LIST } from '../config/api.config';
import { ROUTES } from '../constants/routes.constants';
import { RemoveToken, setToken } from '../helpers/localstorage.helper';
import { RequestHelper } from '../helpers/requestHelper';
import { setLoggedIn, setLoggedUser } from '../store/slices/auth.slice';
import { UserDTO } from '../types/user.types';
import { successToastHelper, errorToastHelper } from '../helpers/toast.Helper';
import { UnknownAction } from 'redux';
import { useNavigate } from 'react-router-dom';
import { setMoviesList } from '../store/slices/movies.slice';

interface LoginServiceProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
	payload: UserDTO;
}

interface LogoutServiceProps {
	dispatch: Dispatch<UnknownAction>;
}

const AuthService = () => {
	const navigate = useNavigate();
	const LoginService = ({ dispatch, setLoading, payload }: LoginServiceProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.LOGIN, { payload: payload }))
			.then((response: any) => {
				const { data } = response?.data;

				const token = data?.token;
				const user: UserDTO = data;
				dispatch(setLoggedIn(true));
				dispatch(setLoggedUser(user));
				navigate(ROUTES.HOME);
				setToken(token);
				setLoading(false);
				successToastHelper(response?.data?.message);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage, 'loginError');
				setLoading(false);
			});
	};

	const LogoutService = ({ dispatch }: LogoutServiceProps) => {
		RemoveToken();
		dispatch(setLoggedIn(false));
		dispatch(setLoggedUser({} as UserDTO));
		dispatch(setMoviesList([]));
		navigate(ROUTES.LOGIN);
	};

	return { LoginService, LogoutService };
};

export default AuthService;
