import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, X } from 'lucide-react';

import { Button, Divider } from '../UI';
import { DrawerItem } from './UI';
import { selectCart } from '../../redux/selector';
import { toggleDrawer } from '../../redux/actions';
import styles from './Drawer.module.css';

export const Drawer = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const drawerIsOpen = useSelector(store => store.app.drawerIsOpen);

	const itemsQty = cart.products.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<>
			<div
				open={drawerIsOpen}
				onClick={e => {
					e.stopPropagation();
					dispatch(toggleDrawer(false));
				}}
				className={styles.cartDrawerOverlay}
			></div>
			<div open={drawerIsOpen} className={styles.cartDrawerContainer}>
				<div className={styles.cartDrawerBlock}>
					<div className={styles.drawerHeader}>
						{/* TODO decompose */}
						<span>
							В корзине <strong>{itemsQty ? `${itemsQty} товара` : `нет товаров`}</strong>
						</span>
						<div
							className={styles.cartDrawerCloseButton}
							onClick={() => dispatch(toggleDrawer(false))}
						>
							<X />
						</div>
					</div>

					<div className={styles.drawerContent}>
						{cart.products?.map(product => (
							<DrawerItem key={product._id} {...product} />
						))}
					</div>

					<div className={styles.drawerFooter}>
						<div className={styles.drawerFooterTotal}>
							<span>Итого:</span>

							<Divider
								axis="x"
								type="dashed"
								size="auto"
								color="var(--light)"
								my="12px 0"
								style={{ flex: 1 }}
							/>

							<strong>{`${cart.totalPrice || 0} ₽`}</strong>
						</div>
						<Link
							to="/checkout"
							className={styles.drawerFooterButton}
							onClick={() => dispatch(toggleDrawer(false))}
						>
							<Button style={{ width: '100%' }} tabIndex={-1}>
								Оформить заказ
								<ArrowRight style={{ width: 20, marginLeft: 8 }} />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
