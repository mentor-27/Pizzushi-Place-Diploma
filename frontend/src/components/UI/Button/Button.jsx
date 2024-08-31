import classNames from 'classnames/bind';

import styles from './Button.module.css';

const cls = classNames.bind(styles);

export const Button = ({
	children,
	outlined = false,
	type = 'button',
	className,
	...props
}) => {
	return (
		<button type={type} className={cls('button', { outlined }, className)} {...props}>
			{children}
		</button>
	);
};
