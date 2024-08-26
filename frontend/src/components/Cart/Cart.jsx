import { Container } from '../UI';
import { CartAddress, CartItems, CartPerson, CartTotal } from './UI';

import styles from './Cart.module.css';

export const Cart = () => {
	return (
		<Container px="0" py="32px" className={styles.container}>
			<div className={styles.dataBlock}>
				<CartItems />
				<CartPerson />
				<CartAddress />
			</div>
			<div className={styles.totalBlock}>
				<CartTotal />
			</div>
		</Container>
	);
};
