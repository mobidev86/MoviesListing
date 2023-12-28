import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './movies.module.scss';
import { ImageUpload } from '../../components/shared/ImageUpload/imageUploader';
import AntInput from '../../components/elements/input/input.element';
import { Button, Spin } from 'antd';
import CustomButton from '../../components/elements/Button/button.element';
import { MoviesDTO } from '../../types/movies.types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setIsEdit, setSelectedMovie } from '../../store/slices/movies.slice';
import MoviesService from '../../services/movies.service';
import { movieValidation } from '../../helpers/validation.helper';
import axios from 'axios';
import * as fs from 'fs';

type Props = {};

const MoviesForm = (props: Props) => {
	const [images, setImages] = useState<any>();
	const [movieDetail, setMovieDetail] = useState({} as MoviesDTO);
	const [loading, setLoading] = useState(false);
	const isEdit = useSelector((state: RootState) => state.movie.isEdit);
	const selectedMovie = useSelector((state: RootState) => state.movie.selectedMovie);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { AddMovieService, UpdateMovieService } = MoviesService();
	const [error, setError] = useState({
		title: '',
		publish_year: '',
		imageUploading: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMovieDetail({ ...movieDetail, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		setMovieDetail(selectedMovie);
		const imageUrl: string = selectedMovie?.poster_image;
		const image: any = imageUrl?.length > 1 ? [{ dataURL: imageUrl }] : null;
		setImages(image);
	}, [selectedMovie]);

	const onSubmit = (e: any) => {
		const isValid = movieValidation(movieDetail, setError);

		if (isValid) {
			setImages([]);
			if (isEdit) {
				UpdateMovieService({
					setLoading,
					dispatch,
					payload: {
						...movieDetail,
						poster_image: images[0]?.dataURL === selectedMovie.poster_image ? selectedMovie.poster_image : images[0],
						publish_year: Number(movieDetail.publish_year),
					},
				});
			} else {
				AddMovieService({
					setLoading,
					dispatch,
					payload: {
						...movieDetail,
						poster_image: images[0],
						publish_year: Number(movieDetail.publish_year),
					},
				});
			}
		} else return;
	};

	const handleCancel = () => {
		dispatch(setSelectedMovie({} as MoviesDTO));
		dispatch(setIsEdit(false));
		setImages([]);
		navigate(ROUTES.HOME);
	};

	return (
		<Spin spinning={loading} className={styles.wrapper}>
			<div className={styles.heading}>{isEdit ? 'Edit' : 'Create a new movie'}</div>

			<div className={styles.formBody}>
				<div className={styles.left}>
					<ImageUpload setImages={setImages} images={images} setError={setError} />
				</div>
				<form className={styles.right}>
					<AntInput
						name={'title'}
						placeHolder={'Title'}
						value={movieDetail.title}
						onChange={handleChange}
						error={error.title}
					/>
					<AntInput
						name={'publish_year'}
						placeHolder={'Publishing Year'}
						value={movieDetail.publish_year?.toString()}
						onChange={handleChange}
						width="250px"
						type="Number"
						error={error.publish_year}
						min="1"
						max="2023"
						maxLength={4}
					/>
					<div className={styles.buttonWrapper}>
						<Button onClick={handleCancel} className={styles.cancelButton}>
							Cancel
						</Button>
						<CustomButton loading={loading} onSubmit={onSubmit}>
							{isEdit ? 'Update' : 'Submit'}
						</CustomButton>
					</div>
				</form>
			</div>
		</Spin>
	);
};

export default MoviesForm;
