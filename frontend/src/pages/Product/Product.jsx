import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { Container, ItemCounter } from '../../components';
import { BackArrow, Button, Title } from '../../components/UI';
import { ProductImageLoader, ProductDescriptionLoader } from './UI';
import { addCartItemAsync } from '../../redux/actions';
import { selectProducts } from '../../redux/selector';
import styles from './Product.module.css';
import { useState } from 'react';

export const Product = () => {
	const dispatch = useDispatch();
	const [initQuantity, setInitQuantity] = useState(1);
	const { products, loading } = useSelector(selectProducts);
	const params = useParams();
	const store = useStore();

	const addToCart = () => {
		const quantity = store
			.getState()
			.cart.products.find(({ item }) => item._id === params.id)?.quantity;
		dispatch(
			addCartItemAsync(params.id, quantity ? quantity + initQuantity : initQuantity),
		);
	};

	const product = products.find(product => product.id === params.id);

	if (!product) return <Navigate to="/404" />;

	return (
		<Container className={styles.productContainer} px="64px" py="40px">
			<BackArrow />
			<div className={styles.productBlock}>
				{loading ? (
					<ProductImageLoader />
				) : (
					<div className={styles.productImageBlock}>
						<img
							className={styles.productImage}
							src={product.imageUrl}
							alt={product.name}
						/>
					</div>
				)}
				<div className={styles.productInfoBlock}>
					{loading ? (
						<ProductDescriptionLoader />
					) : (
						<>
							<div>
								<div className={styles.productTitle}>
									<Title size="md" text={product.name} />
									<Title size="md" text={product.price + ' ₽'} />
								</div>
								<p className={styles.productDescription}>{product.description}</p>
							</div>
							<div className={styles.productControls}>
								<ItemCounter
									id={product.id}
									className={styles.productCounter}
									quantity={initQuantity}
									setQuantity={setInitQuantity}
									price={product.price}
									manual
								/>
								<Button style={{ alignSelf: 'flex-end' }} onClick={addToCart}>
									В корзину
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</Container>
	);
};
