import { useSelector } from 'react-redux';

import { UserCard } from '../../components';
import { selectUsers } from '../../redux/selector';
import { Title } from '../../components/UI';
import styles from './DUsers.module.css';

export const DUsers = () => {
	const users = useSelector(selectUsers);

	return (
		<>
			<Title text={'Список пользователей'} my="0 16px" />
			<div className={styles.dUsersContainer}>
				{users.map(user => (
					<UserCard key={user.id} {...user} />
				))}
			</div>
		</>
	);
};
