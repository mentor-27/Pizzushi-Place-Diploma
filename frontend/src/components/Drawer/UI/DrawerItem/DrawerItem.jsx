import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';

import { Divider, Title } from '../../../UI';
import { DrawerItemCounter } from '..';
import { removeCartItemAsync } from '../../../../redux/actions/removeCartItemAsync';
import styles from './DrawerItem.module.css';

export const DrawerItem = ({ item, quantity }) => {
	const dispatch = useDispatch();
	const { _id, name, description, imageUrl, price } = item;
	const [itemQuantity, setItemQuantity] = useState(quantity);

	const removeProduct = () => {
		dispatch(removeCartItemAsync(_id));
	};

	useEffect(() => {
		setItemQuantity(quantity);
	}, [quantity]);

	return (
		<div className={styles.drawerItemContainer}>
			<div className={styles.drawerItemImageBlock}>
				<img className={styles.drawerItemImage} src={imageUrl} alt={name} />
			</div>
			<div className={styles.drawerItemInfoBlock}>
				<Title size="xs" text={name} />
				<p className={styles.drawerItemDescription}>{description}</p>
				<Divider axis="x" margin="6px 0" color="var(--light-low)" />
				<DrawerItemCounter id={_id} price={price} quantity={itemQuantity} />
			</div>
			<div className={styles.drawerItemDeleteButton}>
				<X size={20} onClick={removeProduct} />
			</div>
		</div>
	);
};
