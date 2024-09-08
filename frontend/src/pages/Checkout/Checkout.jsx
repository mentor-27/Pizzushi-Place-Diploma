import { Cart, Block } from '../../components';
import { Title } from '../../components/UI';

export const Checkout = () => {
	return (
		<Block py="40px" width="100%">
			<Title size="xl" text="Оформление заказа" />
			<Cart />
		</Block>
	);
};
