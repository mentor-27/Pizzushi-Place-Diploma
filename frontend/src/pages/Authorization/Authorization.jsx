import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container } from '../../components';
import { Button, Divider, Input, Title } from '../../components/UI';
import { loginAsync } from '../../redux/actions';
import styles from './Authorization.module.css';

const authSchema = yup
	.object()
	.shape({
		authId: yup.string().required('Email не указан'),
		password: yup.string().required('Пароль не указан'),
	})
	.required();

export function Authorization() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			authId: '',
			password: '',
		},
		resolver: yupResolver(authSchema),
	});

	const onSubmit = async data => {
		dispatch(loginAsync(data, navigate));
	};

	return (
		<Container py="60px">
			<form className={styles.authBlock} onSubmit={handleSubmit(onSubmit)}>
				<Title size="2xl" text="Авторизация" />
				<Divider my="0 8px" color="var(--accent-light)" />
				<Input
					my="0 8px"
					bg="var(--dark-middle)"
					label="Логин или Email"
					err={errors.authId?.message}
					type="text"
					{...register('authId')}
				/>
				<Input
					my="0 16px"
					bg="var(--dark-middle)"
					label="Пароль"
					err={errors.password?.message}
					type="password"
					{...register('password')}
				/>
				<Button type="submit" className={styles.loginButton}>
					Войти
				</Button>
			</form>
			<Link to="/registration" className={styles.regLink}>
				Регистрация
			</Link>
		</Container>
	);
}
