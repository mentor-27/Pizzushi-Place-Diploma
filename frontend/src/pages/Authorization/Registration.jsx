import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Block } from '../../components';
import { Button, Divider, Input, Title } from '../../components/UI';
import { registerAsync } from '../../redux/actions';
import { selectAppLoading } from '../../redux/selector';
import styles from './Authorization.module.css';
import { LoaderCircle } from 'lucide-react';

const regSchema = yup
	.object()
	.shape({
		email: yup.string().required('Email не указан'),
		password: yup
			.string()
			.min(6, 'Слишком короткий пароль. Минимум 6 символов.')
			.required('Пароль не указан'),
		pwdConfirm: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
	})
	.required();

export function Registration() {
	const navigate = useNavigate();
	const loading = useSelector(selectAppLoading);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			pwdConfirm: '',
		},
		resolver: yupResolver(regSchema),
	});

	const onSubmit = async data => {
		dispatch(registerAsync({ email: data.email, password: data.password }, navigate));
	};

	return (
		<Block py="60px">
			<form className={styles.authBlock} onSubmit={handleSubmit(onSubmit)}>
				<Title size="2xl" text="Регистрация" />
				<Divider my="0 8px" color="var(--accent75)" />
				<Input
					my="0 8px"
					bg="var(--dark50)"
					label="Email"
					err={errors.email?.message}
					type="text"
					{...register('email')}
				/>
				<Input
					my="0 16px"
					bg="var(--dark50)"
					label="Пароль"
					err={errors.password?.message}
					type="password"
					{...register('password')}
				/>
				<Input
					my="0 16px"
					bg="var(--dark50)"
					label="Повторите пароль"
					err={errors.pwdConfirm?.message}
					type="password"
					{...register('pwdConfirm')}
				/>
				<Button type="submit" className={styles.loginButton} disabled={loading}>
					{loading && <LoaderCircle className={styles.loader} />}
					Регистрация
				</Button>
			</form>
			<Link to="/login" className={styles.regLink}>
				Вход
			</Link>
		</Block>
	);
}
