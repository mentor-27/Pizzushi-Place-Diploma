import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Container } from '../../components';
import { Button, Title } from '../../components/UI';
import styles from './403.module.css';
import oops from '../../assets/img/angry.svg';

export const Forbidden = () => {
	const navigate = useNavigate();

	return (
		<Container className={styles.container}>
			<Title size="2xl" tAlign="center" text="403" style={{ fontSize: 90 }} />
			<img src={oops} alt="oops" height={120} />
			<Title size="lg" tAlign="center" text="Нельзя Вам сюда" />
			<div className={styles.controlsBlock}>
				<Button onClick={() => navigate(-2)}>
					<ArrowLeft /> Вернуться
				</Button>
				<Link to="/">
					<Button>На главную</Button>
				</Link>
			</div>
		</Container>
	);
};
