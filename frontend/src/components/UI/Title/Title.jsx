import { createElement } from 'react';

/**
 * A reusable title component with customizable size, font weight, color, and more.
 *
 * @param {string} className - Additional class name for the title element.
 * @param {string} size - Size of the title (2xs, xs, sm, md, lg, xl, 2xl).
 * @param {string} text - The title text.
 * @param {number} fw - Font weight of the title (default: 700).
 * @param {string} color - Color of the title (default: currentColor).
 * @param {number} lh - Line height of the title (default: 1.2).
 * @param {string} ws - White space of the title (default: nowrap).
 * @param {boolean} shadow - Whether to add a drop shadow to the title (default: false).
 * @param {string} tAlign - Text alignment of the title (default: start).
 * @param {number} mx - Margin inline of the title (default: 0).
 * @param {number} my - Margin block of the title (default: 0).
 * @param {object} props - Additional props to pass to the title element.
 */
export const Title = ({
	className,
	size = 'sm',
	text,
	fw = 700,
	color = 'currentColor',
	lh = 1.2,
	ws = 'nowrap',
	shadow = false,
	tAlign = 'start',
	mx = 0,
	my = 0,
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
				marginInline: mx,
				marginBlock: my,
				filter: shadow && `drop-shadow(0 0 ${shadow}px #0008)`,
				...props.style,
			},
		},
		text,
	);
};
