import classNames from 'classnames/bind';

import styles from './Container.module.css';

/**
 * A reusable container component that wraps its children in a div element.
 * It provides various styling options, including padding, margin, and overflow control.
 *
 * @param {string} className - Additional class names to be applied to the container.
 * @param {React.ReactNode} children - The content to be wrapped by the container.
 * @param {string} px - The horizontal padding of the container (default: '64px').
 * @param {string} py - The vertical padding of the container (default: '0').
 * @param {string} mx - The horizontal margin of the container (default: 'auto').
 * @param {string} my - The vertical margin of the container (default: '0').
 * @param {boolean} roundedTop - Whether to apply a rounded top corner to the container (default: false).
 * @param {boolean} roundedBottom - Whether to apply a rounded bottom corner to the container (default: false).
 * @param {boolean} overflow - Whether to hide the overflow of the container (default: false).
 */
export const Container = ({
	className,
	children,
	px = 64,
	py = 0,
	mx = 'auto',
	my = 0,
	width = 'unset',
	roundedTop = false,
	roundedBottom = false,
	overflow = 'hidden',
	...props
}) => {
	const cls = classNames.bind(styles);

	const classes = cls('container', [className], {
		roundedTop,
		roundedBottom,
	});

	return (
		<div
			className={classes}
			{...props}
			style={{
				paddingBlock: py,
				paddingInline: px,
				marginBlock: my,
				marginInline: mx,
				overflow,
				width,
				...props.style,
			}}
		>
			{children}
		</div>
	);
};
