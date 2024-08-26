import { useDispatch } from 'react-redux';
import { Minus, Plus } from 'lucide-react';
import classNames from 'classnames';

import { Button } from '../UI';
import { addCartItemAsync } from '../../redux/actions';
import styles from './ItemCounter.module.css';

export const ItemCounter = ({ className, id, quantity, price }) => {
	const dispatch = useDispatch();

	const decQty = () => {
		dispatch(addCartItemAsync(id, quantity - 1));
	};

	const incQty = () => {
		dispatch(addCartItemAsync(id, quantity + 1));
	};

	return (
		<div className={classNames(styles.counterContainer, className)}>
			<div className={styles.counterControls}>
				<Button className={styles.counterIcon} onClick={decQty} disabled={quantity === 1}>
					<Minus size={12} color="currentColor" />
				</Button>
				<span className={styles.counterValue}>{quantity}</span>
				<Button className={styles.counterIcon} onClick={incQty}>
					<Plus size={12} color="currentColor" />
				</Button>
			</div>
			<strong>{price * quantity} ₽</strong>
		</div>
	);
};
