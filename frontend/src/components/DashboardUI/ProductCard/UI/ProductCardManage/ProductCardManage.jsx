import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoaderCircle, Trash2, X } from 'lucide-react';
import * as yup from 'yup';

import { Button, Container, Input, Select, Title } from '../../../../UI';
import { selectCategories, selectProducts } from '../../../../../redux/selector';
import { mapProductCategory } from '../../../../../helpers';
import {
	addProductAsync,
	deleteProductAsync,
	editProductAsync,
} from '../../../../../redux/actions';
import styles from './ProductCardManage.module.css';

const editSchema = yup.object().shape({
	name: yup.string().required('Введите название'),
	description: yup.string().optional(),
	category: yup.object().required('Выберите категорию'),
	imageUrl: yup.string().required('Введите URL изображения'),
	price: yup.number().required('Введите цену'),
});

export const ProductCardManage = ({ close, newProduct, ...product }) => {
	const dispatch = useDispatch();
	const { categories } = useSelector(selectCategories);
	const { loading } = useSelector(selectProducts);

	const mappedCategories = categories.map(mapProductCategory);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm({
		defaultValues: {
			name: newProduct ? '' : product.name,
			description: newProduct ? '' : product.description,
			category: newProduct ? '' : mapProductCategory(product.category),
			imageUrl: newProduct ? '' : product.imageUrl,
			price: newProduct ? '' : product.price,
		},
		resolver: yupResolver(editSchema),
	});

	const formClose = () => {
		reset();
		close();
	};

	const onSubmit = data => {
		if (newProduct) {
			const mappedData = { ...data, categoryId: data.category.value };
			delete mappedData.category;
			dispatch(addProductAsync(mappedData, close));
		} else {
			const mappedData = { ...data, category: data.category.value };
			dispatch(editProductAsync(product.id, mappedData, close));
		}
	};

	const deleteProduct = () => {
		dispatch(deleteProductAsync(product.id, close));
	};

	return (
		<Container
			className={styles.productCardEdit}
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
					newProduct ? 'Добавление продукта' : `Редактирование продукта ${product.name}`
				}
			/>
			<div className={styles.productCardEditCloseButton} onClick={formClose}>
				<X />
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.productCardEditForm}>
				<Input
					my="0 16px"
					label="Название"
					err={errors.name?.message}
					type="text"
					{...register('name')}
					required
				/>
				<Input my="0 16px" label="Описание" type="text" {...register('description')} />
				<div className={styles.productCardEditInputsBlock}>
					<Controller
						name="category"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select
								label="Категория"
								onChange={onChange}
								current={value}
								options={mappedCategories}
							/>
						)}
					/>
					<Input
						label="Ссылка на изображение"
						err={errors.imageUrl?.message}
						type="url"
						{...register('imageUrl')}
						required
					/>
				</div>
				<div className={styles.productCardEditInputsBlock}>
					<Input
						label="Цена"
						err={errors.price?.message}
						type="text"
						{...register('price')}
						required
					/>
					<Button
						outlined
						my="26px 0"
						className={styles.productCardEditDeleteButton}
						onClick={deleteProduct}
						disabled={loading}
					>
						<Trash2 />
						Удалить продукт
					</Button>
				</div>
				<Button
					type="submit"
					className={styles.productCardEditSubmitButton}
					disabled={loading}
				>
					{loading && <LoaderCircle className={styles.loader} />}
					{newProduct ? 'Добавить' : 'Сохранить'}
				</Button>
			</form>
		</Container>
	);
};
