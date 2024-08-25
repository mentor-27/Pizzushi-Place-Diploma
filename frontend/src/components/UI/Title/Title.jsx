import React from 'react';

import styles from './Title.module.css';

export const Title = ({ size = 'sm', text, ...props }) => {
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

	return React.createElement(
		mapTagBySize[size] || 'h5',
		{
			className: styles.title,
			...props,
			style: { ...(mapStyleBySize[size] || { fontSize: 22 }), ...props.style },
		},
		text,
	);
};
