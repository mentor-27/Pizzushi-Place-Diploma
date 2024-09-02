import { useSelector } from 'react-redux';

import { selectProducts } from '../../redux/selector';
import { Title } from '../../components/UI';

export const DProducts = () => {
	const { products, loading } = useSelector(selectProducts);

	return (
		<div>
			{loading ? (
				<Title text={'Загрузка...'} />
			) : (
				products?.map(product => <Title key={product.id} text={product.name} />)
			)}
		</div>
	);
};
