import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Categories, Category, Checkout, Main, NotFound, Product } from './pages';
import { Container, Footer, Header } from './components';
import { Drawer } from './components';
import { Scroller } from './components/UI';
import { setScroller } from './redux/actions';

export const App = () => {
	const dispatch = useDispatch();
	document.onscroll = () => {
		if (window.scrollY > 600) {
			dispatch(setScroller(true));
		} else {
			dispatch(setScroller(false));
		}
	};

	return (
		<Container roundedTop roundedBottom px="0" py="0" mx="auto" my="16px">
			<Routes>
				<Route
					element={
						<>
							<Header />
							<Outlet />
							<Footer>Footer</Footer>
							<Drawer />
						</>
					}
				>
					<Route index element={<Main />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/categories/:slug" element={<Category />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Route>
			</Routes>
			<Scroller />
		</Container>
	);
};
