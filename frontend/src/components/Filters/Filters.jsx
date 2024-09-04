import { useState } from 'react';
import ReactSlider from 'react-slider';

import { Divider, Input, Title } from '../UI';
import { FilterCheckbox } from './UI';
import styles from './Filters.module.css';
import './slider.css';

export const Filters = () => {
	const [priceRange, setPriceRange] = useState([0, 100]);

	return (
		<div>
			<Title text="Фильтрация" style={{ marginBottom: '20px' }} />
			<div className={styles.filtersBlock}>
				<FilterCheckbox text="Можно собирать" value="1" margin="0 0 16px" />
				<FilterCheckbox text="Новинки" value="2" />
				<Divider axis="h" thickness="2px" color="var(--light0)" margin="24px 0 28px" />
				<div>
					<p style={{ marginBottom: 16 }}>Ценовой диапазон</p>
					<div
						style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}
					>
						<Input
							type="number"
							min={0}
							max={100}
							value={priceRange[0]}
							onChange={({ target }) => setPriceRange([+target.value, priceRange[1]])}
						/>
						<Input
							type="number"
							min={0}
							max={100}
							value={priceRange[1]}
							onChange={({ target }) => setPriceRange([priceRange[0], +target.value])}
						/>
					</div>
					<ReactSlider
						className="horizontalSlider"
						thumbClassName="sliderThumb"
						trackClassName="sliderTrack"
						thumbActiveClassName="sliderActiveThumb"
						value={priceRange}
						renderThumb={({ key, ...props }, state) => (
							<div key={key} {...props}>
								<span className="sliderThumbSign">{state.valueNow}</span>
							</div>
						)}
						onChange={setPriceRange}
						pearling
					/>
				</div>
			</div>
		</div>
	);
};
