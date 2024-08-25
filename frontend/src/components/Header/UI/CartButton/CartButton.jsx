import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, LoaderCircle, ShoppingCart } from 'lucide-react';

import { Button } from '../../../UI';
import { selectCart } from '../../../../redux/selector';
import { toggleDrawer } from '../../../../redux/actions';
import styles from './CartButton.module.css';

export const CartButton = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);

	const itemsQty = cart.products.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<>
			<Button
				className={styles.cartButton}
				outlined={!itemsQty}
				onClick={() => dispatch(toggleDrawer(true))}
			>
				{!!itemsQty && (
					<>
						<strong style={{ whiteSpace: 'nowrap' }}>{cart.totalPrice} ₽</strong>
						<span className={styles.separator}></span>{' '}
					</>
				)}

				<div className={styles.cartBlock}>
					{cart.loading ? (
						<LoaderCircle className={styles.loader} />
					) : (
						<ShoppingCart size={20} />
					)}
					{!!itemsQty && <strong>{itemsQty}</strong>}
				</div>

				<ArrowRight className={styles.arrowRight} />
			</Button>
		</>
	);
};
