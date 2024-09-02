import React from 'react';

import { Container } from '../../components';
import { Title } from '../../components/UI';
import styles from './404.module.css';
import oops from '../../assets/img/oops.svg';

export const NotFound = () => {
	return (
		<Container className={styles.container}>
			<Title size="2xl" tAlign="center" text="404" style={{ fontSize: 180 }} />
			<img src={oops} alt="oops" height={150} />
			<Title size="xl" tAlign="center" text="Страница? Не, не видели..." />
		</Container>
	);
};
