import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { Container } from '../../components';
import { BackArrow, Button, Title } from '../../components/UI';
import { ProductImageLoader, ProductDescriptionLoader } from './UI';
import { addCartItemAsync } from '../../redux/actions';
import { selectProducts } from '../../redux/selector';
import styles from './Product.module.css';

export const Product = () => {
	const dispatch = useDispatch();
	const { products, loading } = useSelector(selectProducts);
	const params = useParams();
	const store = useStore();

	const addToCart = () => {
		const quantity = store
			.getState()
			.cart.products.find(({ item }) => item._id === params.id)?.quantity;
		dispatch(addCartItemAsync(params.id, quantity ? quantity + 1 : 1));
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
								<Title size="md" text={product.name} />
								<p className={styles.productDescription}>{product.description}</p>
							</div>
							<Button style={{ alignSelf: 'flex-end' }} onClick={addToCart}>
								В корзину
							</Button>
						</>
					)}
				</div>
			</div>
		</Container>
	);
};
