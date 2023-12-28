import { ReactNode } from 'react';
import styles from './defaultLayout.module.scss';
import layers from '../assets/footer.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = { children: ReactNode };

const DefaultLayout = ({ children }: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className="container-custom">
				<ToastContainer />
				<div className={styles.body}>{children}</div>
			</div>
			<footer className={styles.footer}>
				<img className={styles.footerImage} src={layers} alt="footerImage" />
			</footer>
		</div>
	);
};

export default DefaultLayout;
