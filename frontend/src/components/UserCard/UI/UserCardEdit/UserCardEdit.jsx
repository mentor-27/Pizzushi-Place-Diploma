import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'lucide-react';
import * as yup from 'yup';

import { Button, Container, Input, Select, Title } from '../../../UI';
import { selectRoleId, selectRoles } from '../../../../redux/selector';
import { editUserAsync } from '../../../../redux/actions';
import styles from './UserCardEdit.module.css';

const editSchema = yup.object().shape({
	name: yup.string().optional(),
	surname: yup.string().optional(),
	email: yup.string().required('Введите почту').email('Некорректная почта'),
	phone: yup.string().optional(),
	login: yup.string().optional(),
	avatar: yup.string().optional().url('Некорректная ссылка на изображение'),
	roleId: yup.object().required(),
});

export const UserCardEdit = ({ close, ...userData }) => {
	const dispatch = useDispatch();
	const roles = useSelector(selectRoles);
	const roleId = useSelector(selectRoleId);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: userData.name,
			surname: userData.surname,
			email: userData.email,
			phone: userData.phone,
			login: userData.login,
			avatar: userData.avatar,
			roleId: roles.find(role => role.roleId === userData.roleId),
		},
		resolver: yupResolver(editSchema),
	});

	const formClose = () => {
		reset();
		close();
	};

	const onSubmit = data => {
		dispatch(
			editUserAsync(userData.id, { ...data, roleId: data.roleId.roleId }, formClose),
		);
	};

	const disabled = roleId === 1 && userData.roleId === 0;

	return (
		<Container
			className={styles.userCardEdit}
			py={32}
			px={32}
			roundedTop
			roundedBottom
			onClick={e => e.stopPropagation()}
		>
			<Title
				size="lg"
				fw={600}
				tAlign="center"
				my="0 16px"
				text={`Редактирование пользователя ${userData.name}`}
			/>
			<div className={styles.userCardEditCloseButton} onClick={formClose}>
				<X />
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.userCardEditForm}>
				<div className={styles.userCardEditInputsBlock}>
					<Input
						className={styles.userCardEditInput}
						label="Имя"
						err={errors.name?.message}
						type="text"
						{...register('name')}
						disabled={disabled}
					/>
					<Input
						className={styles.userCardEditInput}
						label="Фамилия"
						err={errors.surname?.message}
						type="text"
						{...register('surname')}
						disabled={disabled}
					/>
				</div>
				<div className={styles.userCardEditInputsBlock}>
					<Input
						className={styles.userCardEditInput}
						label="Email"
						err={errors.email?.message}
						type="text"
						{...register('email')}
						required
						disabled={disabled}
					/>
					<Input
						className={styles.userCardEditInput}
						label="Номер телефона"
						err={errors.phone?.message}
						type="tel"
						{...register('phone')}
						disabled={disabled}
					/>
				</div>
				<div className={styles.userCardEditInputsBlock}>
					<Input
						className={styles.userCardEditInput}
						label="Логин"
						err={errors.login?.message}
						type="text"
						{...register('login')}
						disabled={disabled}
					/>
					<Input
						className={styles.userCardEditInput}
						label="Аватар"
						err={errors.avatar?.message}
						type="url"
						{...register('avatar')}
						disabled={disabled}
					/>
				</div>

				<div className={styles.userCardEditInputsBlock}>
					<Controller
						name="roleId"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select
								label="Роль"
								onChange={onChange}
								value={value}
								options={roles}
								disabled={disabled}
							/>
						)}
					/>
				</div>
				<Button
					type="submit"
					className={styles.userCardEditSubmitButton}
					disabled={disabled}
				>
					Сохранить
				</Button>
			</form>
		</Container>
	);
};
