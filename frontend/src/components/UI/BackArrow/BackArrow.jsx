import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import styles from './BackArrow.module.css';

export const BackArrow = ({ size = 48 }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.backArrow} onClick={() => navigate(-1)}>
			<ArrowLeft size={size} />
		</div>
	);
};
