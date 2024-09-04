import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BackArrow, Title } from '../../components/UI';
import { CategoryCard, Container } from '../../components';
import { selectCategories, selectProducts } from '../../redux/selector';
import styles from './Categories.module.css';

export const Categories = () => {
	const { categories } = useSelector(selectCategories);
	const { products, loading } = useSelector(selectProducts);

	const mappedProducts = products.reduce((obj, product) => {
		if (!obj[product.category.slug]) {
			obj[product.category.slug] = [];
		}
		obj[product.category.slug].push(product.imageUrl);
		return obj;
	}, {});

	const emptySlug = categories
		.filter(({ slug }) => !Object.keys(mappedProducts).includes(slug))
		.map(({ slug }) => slug);

	const mappedCategories = categories.filter(({ slug }) => !emptySlug.includes(slug));

	return (
		<Container py="40px">
			<div className={styles.titleBlock}>
				<BackArrow />
				<Title size="xl" text="Все категории" />
			</div>
			<div className={styles.cardsContainer}>
				{mappedCategories.map(category => (
					<Link key={category.id} to={`/categories/${category.slug}`}>
						<CategoryCard
							loading={loading}
							name={category.name}
							images={mappedProducts[category.slug]}
						/>
					</Link>
				))}
			</div>
		</Container>
	);
};
