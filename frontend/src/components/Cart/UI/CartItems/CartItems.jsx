import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { PackageOpen, Trash2, X } from 'lucide-react';
import classNames from 'classnames';

import { CartSection } from '../CartSection/CartSection';
import { ItemCounter } from '../../../../components';
import { Divider, Title } from '../../../UI';
import { clearCartAsync, removeCartItemAsync } from '../../../../redux/actions';
import styles from './CartItems.module.css';

export const CartItems = ({ cart, disabled }) => {
	const dispatch = useDispatch();

	const removeProduct = ({ _id }) => {
		dispatch(removeCartItemAsync(_id));
	};

	const clearCartFunc = () => {
		dispatch(clearCartAsync());
	};

	const ClearCart = ({ className }) => {
		return (
			<div
				className={classNames(styles.clearCartWrapper, className)}
				onClick={clearCartFunc}
			>
				<Trash2 size={20} />
				<span>Очистить корзину</span>
			</div>
		);
	};

	return (
		<CartSection header="1. Корзина" ActionComponent={ClearCart} disabled={disabled}>
			{!cart.products.length ? (
				<div className={styles.cartEmptySign}>
					<PackageOpen />
					<Title size="md" text={'Корзина пуста'} tAlign="center" />
				</div>
			) : (
				cart.products.map(({ item, quantity }, index) => (
					<Fragment key={item._id}>
						<div className={styles.cartItemBlock}>
							<div className={styles.cartItem}>
								<div
									className={styles.cartItemDeleteButton}
									onClick={() => removeProduct(item)}
								>
									<X size={20} />
								</div>
								<div className={styles.cartItemImageBlock}>
									<img
										src={item.imageUrl}
										alt={item.name}
										className={styles.cartItemImage}
									/>
								</div>
								<div>
									<Title size="sm" text={item.name} ws="normal" />
									<Title
										size="xs"
										text={item.description}
										ws="normal"
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
					</Fragment>
				))
			)}
		</CartSection>
	);
};
