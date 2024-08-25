import { LoaderCircle } from 'lucide-react';

import { Title } from '../UI';
import styles from './CategoryCard.module.css';

export const CategoryCard = ({ loading, name, images }) => {
	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardImgContainer}>
				{loading
					? new Array(4).fill(0).map((_, index) => (
							<div key={index} className={styles.cardImgLoaderBlock}>
								<LoaderCircle size={48} className={styles.cardImgLoader} />
							</div>
						))
					: images?.slice(0, 4).map((image, index) => (
							<div key={index} className={styles.cardImgBlock}>
								<img className={styles.cardImgItem} src={image} alt={name} />
							</div>
						))}
			</div>
			<Title text={name} className={styles.cardSubTitle} />
		</div>
	);
};
