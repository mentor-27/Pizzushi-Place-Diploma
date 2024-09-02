import { useDispatch, useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { Button, Title } from '../UI';
import { addCartItemAsync } from '../../redux/actions';
import styles from './ProductCard.module.css';

export const ProductCard = ({ id, imageUrl, name, price, description }) => {
	const dispatch = useDispatch();
	const store = useStore();

	const addToCart = () => {
		const quantity = store
			.getState()
			.cart.products.find(({ item }) => item._id === id)?.quantity;
		dispatch(addCartItemAsync(id, quantity ? quantity + 1 : 1, name));
	};

	return (
		<div className={styles.productCard}>
			<Link to={`/product/${id}`} className={styles.productCardLink}>
				<div className={styles.productCardImageBlock}>
					<img className={styles.productCardImage} src={imageUrl} alt={name} />
				</div>
				<Title
					size="sm"
					my="16px 4px"
					text={name}
					className={styles.productCardTitle}
					ws="normal"
				/>
				<p className={styles.productCardDescription}>{description}</p>
			</Link>
			<div className={styles.productCardPriceBlock}>
				<span className={styles.productCardPrice}>
					<strong>{price} ₽</strong>
				</span>
				<Button onClick={addToCart}>
					<Plus size={20} style={{ marginRight: 4 }} />
					Добавить
				</Button>
			</div>
		</div>
	);
};
