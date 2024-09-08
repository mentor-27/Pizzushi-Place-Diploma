import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoaderCircle, Trash2, X } from 'lucide-react';
import * as yup from 'yup';

import { Button, Block, Input, Title } from '../../../../UI';
import { selectCategories } from '../../../../../redux/selector';
import {
	addCategoryAsync,
	deleteCategoryAsync,
	editCategoryAsync,
} from '../../../../../redux/actions';
import styles from './CategoryCardManage.module.css';

const editSchema = isNew =>
	yup.object().shape({
		name: yup.string().required('Введите название'),
		slug: yup.string()[isNew ? 'optional' : 'required']('Введите транслитерацию'),
	});

export const CategoryCardManage = ({ close, newCategory, ...category }) => {
	const dispatch = useDispatch();
	const { loading } = useSelector(selectCategories);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: newCategory ? '' : category.name,
			slug: newCategory ? '' : category.slug,
		},
		resolver: yupResolver(editSchema(newCategory)),
	});

	const formClose = () => {
		reset();
		close();
	};

	const onSubmit = data => {
		if (newCategory) {
			dispatch(addCategoryAsync(data, close));
		} else {
			dispatch(editCategoryAsync(category.id, data, close));
		}
	};

	const deleteCategory = () => {
		dispatch(deleteCategoryAsync(category.id, close));
	};

	return (
		<Block
			className={styles.categoryCardEdit}
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
				text={
					newCategory ? 'Создание категории' : `Редактирование категории ${category.name}`
				}
			/>
			<div className={styles.categoryCardEditCloseButton} onClick={formClose}>
				<X />
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.categoryCardEditForm}>
				<div className={styles.categoryCardEditInputsBlock}>
					<Input
						label="Название"
						err={errors.name?.message}
						type="text"
						{...register('name')}
					/>
					<Input
						label="Транслитерация"
						err={errors.slug?.message}
						type="text"
						{...register('slug')}
					/>
				</div>

				{!newCategory && (
					<Button
						my="0 16px"
						outlined
						className={styles.categoryCardEditDeleteButton}
						style={{ alignSelf: 'flex-end' }}
						onClick={deleteCategory}
						disabled={loading}
					>
						<Trash2 />
						Удалить категорию
					</Button>
				)}
				<Button
					type="submit"
					className={styles.categoryCardEditSubmitButton}
					disabled={loading}
				>
					{loading && <LoaderCircle className={styles.loader} />}
					{newCategory ? 'Создать' : 'Сохранить'}
				</Button>
			</form>
		</Block>
	);
};
