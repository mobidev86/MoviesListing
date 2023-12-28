/* eslint-disable @typescript-eslint/no-explicit-any */
export const userValidationHelper = (user: any, setError: (e: any) => void) => {
	const errors: any = {};
	const filter =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// const passwordVal =
	//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

	if (!user.email) {
		errors.email = 'Please enter your email.';
	} else if (!filter.test(user.email)) {
		errors.email = 'Please enter a valid email.';
	}

	// if (!user?.email) {
	//   errors.email = "Please enter your email.";
	// }

	if (!user.password) {
		errors.password = 'Please enter your password.';
	}
	// else if (!passwordVal.test(user.password)) {
	//   errors.password = "Please enter a strong password.";
	// }

	if (Object.values(errors).length > 0) {
		setError(errors);
		return false;
	}

	return true;
};

export const movieValidation = (movie: any, setError: (e: any) => void) => {
	const errors: any = {};

	const yearRegex = /^(194[0-9]|19[0-9]\d|200\d|202[0-3])$/;
	if (!movie.title) {
		errors.title = 'Please enter movie title.';
	}

	if (!movie.publish_year) {
		errors.publish_year = 'Please enter published year.';
	} else if (!yearRegex.test(movie.publish_year)) {
		errors.publish_year = 'Year should be between 1900 to 2023.';
	} else if (Math.sign(movie.publish_year) === -1) {
		errors.publish_year = 'Please enter valid year';
	}

	// if (!movie.poster_image) {
	// 	errors.poster_image = 'Please enter published year.';
	// } else if (typeof movie.poster_image === 'object') {
	// 	errors.poster_image = 'Image should be in proper form';
	// }

	if (Object.values(errors).length > 0) {
		setError(errors);
		return false;
	}

	return true;
};
