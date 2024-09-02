import classNames from 'classnames/bind';

import styles from './Button.module.css';

const cls = classNames.bind(styles);

export const Button = ({
	children,
	outlined = false,
	type = 'button',
	className,
	px = 18,
	py = 14,
	...props
}) => {
	return (
		<button
			type={type}
			className={cls('button', { outlined }, className)}
			{...props}
			style={{
				paddingInline: px,
				paddingBlock: py,
			}}
		>
			{children}
		</button>
	);
};
