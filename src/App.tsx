import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layout/default.layout';
import Login from './pages/login/Login.pages';
import { ROUTES } from './constants/routes.constants';
import Home from './pages/home/Home.pages';
import MoviesForm from './pages/movieForm/movies.form';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	return (
		<DefaultLayout>
			{isLoggedIn ? (
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.FORM} element={<MoviesForm />} />
					<Route path="*" element={<Navigate to={ROUTES.HOME} replace={true} />} />
				</Routes>
			) : (
				<Routes>
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path="*" element={<Navigate to={ROUTES.LOGIN} replace={true} />} />
				</Routes>
			)}
		</DefaultLayout>
	);
}

export default App;
