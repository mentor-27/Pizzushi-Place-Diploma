import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownAz, ArrowDownZA } from 'lucide-react';

import { selectSortOrder } from '../../../../redux/selector';
import { setProductsAsync, setSortOrder } from '../../../../redux/actions';
import { SORT_TYPES } from '../../../../consts';
import styles from './SortPopup.module.css';

export const SortBlock = () => {
	const dispatch = useDispatch();
	const [activeIdx, setActiveIdx] = useState(0);
	const sortOrder = useSelector(selectSortOrder);

	const changeSorting = index => {
		setActiveIdx(index);
		dispatch(setProductsAsync(SORT_TYPES[index].slug, sortOrder * -1));
		dispatch(setSortOrder(sortOrder * -1));
	};

	return (
		<div className={styles.sortBlock}>
			{sortOrder > 0 ? <ArrowDownAz size={20} /> : <ArrowDownZA size={20} />}
			Сортировка по:
			<span className={styles.popupSwitch}>{SORT_TYPES[activeIdx].title}</span>
			<div className={styles.sortPopupBlock}>
				{SORT_TYPES.map(({ title, slug }, index) => (
					<button
						key={slug}
						className={`${styles.popupItem} ${activeIdx === index && styles.popupActiveItem}`}
						onClick={() => changeSorting(index)}
					>
						{title}
					</button>
				))}
			</div>
		</div>
	);
};
