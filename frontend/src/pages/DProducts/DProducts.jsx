import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react';

import { selectProducts } from '../../redux/selector';
import { Button, Title } from '../../components/UI';
import { ProductCard } from '../../components/DashboardUI/';
import { Modal } from '../../components';
import styles from './DProducts.module.css';
import { ProductCardManage } from '../../components/DashboardUI/ProductCard/UI';

export const DProducts = () => {
	const [isCreating, setIsCreating] = useState(false);
	const { products, loading } = useSelector(selectProducts);

	return (
		<>
			<div className={styles.dProductsControls}>
				<Title text="Список товаров" />
				<Button px={12} py={12} onClick={() => setIsCreating(true)}>
					<Plus size={20} strokeWidth={3} />
				</Button>
				<Modal open={isCreating} close={() => setIsCreating(false)}>
					<ProductCardManage close={() => setIsCreating(false)} newProduct={true} />
				</Modal>
			</div>
			<div className={styles.dProductsBlock}>
				{loading ? (
					<Title text={'Загрузка...'} />
				) : (
					products.map(product => <ProductCard key={product.id} {...product} />)
				)}
			</div>
		</>
	);
};
