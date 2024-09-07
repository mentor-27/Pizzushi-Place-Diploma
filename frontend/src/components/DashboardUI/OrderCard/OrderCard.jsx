import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import classNames from 'classnames/bind';

import { selectProducts, selectUsers } from '../../../redux/selector';
import { Button, Container, Title } from '../../UI';
import { ORDER_STATUSES } from '../../../consts';
import { deleteOrderAsync } from '../../../redux/actions';
import styles from './OrderCard.module.css';

const cls = classNames.bind(styles);

export const OrderCard = order => {
	const dispatch = useDispatch();
	const [isExpanded, setIsExpanded] = useState();
	const ref = useRef(null);
	const { products } = useSelector(selectProducts);
	const { users, roles } = useSelector(selectUsers);

	const removeOrder = () => {
		dispatch(deleteOrderAsync(order.id));
	};

	const thisOrderUser = order.user ? users.find(({ id }) => id === order.user) : 'Гость';
	const thisOrderUserRole = roles.find(
		({ roleId }) => roleId === thisOrderUser.roleId,
	)?.name;
	const thisOrderStatus = ORDER_STATUSES[order.status];
	const thisOrderProducts = order.cart.products.map(({ item, quantity }) => ({
		item: products.find(({ id }) => id === item),
		quantity,
	}));

	return (
		<Container px={16} py={16} my="0 16px" className={styles.orderCardContainer}>
			<div className={styles.orderCardHeader}>
				<div className={styles.orderCardTitle}>
					<Title text={`Заказ #${order.orderNumber}`} />
					<span className={styles.orderCardDate}>
						{new Date(order.createdAt).toLocaleString()}
					</span>
				</div>
				<div className={styles.orderCardExpander}>
					<span
						className={cls(
							'orderCardStatus',
							{ completed: order.status === 1 },
							{ canceled: order.status === 2 },
						)}
					>
						{thisOrderStatus}
					</span>
					<Button
						px={16}
						py={8}
						onClick={() => setIsExpanded(!isExpanded)}
						className={styles.orderCardExpanderButton}
					>
						<ChevronDown size={32} className={cls('icon', { flipped: isExpanded })} />
					</Button>
				</div>
			</div>
			<div
				ref={ref}
				className={styles.orderCardDetails}
				style={
					isExpanded ? { height: ref.current.scrollHeight, marginTop: 16 } : { height: 0 }
				}
			>
				<div className={styles.orderCardDetailsSection}>
					<div className={styles.orderCardDetailsColumn}>
						<div className={styles.orderCardUser}>
							<span className={styles.serviceSign}>Заказчик:</span>
							<Title
								ws="normal"
								text={thisOrderUser.name || thisOrderUser.email || thisOrderUser}
							/>
							{thisOrderUserRole && (
								<>
									/<span className={styles.serviceSign}>Роль:</span>
									<Title ws="normal" text={thisOrderUserRole} />
								</>
							)}
						</div>
						<div className={styles.orderCardRecipientInfo}>
							<div className={styles.name}>
								<span className={styles.serviceSign}>Получатель:</span>
								<Title
									ws="normal"
									text={`${order.reciever.name} ${order.reciever.surname}`.trim()}
								/>
							</div>
							<div className={styles.phone}>
								<span className={styles.serviceSign}>Телефон:</span>
								<Title ws="normal" text={order.reciever.phone} />
							</div>
							<div className={styles.address}>
								<span className={styles.serviceSign}>Адрес:</span>
								<Title ws="normal" text={order.reciever.address} />
							</div>
							{order.reciever.comment && (
								<div className={styles.comment}>
									<span className={styles.serviceSign}>Комментарий:</span>
									<Title size="xs" ws="normal" text={order.reciever.comment} />
								</div>
							)}
						</div>
					</div>
					<div className={styles.orderCardDetailsColumn}>
						<span className={styles.serviceSign}>Товары:</span>
						<div className={styles.orderCardProducts}>
							{thisOrderProducts.map(product => (
								<div key={product.item.id} className={styles.orderCardProduct}>
									<div className={styles.imageBlock}>
										<img
											className={styles.image}
											src={product.item.imageUrl}
											alt={product.item.name}
										/>
									</div>
									<p>{product.item.name}</p>
									<Title fw={400} size="xs" text={`${product.quantity} ед.`} />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={styles.orderCardBottom}>
					<Button
						px={20}
						py={10}
						outlined
						className={styles.deleteButton}
						onClick={removeOrder}
					>
						Удалить
					</Button>
					<div className={styles.orderCardTotal}>
						<Title fw={400} text="Итого:" />
						<Title text={`${order.cart.totalPrice} ₽`} />
					</div>
				</div>
			</div>
		</Container>
	);
};
