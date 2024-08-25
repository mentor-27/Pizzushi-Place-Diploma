import { useSelector } from 'react-redux';
import { ArrowUp } from 'lucide-react';
import classNames from 'classnames/bind';

import { selectScroller } from '../../../redux/selector';
import styles from './Scroller.module.css';

const cls = classNames.bind(styles);

export const Scroller = () => {
	const visible = useSelector(selectScroller);

	return (
		<div className={cls('scroller', { visible })} onClick={() => window.scrollTo(0, 0)}>
			<ArrowUp size={36} className={styles.scrollerIcon} />
		</div>
	);
};
