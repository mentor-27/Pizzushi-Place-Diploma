import { Input, Title } from '../../../UI';
import styles from './UserCardEdit.module.css';

export const UserCardEdit = userData => {
	return (
		<div className={styles.userCardEdit}>
			<Title fw={600} text="Редактирование пользователя" />
			<Input className={styles.userCardEditInput} label="Имя" value={userData.name} />
		</div>
	);
};
