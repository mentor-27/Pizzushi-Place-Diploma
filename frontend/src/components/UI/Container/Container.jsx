import classNames from 'classnames/bind';

import styles from './Container.module.css';

export const Container = ({
	className,
	children,
	px = '64px',
	py = '0',
	mx = 'auto',
	my = '0',
	roundedTop = false,
	roundedBottom = false,
	hiddenOverflow = false,
	...props
}) => {
	const cls = classNames.bind(styles, className);

	const classes = cls(
		'container',
		{ className },
		{
			roundedTop,
			roundedBottom,
		},
	);

	return (
		<div
			className={classes}
			{...props}
			style={{
				paddingBlock: py,
				paddingInline: px,
				marginBlock: my,
				marginInline: mx,
				overflow: hiddenOverflow ? 'hidden' : 'unset',
				...props.style,
			}}
		>
			{children}
		</div>
	);
};
