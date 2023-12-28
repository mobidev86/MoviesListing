import React, { ChangeEvent, useState } from 'react';
import styles from './login.module.scss';
import AntInput from '../../components/elements/input/input.element';
import { Button, Checkbox } from 'antd';
import CustomButton from '../../components/elements/Button/button.element';
import { UserDTO } from '../../types/user.types';
import AuthService from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { userValidationHelper } from '../../helpers/validation.helper';

type Props = {};

const Login = (props: Props) => {
	const [userDetails, setUserDetails] = useState({} as UserDTO);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { LoginService } = AuthService();
	const [error, setError] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		const isValid = userValidationHelper(userDetails, setError);

		if (isValid) {
			LoginService({ setLoading, dispatch, payload: userDetails });
		}
	};
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<div className={styles.heading}>Sign in</div>
			<AntInput
				type="text"
				name={'email'}
				value={userDetails.email}
				onChange={handleChange}
				placeHolder="Email"
				disabled={loading ? true : false}
				error={error.email}
			/>
			<AntInput
				type="password"
				name={'password'}
				value={userDetails.password}
				onChange={handleChange}
				placeHolder="Password"
				isPassword
				disabled={loading ? true : false}
				error={error.password}
			/>
			<div className={styles.checkboxDiv}>
				<Checkbox />
				<span>Remember me?</span>
			</div>
			<CustomButton loading={loading} htmlType="submit" onSubmit={onSubmit} className={styles.submitButton}>
				Login
			</CustomButton>
		</form>
	);
};

export default Login;
