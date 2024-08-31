import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container } from '../UI';
import { CartAddress, CartItems, CartPerson, CartTotal } from './UI';
import { selectCart, selectCurrentUser } from '../../redux/selector';
import { checkoutAsync } from '../../redux/actions';
import { mapCheckout } from '../../helpers';
import styles from './Cart.module.css';

const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

const personSchema = yup
	.object()
	.shape({
		name: yup.string().required('Введите имя получателя').min(2, 'Слишком короткое имя'),
		surname: yup.string().optional(),
		email: yup.string().optional().email('Некорректная почта'),
		phone: yup.string().matches(phoneRegExp, 'Некорректный номер телефона'),
		address: yup.string().required('Введите адрес').min(5, 'Слишком короткий адрес'),
		comment: yup.string().optional(),
	})
	.required();

export const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const currentUser = useSelector(selectCurrentUser);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: currentUser.name || '',
			surname: currentUser.surname || '',
			email: currentUser.email || '',
			phone: currentUser.phone || '',
			address: '',
			comment: '',
		},
		resolver: yupResolver(personSchema),
	});

	const onSubmit = data => {
		dispatch(checkoutAsync(mapCheckout(data), reset, navigate));
	};

	const disabled = cart.products.length === 0;

	return (
		<Container px="0" py="32px">
			<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
				<div className={styles.dataBlock}>
					<CartItems cart={cart} disabled={disabled} />
					<CartPerson register={register} errors={errors} disabled={disabled} />
					<CartAddress register={register} errors={errors} disabled={disabled} />
				</div>
				<div className={styles.totalBlock}>
					<CartTotal total={cart.totalPrice} disabled={disabled} />
				</div>
			</form>
		</Container>
	);
};
