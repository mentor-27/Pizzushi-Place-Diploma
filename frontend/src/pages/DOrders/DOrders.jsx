import { useDispatch, useSelector } from 'react-redux';
import { LoaderCircle, RefreshCw } from 'lucide-react';
import classNames from 'classnames/bind';

import { OrderCard } from '../../components/DashboardUI';
import { Button, Title } from '../../components/UI';
import { selectOrders } from '../../redux/selector';
import { getOrdersAsync } from '../../redux/actions';
import styles from './DOrders.module.css';

const cls = classNames.bind(styles);

export const DOrders = () => {
	const dispatch = useDispatch();
	const { orders, loading } = useSelector(selectOrders);

	const refreshOrders = () => {
		dispatch(getOrdersAsync());
	};

	return (
		<>
			<div className={styles.dOrdersControls}>
				<Title text="Список заказов" my="0 16px" />
				<Button px={20} py={10} onClick={refreshOrders} disabled={loading}>
					Обновить
					<RefreshCw className={cls({ loading })} />
				</Button>
			</div>
			{loading ? (
				<LoaderCircle size={64} className={cls({ loading })} />
			) : orders.length ? (
				orders.map(order => <OrderCard key={order.id} {...order} />)
			) : (
				<Title text="Заказов пока нет" />
			)}
		</>
	);
};
