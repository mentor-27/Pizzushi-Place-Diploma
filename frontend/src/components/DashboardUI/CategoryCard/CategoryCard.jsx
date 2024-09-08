import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Pencil } from 'lucide-react';

import { Modal } from '../../Modal/Modal';
import { Button, Block, Title } from '../../UI';
import { CategoryCardManage } from './UI';
import { selectProducts } from '../../../redux/selector';
import styles from './CategoryCard.module.css';

export const CategoryCard = ({ ...category }) => {
	const [isEditing, setIsEditing] = useState(false);
	const { products } = useSelector(selectProducts);

	const prodsNum = products.filter(product => product.category.id === category.id).length;

	return (
		<Block px={12} py={12} mx={0} className={styles.categoryCardContainer}>
			<div>
				<Title fw={600} text={category.name} />
				<Title size="xs" fw={400} color="var(--light50)" text={category.slug} />
			</div>
			<div className={styles.categoryProdsNumBlock}>
				<span>товаров</span>
				<Title size="xs" fw={400} color="var(--light90)" text={prodsNum} />
			</div>
			<Button px={12} py={12} onClick={() => setIsEditing(true)}>
				<Pencil size={20} />
			</Button>
			<Modal open={isEditing} close={() => setIsEditing(false)}>
				<CategoryCardManage
					{...category}
					close={() => setIsEditing(false)}
					newCategory={false}
				/>
			</Modal>
		</Block>
	);
};
