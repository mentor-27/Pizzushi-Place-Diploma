import { Input } from '../../../UI';
import { CartSection } from '../CartSection/CartSection';
import styles from './CartPerson.module.css';

export const CartPerson = ({ register, errors, disabled }) => {
	return (
		<CartSection header="2. Контактные данные получателя" disabled={disabled}>
			<div className={styles.inputsBlock}>
				<Input
					label="Имя"
					err={errors.name?.message}
					type="text"
					name="name"
					{...register('name')}
				/>
				<Input label="Фамилия" type="text" name="surname" {...register('surname')} />
			</div>
			<div className={styles.inputsBlock}>
				<Input
					label="Email"
					err={errors.email?.message}
					type="email"
					name="email"
					{...register('email')}
				/>
				<Input
					label="Телефон"
					err={errors.phone?.message}
					type="tel"
					name="phone"
					{...register('phone')}
				/>
			</div>
		</CartSection>
	);
};
