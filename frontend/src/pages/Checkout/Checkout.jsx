import { Cart, Container } from '../../components';
import { Title } from '../../components/UI';

export const Checkout = () => {
	return (
		<Container py="40px" width="100%">
			<Title size="xl" text="Оформление заказа" />
			<Cart />
		</Container>
	);
};
