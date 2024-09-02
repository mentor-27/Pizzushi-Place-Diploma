import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircleUserRound, Pencil } from 'lucide-react';

import { Modal } from '../Modal/Modal';
import { Button, Title } from '../UI';
import { UserCardEdit } from './UI/UserCardEdit/UserCardEdit';
import { selectRoles } from '../../redux/selector';
import styles from './UserCard.module.css';

export const UserCard = user => {
	const [isEditing, setIsEditing] = useState(false);
	const roles = useSelector(selectRoles);

	return (
		<div className={styles.userCardContainer}>
			<div className={styles.userCardPersonalInfo}>
				<div className={styles.userCardImgBlock}>
					{user.avatar ? (
						<img className={styles.userCardImg} src={user.avatar} alt="" />
					) : (
						<CircleUserRound strokeWidth={1} size={48} />
					)}
				</div>
				<div>
					<Title fw={600} text={`${user.name} ${user.surname}`} />
					<Title
						size="xs"
						fw={400}
						color="var(--light-regular)"
						text={roles.find(role => role.roleId === user.roleId)?.name}
					/>
				</div>
			</div>

			{/* <div>
					<Title fw={400} text={user.login} />
					<select
						defaultValue={user.roleId}
						disabled={roleId > user.roleId}
						className={styles.userCardRoleSelect}
					>
						{roles.map(role => (
							<option key={role.roleId} value={role.roleId}>
								{role.name}
							</option>
						))}
					</select>
				</div> */}
			<Button px={12} py={12} onClick={() => setIsEditing(true)}>
				<Pencil size={20} />
			</Button>
			<Modal open={isEditing} close={() => setIsEditing(false)}>
				<UserCardEdit {...user} />
			</Modal>
		</div>
	);
};
