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
					px={'6px 8px'}
					py={6}
					className={styles.paginationArrow}
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft />
				</Button>
				{Array(lastPage)
					.fill()
					.map((_, index) => (
						<div
							key={index}
							className={cls('paginationItem', currentPage === index + 1 && 'active')}
							onClick={() => setCurrentPage(index + 1)}
						>
							{index + 1}
						</div>
					))}
				<Button
					px={'8px 6px'}
					py={6}
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
