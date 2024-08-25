import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { selectCategories, selectCategoryId } from '../../../../redux/selector';
import { CategoriesLoader } from './UI';
import { Button } from '../../../UI';
import { CATEGORIES_PER_PAGE } from '../../../../consts';
import { setCategoryId } from '../../../../redux/actions';
import styles from './CategoriesPanel.module.css';

const cls = classNames.bind(styles);

export const CategoriesPanel = () => {
	const dispatch = useDispatch();
	const { categories, loading } = useSelector(selectCategories);
	const activeId = useSelector(selectCategoryId);

	useEffect(() => {
		dispatch(setCategoryId(categories[0].id));
	}, []);

	return (
		<div className={styles.categoriesContainer}>
			<div className={styles.categoriesBlock}>
				{loading
					? new Array(6).fill(0).map((_, index) => <CategoriesLoader key={index} />)
					: categories.slice(0, CATEGORIES_PER_PAGE).map(({ id, name, slug }) => (
							<a
								key={id}
								id={`category_${slug}`}
								href={`#${slug}`}
								className={cls('categoryItem', { categoryActiveItem: id === activeId })}
							>
								{name}
							</a>
						))}
			</div>
			<Link to="/categories">
				<Button>Все категории </Button>
			</Link>
		</div>
	);
};
