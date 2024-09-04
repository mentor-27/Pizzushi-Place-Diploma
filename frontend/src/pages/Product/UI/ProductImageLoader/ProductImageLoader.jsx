import ContentLoader from 'react-content-loader';

export const ProductImageLoader = ({ animate = true }) => {
	return (
		<ContentLoader
			animate={animate}
			width={500}
			height={500}
			backgroundColor="var(--dark50)"
			foregroundColor="var(--light25)"
			speed={0.5}
		>
			<rect x="0" y="0" rx="8px" ry="8px" width="500" height="500" />
		</ContentLoader>
	);
};
