import ContentLoader from 'react-content-loader';

export const CategoriesLoader = () => {
	return (
		<ContentLoader
			width={96}
			height={44}
			backgroundColor="var(--light-middle)"
			style={{ padding: '14px 18px 10px' }}
			speed={0.25}
		>
			<rect x="0" y="0" rx="4px" ry="4px" width="60px" height="18px" />
		</ContentLoader>
	);
};
