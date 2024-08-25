import { useEffect, useState } from 'react';

export const useIntersection = ref => {
	const [entry, setEntry] = useState(null);

	useEffect(() => {
		if (ref.current) {
			const intersectionHandler = entries => setEntry(entries[0]);

			const observer = new IntersectionObserver(intersectionHandler, { threshold: 0.4 });
			observer.observe(ref.current);

			return () => {
				setEntry(null);
				observer.disconnect();
			};
		}
	}, [ref]);

	return entry;
};
