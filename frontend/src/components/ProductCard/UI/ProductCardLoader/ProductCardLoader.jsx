import ContentLoader from 'react-content-loader';

export const ProductCardLoader = ({ animate = true }) => {
	return (
		<ContentLoader
			animate={animate}
			width={'100%'}
			height={444}
			backgroundColor="var(--dark-regular)"
			foregroundColor="var(--light-low)"
			speed={0.5}
		>
			<rect x="0" y="0" rx="8" ry="8" width="100%" height="260" />
			<rect x="0" y="276" rx="8" ry="8" width="75%" height="30" />
			<rect x="0" y="316" rx="8" ry="8" width="100%" height="14" />
			<rect x="0" y="338" rx="8" ry="8" width="100%" height="14" />
			<rect x="0" y="360" rx="8" ry="8" width="65%" height="14" />
			<rect x="0" y="404" rx="8" ry="8" width="20%" height="27" />
			<rect x="45%" y="392" rx="16" ry="16" width="55%" height="52" />
		</ContentLoader>
	);
};
