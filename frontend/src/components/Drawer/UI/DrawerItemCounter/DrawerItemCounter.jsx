import { useDispatch } from 'react-redux';
import { Minus, Plus } from 'lucide-react';

import { addCartItemAsync } from '../../../../redux/actions';
import styles from './DrawerItemCounter.module.css';

export const DrawerItemCounter = ({ id, quantity, price }) => {
	const dispatch = useDispatch();

	const decQty = () => {
		dispatch(addCartItemAsync(id, quantity - 1));
	};

	const incQty = () => {
		dispatch(addCartItemAsync(id, quantity + 1));
	};

	return (
		<div className={styles.counterContainer}>
			<div className={styles.counterControls}>
				<button className={styles.counterIcon} onClick={decQty} disabled={quantity === 1}>
					<Minus size={12} color="currentColor" />
				</button>
				<span className={styles.counterValue}>{quantity}</span>
				<button className={styles.counterIcon} onClick={incQty}>
					<Plus size={12} color="currentColor" />
				</button>
			</div>
			<strong>{price * quantity} ₽</strong>
		</div>
	);
};
