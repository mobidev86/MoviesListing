import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import CustomButton from '../../components/elements/Button/button.element';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import { LuPlusCircle } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import movie1 from '../../assets/movie.jpeg';

import AuthService from '../../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { MoviesDTO } from '../../types/movies.types';
import { Pagination, PaginationProps, Spin } from 'antd';
import MoviesService from '../../services/movies.service';
import { setIsEdit, setSelectedMovie } from '../../store/slices/movies.slice';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const moviesList = useSelector((state: RootState) => state.movie.MovieList);
	const pagination = useSelector((state: RootState) => state.movie.pagination);
	const { LogoutService } = AuthService();
	const { getMoviesList } = MoviesService();
	const dispatch = useDispatch();

	const [bufferImage, setBufferImage] = useState(movie1);

	useEffect(() => {
		getMoviesList({ setLoading, dispatch });
	}, []);

	const AddMovie = () => {
		navigate(ROUTES.FORM);
	};

	const onLogout = () => {
		LogoutService({ dispatch });
	};

	const handlePaginationChange = (page: number) => {
		getMoviesList({ dispatch, setLoading, page });
	};

	const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
		if (type === 'prev') {
			return <a className={styles.icon}>{`Prev`}</a>;
		}
		if (type === 'next') {
			return <a className={styles.icon}>{`Next`}</a>;
		}
		return originalElement;
	};

	const handleEdit = (e: MoviesDTO) => {
		dispatch(setSelectedMovie(e));
		dispatch(setIsEdit(true));
		navigate(ROUTES.FORM);
	};

	return moviesList.length ? (
		<Spin spinning={loading} className={styles.movieWrapper}>
			<header className={styles.header}>
				<div className={styles.heading}>
					<span>My movies</span> <LuPlusCircle onClick={AddMovie} style={{ cursor: 'pointer' }} size={30} />
				</div>
				<div className={styles.logoutDiv} onClick={onLogout}>
					<span>Logout</span> <MdLogout size={25} />
				</div>
			</header>

			<div className={styles.formBody}>
				<div className={styles.cardWrapper}>
					{moviesList?.map((x: MoviesDTO) => {
						return (
							<div className={styles.card} onClick={() => handleEdit(x)}>
								<div className={styles.cardImage}>
									<img
										className={styles.image}
										src={bufferImage.length > 0 ? bufferImage : x.poster_image}
										alt="cardImage"
										onLoad={() => setBufferImage('')}
									/>
								</div>
								<div className={styles.cardText}>
									<div className={styles.movieTitle}>{x.title}</div>
									<div className={styles.moviePublishYear}>{x.publish_year}</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className={styles.pagination}>
					<Pagination
						defaultCurrent={pagination?.currentPage}
						current={pagination.currentPage}
						pageSize={8}
						total={pagination.count}
						onChange={A => handlePaginationChange(A)}
						responsive
						itemRender={itemRender}
						className={styles.paginationStyles}
					/>
				</div>
			</div>
		</Spin>
	) : (
		<div className={styles.NoMovieWrapper}>
			<div className={styles.NoMovieWrapper}>Your Movie list is empty</div>

			<CustomButton width={'300px'} onSubmit={AddMovie}>
				Add a new movie
			</CustomButton>
		</div>
	);
};

export default Home;
