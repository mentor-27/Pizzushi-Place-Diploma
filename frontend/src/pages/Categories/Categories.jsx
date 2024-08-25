import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { CategoryCard, Container } from '../../components';
import { Title } from '../../components/UI';
import { selectCategories, selectProducts } from '../../redux/selector';
import styles from './Categories.module.css';

export const Categories = () => {
	const navigate = useNavigate();
	const { categories } = useSelector(selectCategories);
	const { products, loading } = useSelector(selectProducts);

	const mappedProducts = products.reduce((obj, product) => {
		if (!obj[product.category.slug]) {
			obj[product.category.slug] = [];
		}
		obj[product.category.slug].push(product.imageUrl);
		return obj;
	}, {});

	return (
		<Container py="40px">
			<div className={styles.titleBlock}>
				<div className={styles.titleBlockArrow} onClick={() => navigate(-1)}>
					<ArrowLeft size={48} />
				</div>
				<Title size="xl" text="Все категории" />
			</div>
			<div className={styles.cardsContainer}>
				{categories.map((category, index) => (
					<Link key={index} to={`/categories/${category.slug}`}>
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
