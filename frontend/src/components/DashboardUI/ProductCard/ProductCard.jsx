import { useState } from 'react';
import { Pencil } from 'lucide-react';

import { Button, Container, Title } from '../../UI';
import { Modal } from '../../Modal/Modal';
import { ProductCardManage } from './UI';
import styles from './ProductCard.module.css';

export const ProductCard = product => {
	const { name, description, category, imageUrl, price, popularity } = product;
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Container px={16} py={16} mx={0} className={styles.productCardContainer}>
			<div className={styles.productCardImgBlock}>
				<img src={imageUrl} alt={name} />
			</div>
			<div className={styles.productCardInfoBlock}>
				<span className={styles.serviceSign}>Название:</span>
				<Title my="0 6px" lh={0.8} size="md" text={name} ws="normal" />
				<div className={styles.productCardDescriptionBlock}>
					<span className={styles.serviceSign}>Описание:</span>
					<Title size="xs" lh={1.4} my="0 6px" text={description} ws="normal" />
				</div>
				<div className={styles.productCardCategoryBlock}>
					<span className={styles.serviceSign}>Категория:</span>
					<Title size="xs" lh={1.4} text={category.name} />/
					<Title size="xs" lh={1.4} text={category.slug} />
				</div>
				<div className={styles.productCardPriceBlock}>
					<span className={styles.serviceSign}>Цена:</span>
					<Title size="xs" lh={1.4} text={`${price} ₽`} tAlign="end" />
				</div>
				<div className={styles.productCardPopularityBlock}>
					<span className={styles.serviceSign}>Популярность:</span>
					<Title size="xs" lh={1.4} text={popularity} tAlign="end" />
				</div>
				<Button
					px={12}
					py={12}
					onClick={() => setIsEditing(true)}
					className={styles.editButton}
				>
					<Pencil size={20} />
				</Button>
				<Modal open={isEditing} close={() => setIsEditing(false)}>
					<ProductCardManage
						{...product}
						close={() => setIsEditing(false)}
						newProduct={false}
					/>
				</Modal>
			</div>
		</Container>
	);
};
