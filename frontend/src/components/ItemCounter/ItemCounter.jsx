import { useDispatch } from 'react-redux';
import { Minus, Plus } from 'lucide-react';
import classNames from 'classnames';

import { Button } from '../UI';
import { addCartItemAsync } from '../../redux/actions';
import styles from './ItemCounter.module.css';

export const ItemCounter = ({ className, id, quantity, price, manual, setQuantity }) => {
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
				<Button
					px={0}
					py={0}
					className={styles.counterIcon}
					onClick={manual ? () => setQuantity(quantity - 1) : decQty}
					disabled={quantity === 1}
				>
					<Minus size={12} color="currentColor" />
				</Button>
				<span className={styles.counterValue}>{quantity}</span>
				<Button
					px={0}
					py={0}
					className={styles.counterIcon}
					onClick={manual ? () => setQuantity(quantity + 1) : incQty}
				>
					<Plus size={12} color="currentColor" />
				</Button>
			</div>
			{price && <strong>{price * quantity} ₽</strong>}
		</div>
	);
};
