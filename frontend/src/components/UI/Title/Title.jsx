import { createElement } from 'react';

export const Title = ({
	className,
	size = 'sm',
	text,
	fw = 700,
	color = '#fff',
	lh = 1.2,
	ws = 'nowrap',
	shadow = false,
	tAlign = 'start',
	...props
}) => {
	const mapTagBySize = {
		'2xs': 'h6',
		xs: 'h5',
		sm: 'h4',
		md: 'h3',
		lg: 'h2',
		xl: 'h1',
		'2xl': 'h1',
	};

	const mapStyleBySize = {
		'2xs': { fontSize: 12 },
		xs: { fontSize: 16 },
		sm: { fontSize: 22 },
		md: { fontSize: 26 },
		lg: { fontSize: 32 },
		xl: { fontSize: 40 },
		'2xl': { fontSize: 48 },
	};

	return createElement(
		mapTagBySize[size] || 'h5',
		{
			className,
			...props,
			style: {
				...(mapStyleBySize[size] || { fontSize: 22 }),
				color,
				fontWeight: fw,
				whiteSpace: ws,
				lineHeight: lh,
				textAlign: tAlign,
				filter: shadow && `drop-shadow(0 0 ${shadow}px #0008)`,
				...props.style,
			},
		},
		text,
	);
};
