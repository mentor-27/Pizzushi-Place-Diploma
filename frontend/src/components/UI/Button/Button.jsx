import classNames from 'classnames/bind';

import styles from './Button.module.css';

const cls = classNames.bind(styles);

export const Button = ({
	children,
	outlined = false,
	type = 'button',
	className,
	mx = 0,
	my = 0,
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
				marginInline: mx,
				marginBlock: my,
				paddingInline: px,
				paddingBlock: py,
				...props.style,
			}}
		>
			{children}
		</button>
	);
};
