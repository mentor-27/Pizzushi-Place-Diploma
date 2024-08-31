import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircleUserRound } from 'lucide-react';

import { Container } from '../../components';
import { Title } from '../../components/UI';
import { selectCurrentUser } from '../../redux/selector';
import styles from './Dashboard.module.css';
import logo from '../../assets/img/logo.png';

export const Dashboard = () => {
	const currentUser = useSelector(selectCurrentUser);

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
					<Link to="users" className={styles.dashboardMenuItem}>
						<Title size="xs" fw={400} text="Пользователи" />
					</Link>
					<Link to="categories" className={styles.dashboardMenuItem}>
						<Title size="xs" fw={400} text="Категории" />
					</Link>
					<Link to="products" className={styles.dashboardMenuItem}>
						<Title size="xs" fw={400} text="Товары" />
					</Link>
				</div>
			</Container>
			<Container px="0" py="0" mx="0" className={styles.dashboardContent}>
				<Container px="16px 0" mx="0" className={styles.dashboardHeader}>
					<div className={styles.dashboardHeaderTitle}>
						<Title text="Панель управления" />
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
							<Title size="xs" text={'Some role'}></Title>
						</div>
					</div>
				</Container>
				<Container px="16px" py="16px">
					<Outlet />
				</Container>
			</Container>
		</Container>
	);
};
