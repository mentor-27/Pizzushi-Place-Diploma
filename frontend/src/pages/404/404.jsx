import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Block } from '../../components';
import { Button, Title } from '../../components/UI';
import styles from './404.module.css';
import oops from '../../assets/img/oops.svg';

export const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Block className={styles.container}>
			<Title size="2xl" tAlign="center" text="404" style={{ fontSize: 90 }} />
			<img src={oops} alt="oops" height={120} />
			<Title size="lg" tAlign="center" text="Страница? Не, не видели..." />
			<div className={styles.controlsBlock}>
				<Button onClick={() => navigate(-2)}>
					<ArrowLeft /> Вернуться
				</Button>
				<Link to="/">
					<Button>На главную</Button>
				</Link>
			</div>
		</Block>
	);
};
