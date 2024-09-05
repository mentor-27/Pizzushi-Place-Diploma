import { useSelector } from 'react-redux';

import { Container, ProductGroupList, TopBar } from '../../components';
import { Title } from '../../components/UI';
import { selectCategories } from '../../redux/selector';
import { CATEGORIES_PER_PAGE } from '../../consts';
import styles from './Main.module.css';

export const Main = () => {
	const { categories, loading } = useSelector(selectCategories);

	return (
		<>
			<Container px={64} py="40px 0" width="100%">
				<Title size="xl" text="Все товары" />
			</Container>
			<TopBar />
			<Container my="36px 0">
				<div className={styles.mainBlock}>
					{loading ? (
						<ProductGroupList title="Загрузка..." />
					) : (
						categories
							?.slice(0, CATEGORIES_PER_PAGE)
							.map(category => (
								<ProductGroupList
									key={category.id}
									title={category.name}
									category={category}
								/>
							))
					)}
				</div>
			</Container>
		</>
	);
};
