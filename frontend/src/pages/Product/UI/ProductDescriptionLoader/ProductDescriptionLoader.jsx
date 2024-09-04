import ContentLoader from 'react-content-loader';

export const ProductDescriptionLoader = ({ animate = true }) => {
	return (
		<ContentLoader
			animate={animate}
			width="100%"
			height="100%"
			backgroundColor="var(--light0)"
			foregroundColor="var(--light100)"
			speed={0.5}
		>
			<rect x="0" y="4" rx="8" ry="8" width="40%" height="32" />
			<rect x="0" y="56" rx="8" ry="8" width="100%" height="14" />
			<rect x="0" y="78" rx="8" ry="8" width="100%" height="14" />
			<rect x="0" y="100" rx="8" ry="8" width="65%" height="14" />
			<rect x="318" y="192" rx="16" ry="16" width="116" height="52" />
		</ContentLoader>
	);
};
