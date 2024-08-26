import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';

import { Divider, Title } from '../../../UI';
import { ItemCounter } from '../../../../components';
import { removeCartItemAsync } from '../../../../redux/actions/removeCartItemAsync';
import { selectCart } from '../../../../redux/selector';
import styles from './DrawerItem.module.css';

export const DrawerItem = ({ item }) => {
	const dispatch = useDispatch();
	const { _id, name, description, imageUrl, price } = item;
	const { products } = useSelector(selectCart);

	const removeProduct = () => {
		dispatch(removeCartItemAsync(_id));
	};

	const quantity = products.find(cartItem => cartItem.item._id === _id)?.quantity || 0;

	return (
		<div className={styles.drawerItemContainer}>
			<div className={styles.drawerItemImageBlock}>
				<img className={styles.drawerItemImage} src={imageUrl} alt={name} />
			</div>
			<div className={styles.drawerItemInfoBlock}>
				<Title size="xs" text={name} />
				<p className={styles.drawerItemDescription}>{description}</p>
				<Divider axis="x" margin="6px 0" color="var(--light-low)" />
				<ItemCounter id={_id} price={price} quantity={quantity} />
			</div>
			<div className={styles.drawerItemDeleteButton}>
				<X size={20} onClick={removeProduct} />
			</div>
		</div>
	);
};
