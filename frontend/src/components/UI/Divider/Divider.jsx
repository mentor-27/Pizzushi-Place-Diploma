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
