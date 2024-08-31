import { Input, TextArea } from '../../../UI';
import { CartSection } from '../CartSection/CartSection';

export const CartAddress = ({ register, errors, disabled }) => {
	return (
		<CartSection header="3. Адрес доставки" disabled={disabled}>
			<Input
				my="0 16px"
				label="Введите адрес"
				err={errors.address?.message}
				type="text"
				name="address"
				placeholder="Адрес доставки"
				{...register('address')}
			/>
			<TextArea
				label="Комментарий к заказу"
				name="comment"
				placeholder="Дополнительная информация для курьера"
				{...register('comment')}
			/>
		</CartSection>
	);
};
