import { Link, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircleUserRound } from 'lucide-react';
import classNames from 'classnames/bind';

import { Block } from '../../components';
import { Title } from '../../components/UI';
import { selectCurrentUser, selectRoles } from '../../redux/selector';
import styles from './Dashboard.module.css';
import logo from '../../assets/img/logo.png';

const cls = classNames.bind(styles);

export const Dashboard = () => {
	const currentUser = useSelector(selectCurrentUser);
	const roles = useSelector(selectRoles);

	const roleName = roles.find(({ roleId }) => roleId === currentUser.roleId)?.name;

	return (
		<Block
			px={0}
			width="100%"
			overflow="hidden"
			roundedTop
			roundedBottom
			className={styles.dashboardContainer}
		>
			<Block px={0} mx={0} py="16px 24px" width="25%" className={styles.dashboardSidebar}>
				<Link to="/" className={styles.logoBlock}>
					<img src={logo} alt="logo" height={32} width={32} />
					<div>
						<Title size="sm" text="PIZZUSHI PLACE" lh={1} />
						<Title
							size="2xs"
							fw={400}
							color="var(--light50)"
							text="апогея вкусноты"
							lh={1}
						/>
					</div>
				</Link>
				<div className={styles.dashboardMenu}>
					<NavLink
						to="users"
						className={({ isActive }) => cls('dashboardMenuItem', { active: isActive })}
					>
						Пользователи
					</NavLink>
					<NavLink
						to="categories"
						className={({ isActive }) => cls('dashboardMenuItem', { active: isActive })}
					>
						Категории
					</NavLink>
					<NavLink
						to="products"
						className={({ isActive }) => cls('dashboardMenuItem', { active: isActive })}
					>
						Товары
					</NavLink>
					<NavLink
						to="orders"
						className={({ isActive }) => cls('dashboardMenuItem', { active: isActive })}
					>
						Заказы
					</NavLink>
				</div>
			</Block>
			<Block px={0} py={0} mx={0} width="100%" className={styles.dashboardContent}>
				<Block px="16px 0" mx={0} className={styles.dashboardHeader}>
					<div className={styles.dashboardHeaderTitle}>
						<Title text="Панель управления" tAlign="center" />
					</div>
					<div className={styles.dashboardUserBlock}>
						<div className={styles.dashboardUserAvatarBlock}>
							{currentUser.avatar ? (
								<img src={currentUser.avatar} alt={'User avatar'} />
							) : (
								<CircleUserRound size={64} />
							)}
						</div>
						<div>
							<Title text={currentUser.name} />
							<Title size="xs" text={roleName}></Title>
						</div>
					</div>
				</Block>
				<Block px={32} py={32} overflow="auto" className={styles.dashboardContentBody}>
					<Outlet />
				</Block>
			</Block>
		</Block>
	);
};
