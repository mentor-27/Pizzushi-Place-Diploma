import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, LogIn, MonitorCog } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { Container } from '../UI/Container/Container';
import { Button, Input, Title } from '../UI';
import { selectToken, selectProducts, selectRoleId } from '../../redux/selector';
import { logoutAsync } from '../../redux/actions';
import { useDebounce } from '../../hooks';
import { CartButton } from './UI';
import styles from './Header.module.css';
import logo from '../../assets/img/logo.png';

const cls = classNames.bind(styles);

export const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchFocus, setSearchFocus] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const { products } = useSelector(selectProducts);
	const token = useSelector(selectToken);
	const roleId = useSelector(selectRoleId);
	const debSearchQuery = useDebounce(searchQuery, 250);

	const regex = new RegExp(debSearchQuery, 'i');
	const foundProducts = products.filter(product => product.name.match(regex, 'i'));

	const logout = () => {
		dispatch(logoutAsync(navigate));
	};

	return (
		<header className={styles.headerBlock}>
			<Container className={styles.headerContainer} px="64px" py="32px" roundedTop>
				<Link to="/" className={styles.logoBlock}>
					<img src={logo} alt="logo" height={32} width={32} />
					<div>
						<Title size="md" text="PIZZUSHI PLACE" lh={1} />
						<Title
							size="xs"
							fw={400}
							color="var(--light-middle)"
							text="апогея вкусноты"
							lh={1}
						/>
					</div>
				</Link>

				<>
					{searchFocus && <div className={styles.searchOverlay}></div>}
					<div className={styles.searchBlock}>
						<Search className={styles.searchIcon} size={20} />
						<Input
							placeholder="Поиск пиццы..."
							px="24px"
							py="14px"
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
					{[0, 1].includes(roleId) && (
						<Link to="/dashboard" tabIndex={-1}>
							<Button outlined>
								<MonitorCog />
								CMS
							</Button>
						</Link>
					)}
					{token ? (
						<Button onClick={logout} outlined>
							<LogOut size={20} />
							Выйти
						</Button>
					) : (
						<Link to="/login" tabIndex={-1}>
							<Button outlined>
								<LogIn size={20} />
								Войти
							</Button>
						</Link>
					)}
					<CartButton />
				</div>
			</Container>
		</header>
	);
};
