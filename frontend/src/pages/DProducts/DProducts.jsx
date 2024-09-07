import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderCircle, Plus, RefreshCw } from 'lucide-react';
import classNames from 'classnames/bind';

import { selectProducts } from '../../redux/selector';
import { Button, Title } from '../../components/UI';
import { ProductCard } from '../../components/DashboardUI/';
import { Modal } from '../../components';
import { ProductCardManage } from '../../components/DashboardUI/ProductCard/UI';
import { setProductsAsync } from '../../redux/actions';
import styles from './DProducts.module.css';

const cls = classNames.bind(styles);

export const DProducts = () => {
	const dispatch = useDispatch();
	const [isCreating, setIsCreating] = useState(false);
	const { products, loading } = useSelector(selectProducts);

	const refreshPdoucts = () => {
		dispatch(setProductsAsync());
	};

	return (
		<>
			<div className={styles.dProductsControls}>
				<Title text="Список товаров" />
				<div className={styles.dProductsControlsButtons}>
					<Button px={20} py={10} onClick={refreshPdoucts} disabled={loading}>
						Обновить
						<RefreshCw className={cls({ loading })} />
					</Button>
					<Button px={12} py={12} onClick={() => setIsCreating(true)}>
						<Plus size={20} strokeWidth={3} />
					</Button>
				</div>
				<Modal open={isCreating} close={() => setIsCreating(false)}>
					<ProductCardManage close={() => setIsCreating(false)} newProduct={true} />
				</Modal>
			</div>
			<div className={styles.dProductsBlock}>
				{loading ? (
					<LoaderCircle size={64} className={cls({ loading })} />
				) : (
					products.map(product => <ProductCard key={product.id} {...product} />)
				)}
			</div>
		</>
	);
};
