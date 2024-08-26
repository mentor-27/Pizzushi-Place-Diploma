import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { Container } from '../UI/Container/Container';
import { Button, Input } from '../UI';
import { selectProducts } from '../../redux/selector';
import { useDebounce } from '../../hooks';
import { CartButton } from './UI';
import styles from './Header.module.css';
import logo from './assets/img/logo.png';

const cls = classNames.bind(styles);

export const Header = () => {
	const [searchFocus, setSearchFocus] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const { products } = useSelector(selectProducts);
	const debSearchQuery = useDebounce(searchQuery, 250);

	const regex = new RegExp(debSearchQuery, 'i');
	const foundProducts = products.filter(product => product.name.match(regex, 'i'));

	return (
		<header className={styles.headerBlock}>
			<Container className={styles.headerContainer} px="64px" py="32px" roundedTop>
				<Link to="/" className={styles.logoBlock}>
					<img src={logo} alt="logo" height={32} width={32} />
					<div>
						<h1 className={styles.logoHeadingSign}>PIZZUSHI PLACE</h1>
						<p className={styles.logoSubSign}>апогея вкусноты</p>
					</div>
				</Link>

				<>
					{searchFocus && <div className={styles.searchOverlay}></div>}
					<div className={styles.searchBlock}>
						<Search className={styles.searchIcon} size={20} />
						<Input
							placeholder="Поиск пиццы..."
							padding="14px 24px 14px 48px"
							onFocus={() => setSearchFocus(true)}
							onBlur={() => setSearchFocus(false)}
							onChange={({ target }) => setSearchQuery(target.value)}
							value={searchQuery}
						/>
						<div className={cls('searchPopup', { searchPopupVisible: searchFocus })}>
							{(debSearchQuery && // TODO decompose this to component
								foundProducts.length &&
								foundProducts.map(product => (
									<Link
										key={product.id}
										to={`/products/${product.id}`}
										className={styles.searchPopupItem}
										onClick={() => setSearchQuery('')}
									>
										<div className={styles.searchPopupItemData}>
											<img height={32} src={product.imageUrl} alt={product.name} />
											<div>{product.name}</div>
										</div>
										<div>
											<strong>{product.price}</strong> ₽ / {product.category.name}
										</div>
									</Link>
								))) || <div className={styles.searchPopupItem}>Ничего не найдено</div>}
						</div>
					</div>
				</>

				<div className={styles.userBlock}>
					<Button outlined>
						<User size={20} />
						Войти
					</Button>

					<CartButton />
				</div>
			</Container>
		</header>
	);
};
