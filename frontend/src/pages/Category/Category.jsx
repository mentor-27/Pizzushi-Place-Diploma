import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, ProductCard } from '../../components';
import { ProductCardLoader } from '../../components/ProductCard/UI';
import { BackArrow, Divider, Title } from '../../components/UI';
import { Pagination } from '../../components/';
import { selectCategories, selectProducts } from '../../redux/selector';
import { PRODUCTS_PER_CATEGORY_PAGE } from '../../consts';
import styles from './Category.module.css';

export const Category = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { products, loading } = useSelector(selectProducts);
	const { categories } = useSelector(selectCategories);
	const {
		params: { slug },
	} = useMatch('/categories/:slug');

	const categoryId = categories.find(category => category.slug === slug)?.id;
	const categorizedProducts = products.filter(
		product => product.category.id === categoryId,
	);
	const offset = (currentPage - 1) * PRODUCTS_PER_CATEGORY_PAGE;
	const lastPage = Math.ceil(categorizedProducts.length / PRODUCTS_PER_CATEGORY_PAGE);
	const name =
		products.filter(product => product.category.slug === slug)[0]?.category.name ||
		'Загрузка...';

	return (
		<Container py="40px">
			<div className={styles.titleBlock}>
				<BackArrow />
				<Title size="xl" text={name} />
			</div>
			<div className={styles.mainBlock}>
				{loading
					? new Array(8).fill(0).map((_, index) => <ProductCardLoader key={index} />)
					: categorizedProducts
							.slice(offset, offset + PRODUCTS_PER_CATEGORY_PAGE)
							.map(product => <ProductCard key={product.id} {...product} />)}
			</div>
			{lastPage > 1 && (
				<>
					<Divider size="80%" mx="auto" my="32px" color="var(--light-middle)" />
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						lastPage={lastPage}
					/>
				</>
			)}
		</Container>
	);
};
