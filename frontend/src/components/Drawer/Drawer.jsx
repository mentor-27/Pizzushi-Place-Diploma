import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

import { Button, Divider, Title } from '../UI';
import { DrawerItem } from './UI';
import { selectCart } from '../../redux/selector';
import { toggleDrawer } from '../../redux/actions';
import emptyCartImg from '../../assets/img/empty_box.webp';
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
			/>
			<div open={drawerIsOpen} className={styles.cartDrawerContainer}>
				<div className={styles.cartDrawerBlock}>
					<div className={styles.drawerHeader}>
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
					{cart.totalPrice ? (
						<div className={styles.drawerContent}>
							{cart.products.map(product => (
								<DrawerItem key={product._id} {...product} />
							))}
						</div>
					) : (
						<div className={styles.drawerEmpty}>
							<img src={emptyCartImg} alt="empty cart" />
							<Title size="md" text="Корзина пуста" />
							<Link to="/">
								<Button
									my="32px 0"
									tabIndex={-1}
									onClick={() => dispatch(toggleDrawer(false))}
								>
									<ArrowLeft />
									За покупками
								</Button>
							</Link>
						</div>
					)}
					<div className={styles.drawerFooter}>
						<div className={styles.drawerFooterTotal}>
							<span>Итого:</span>

							<Divider
								axis="x"
								type="dashed"
								size="auto"
								color="var(--light100)"
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
							<Button
								style={{ width: '100%' }}
								tabIndex={-1}
								disabled={cart.products.length === 0}
							>
								Оформить заказ
								<ArrowRight size={20} style={{ marginLeft: 8 }} />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
