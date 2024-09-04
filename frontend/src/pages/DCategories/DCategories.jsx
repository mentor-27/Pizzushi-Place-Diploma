import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react';

import { CategoryCard } from '../../components/DashboardUI';
import { selectCategories } from '../../redux/selector';
import { Button, Title } from '../../components/UI';
import { Modal } from '../../components';
import { CategoryCardManage } from '../../components/DashboardUI/CategoryCard/UI/CategoryCardEdit/CategoryCardManage';
import styles from './DCategories.module.css';

export const DCategories = () => {
	const [isCreating, setIsCreating] = useState();
	const { categories } = useSelector(selectCategories);

	return (
		<>
			<Title text={'Список категорий'} my="0 16px" />
			<div className={styles.dCategoriesContainer}>
				{categories.map(category => (
					<CategoryCard key={category.id} {...category} />
				))}
				<Button px={12} py={12} onClick={() => setIsCreating(true)}>
					<Plus size={20} strokeWidth={3} />
				</Button>
				<Modal open={isCreating} close={() => setIsCreating(false)}>
					<CategoryCardManage close={() => setIsCreating(false)} newCategory={true} />
				</Modal>
			</div>
		</>
	);
};
