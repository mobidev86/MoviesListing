import { Button } from 'antd';
import { ButtonHTMLType } from 'antd/es/button';
import styles from './button.module.scss';
import { ReactNode } from 'react';

type Props = {
	onSubmit: (e?: any) => void;
	className?: string;
	htmlType?: ButtonHTMLType;
	children: ReactNode;
	width?: string;
	loading?: boolean;
};

const CustomButton = ({ onSubmit, className, htmlType, width, children, loading }: Props) => {
	return (
		<Button
			htmlType={htmlType}
			style={{ width: width }}
			onClick={onSubmit}
			className={`${styles.submitButton} ${className}`}
			loading={loading}
		>
			{children}
		</Button>
	);
};

export default CustomButton;
