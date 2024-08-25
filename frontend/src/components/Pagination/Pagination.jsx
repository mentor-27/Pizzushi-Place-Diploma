import classNames from 'classnames/bind';

import styles from './Pagination.module.css';
import { Button } from '../UI';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cls = classNames.bind(styles);

export const Pagination = ({ currentPage, setCurrentPage, lastPage }) => {
	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationBlock}>
				<Button
					className={styles.paginationArrow}
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft />
				</Button>
				{Array(lastPage)
					.fill()
					.map((_, i) => (
						<div
							key={i}
							className={cls('paginationItem', currentPage === i + 1 && 'active')}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</div>
					))}
				<Button
					className={styles.paginationArrow}
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage === lastPage}
				>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
};
