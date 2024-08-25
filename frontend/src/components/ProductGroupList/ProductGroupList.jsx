import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Title } from '../UI';
import { ProductCard } from '../';
import { useIntersection } from '../../hooks';
import { setCategoryId } from '../../redux/actions';
import { selectProducts } from '../../redux/selector';
import { ProductCardLoader } from '../ProductCard/UI';
import { Link } from 'react-router-dom';
import { CircleArrowRight } from 'lucide-react';
import { PRODUCTS_PER_MAIN_PAGE } from '../../consts';
import styles from './ProductGroupList.module.css';

export const ProductGroupList = ({ title, category }) => {
	const dispatch = useDispatch();
	const intersectionRef = useRef(null);
	const entry = useIntersection(intersectionRef);
	const { products, loading } = useSelector(selectProducts);

	useEffect(() => {
		if (entry && entry.isIntersecting) {
			dispatch(setCategoryId(category?.id));
		}
	}, [dispatch, entry, category?.id]);

	return (
		<div
			className={styles.productGroup}
			id={category?.slug || 'Загрузка...'}
			ref={intersectionRef}
		>
			<Title size="lg" text={title} style={{ fontWeight: 800, marginBottom: 20 }} />
			<div className={styles.productGroupList}>
				{loading
					? new Array(8).fill(0).map((_, index) => <ProductCardLoader key={index} />)
					: products?.length &&
						products
							.filter(product => product.category.id === category?.id)
							.slice(0, PRODUCTS_PER_MAIN_PAGE)
							.map(product => <ProductCard key={product.id} {...product} />)}
				{!loading && (
					<Link
						to={`/categories/${category?.slug}`}
						className={styles.productGroupItemCardLink}
					>
						<Title
							size="sm"
							text="Все товары категории..."
							className={styles.productGroupItemCardCaption}
						/>
						<div className={styles.productGroupItemCardArrowBlock}>
							Перейти <CircleArrowRight />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
