import { useSelector } from 'react-redux';

import { selectCategories } from '../../redux/selector';
import { Title } from '../../components/UI';

export const DCategories = () => {
	const { categories, loading } = useSelector(selectCategories);

	return (
		<div>
			{loading ? (
				<Title text={'Загрузка...'} />
			) : (
				categories?.map(category => <Title key={category.id} text={category.name} />)
			)}
		</div>
	);
};
