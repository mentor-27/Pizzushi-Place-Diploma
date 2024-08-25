import React from 'react';

import { Container } from '../../components';
import { Title } from '../../components/UI';

export const NotFound = () => {
	return (
		<Container>
			<Title size="2xl" text={'Такой страницы нет'} />
		</Container>
	);
};
