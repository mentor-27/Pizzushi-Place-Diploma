/**
 * A functional component that renders a divider element with customizable styles.
 *
 * @param {string} axis - The axis of the divider (x or y).
 * @param {string} type - The type of the divider (solid, dashed, etc.).
 * @param {string} size - The size of the divider.
 * @param {string} color - The color of the divider.
 * @param {string} thickness - The thickness of the divider.
 * @param {string} mx - The margin inline of the divider.
 * @param {string} my - The margin block of the divider.
 * @param {object} style - Additional styles for the divider.
 */
export const Divider = ({
	axis = 'x',
	type = 'solid',
	size = '100%',
	color = '#000',
	thickness = '1px',
	mx = '0',
	my = '0',
	style,
}) => {
	const mapPropsToStyle = {
		// TODO - optimization
		x: {
			borderBottom: `${type} ${thickness} ${color}`,
			width: size,
			marginInline: mx,
			marginBlock: my,
			...style,
		},
		y: {
			borderLeft: `${type} ${thickness} ${color}`,
			height: size,
			marginInline: mx,
			marginBlock: my,
			...style,
		},
	};

	return <div style={mapPropsToStyle[axis] || ''}></div>;
};
