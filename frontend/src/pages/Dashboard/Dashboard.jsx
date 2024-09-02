import { Link, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircleUserRound } from 'lucide-react';
import classNames from 'classnames/bind';

import { Container } from '../../components';
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
		<Container
			px="0"
			roundedTop
			roundedBottom
			hiddenOverflow
			className={styles.dashboardContainer}
		>
			<Container px="0" mx="0" py="16px 24px" className={styles.dashboardSidebar}>
				<Link to="/" className={styles.logoBlock}>
					<img src={logo} alt="logo" height={32} width={32} />
					<div>
						<Title size="sm" text="PIZZUSHI PLACE" lh={1} />
						<Title
							size="2xs"
							fw={400}
							color="var(--light-regular)"
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
				</div>
			</Container>
			<Container px="0" py="0" mx="0" className={styles.dashboardContent}>
				<Container px="16px 0" mx="0" className={styles.dashboardHeader}>
					<div className={styles.dashboardHeaderTitle}>
						<Title text="Панель управления" tAlign="center" />
					</div>
					<div className={styles.dashboardUserBlock}>
						<div className={styles.dashboardUserAvatarBlock}>
							{true ? (
								<CircleUserRound size={64} />
							) : (
								<img src={''} alt={'User avatar'} />
							)}
						</div>
						<div>
							<Title text={currentUser.name} />
							<Title size="xs" text={roleName}></Title>
						</div>
					</div>
				</Container>
				<Container px="32px" py="32px" className={styles.dashboardContentBody}>
					<Outlet />
				</Container>
			</Container>
		</Container>
	);
};
