import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import classNames from 'classnames';

import { CartSection } from '../CartSection/CartSection';
import { ItemCounter } from '../../../../components';
import { Divider, Title } from '../../../UI';
import { selectCart } from '../../../../redux/selector';
import styles from './CartItems.module.css';
import { setCartEmpty } from '../../../../redux/actions';
import React from 'react';

export const CartItems = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);

	const clearCart = () => {
		dispatch(setCartEmpty());
	};

	const ClearCart = ({ className }) => {
		return (
			<div className={classNames(styles.clearCartWrapper, className)} onClick={clearCart}>
				<Trash2 size={20} />
				<span>Очистить корзину</span>
			</div>
		);
	};

	return (
		<CartSection header="1. Корзина" ActionComponent={ClearCart}>
			{cart.products.map(({ item, quantity }, index) => (
				<React.Fragment key={item._id}>
					<div className={styles.cartItemBlock}>
						<div className={styles.cartItem}>
							<div className={styles.cartItemImageBlock}>
								<img
									src={item.imageUrl}
									alt={item.name}
									className={styles.cartItemImage}
								/>
							</div>
							<div>
								<Title size="sm" text={item.name} />
								<Title
									size="xs"
									text={item.description}
									fw={400}
									color="var(--light-middle)"
								/>
							</div>
						</div>
						<div className={styles.cartItemCounterBlock}>
							<ItemCounter
								className={styles.cartItemCounter}
								id={item._id}
								quantity={quantity}
								price={item.price}
							/>
						</div>
					</div>
					{index !== cart.products.length - 1 && (
						<Divider my="20px 30px" color="var(--dark-middle)" />
					)}
				</React.Fragment>
			))}
		</CartSection>
	);
};
