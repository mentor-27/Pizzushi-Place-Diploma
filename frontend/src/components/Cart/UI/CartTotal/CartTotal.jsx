import { Button, Divider, Title } from '../../../UI';
import { CartSection } from '../CartSection/CartSection';
import { DELIVERY_PRICE } from '../../../../consts';
import { Package, Truck } from 'lucide-react';
import styles from './CartTotal.module.css';

export const CartTotal = ({ total, disabled }) => {
	return (
		<CartSection>
			<Title fw={500} text="Итого:" />
			<Title
				size="lg"
				fw={800}
				text={`${total ? total + DELIVERY_PRICE + ' ₽' : '---'}`}
			/>
			<Divider my="24px" color="var(--dark-middle)" />
			<div className={styles.pricingBlock}>
				<Package color="var(--accent-regular)" />
				<Title size="xs" fw={400} text="Стоимость товаров:" />
				<Divider
					axis="x"
					type="dashed"
					size="auto"
					color="var(--light-middle)"
					my="12px 0"
					style={{ flex: 1 }}
				/>
				<Title size="xs" text={`${total} ₽`} />
			</div>
			<div className={styles.pricingBlock}>
				<Truck color="var(--accent-regular)" />
				<Title size="xs" fw={400} text="Доставка:" />
				<Divider
					axis="x"
					type="dashed"
					size="auto"
					color="var(--light-middle)"
					my="12px 0"
					style={{ flex: 1 }}
				/>
				<Title size="xs" text={`${DELIVERY_PRICE} ₽`} />
			</div>
			<Divider my="24px" color="var(--dark-middle)" />
			<Button type="submit" disabled={disabled}>
				Оплатить
			</Button>
		</CartSection>
	);
};
