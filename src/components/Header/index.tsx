import Container from 'react-bootstrap/Container';
import { Button, Nav, Navbar, Image, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { RootState } from '../../store';
import { AUTH } from '../../saga/actionTypes';

export default function Header() {
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUsername = localStorage.getItem('username');
	const avatar = localStorage.getItem('image') ?? undefined;

	const handleLogout = () => {
		dispatch({
			type: AUTH.LOGOUT,
		});

		navigate(-1);
	};

	return (
		<header className='sticky-top'>
			<Navbar
				collapseOnSelect
				expand='lg'
				bg='light'
				data-bs-theme='light'
				className='shadow-sm'
			>
				<Container>
					<Nav>
						<Link
							to='/'
							className='nav-link fs-5 fw-bold text-primary-80 text-primary-90-hover text-decoration-none'
						>
							NEWSPAPER
						</Link>
					</Nav>

					<Navbar.Toggle aria-controls='navbarScroll' />

					<Navbar.Collapse id='navbarScroll' className='flex-grow-0'>
						<Nav className='align-items-center'>
							<NavLink
								to='/'
								className={({ isActive }) => {
									return `
									${isActive ? 'active nav-item-bold' : ''} nav-item nav-link
								`;
								}}
							>
								Home
							</NavLink>
							{auth.isLoggedIn && (
								<>
									<NavLink
										to='/newpost'
										className={({ isActive }) => {
											return `
											${isActive ? 'active nav-item-bold' : ''} nav-item nav-link
										`;
										}}
									>
										<i className='ion-compose'></i> New Post
									</NavLink>

									<NavLink
										to='/settings'
										className={({ isActive }) => {
											return `
											${
												isActive
													? 'active nav-item-bold'
													: ''
											} nav-item nav-link d-lg-none d-flex align-items-center gap-1
										`;
										}}
									>
										<i className='fa-solid fa-gear'></i>
										Settings
									</NavLink>

									<NavLink
										to={`/profile/${currentUsername}`}
										title={`${currentUsername}`}
										className={({ isActive }) => {
											return `
											${
												isActive
													? 'active nav-item-bold border-danger-80'
													: ''
											} nav-item nav-link d-flex align-items-center p-0 rounded-circle border border-2
										`;
										}}
									>
										<Image
											src={`${avatar}`}
											alt={`${currentUsername}`}
											className='avatar'
											roundedCircle
										/>
									</NavLink>

									<Dropdown className='pc-lg'>
										<Dropdown.Toggle
											size='sm'
											id='dropdown-basic'
											variant=''
											className='btn-custom'
										></Dropdown.Toggle>

										<Dropdown.Menu className='dropdown-menu-end'>
											<NavLink
												to='/settings'
												className={({ isActive }) => {
													return `
													${
														isActive
															? 'active nav-item-bold'
															: ''
													} dropdown-item dropdown-item-custom d-flex align-items-center gap-1
												`;
												}}
											>
												<i className='fa-solid fa-gear'></i>
												Settings
											</NavLink>

											<Button
												onClick={handleLogout}
												className='dropdown-item dropdown-item-custom d-flex align-items-center gap-1'
											>
												<i className='fa-solid fa-arrow-right-from-bracket'></i>
												Logout
											</Button>
										</Dropdown.Menu>
									</Dropdown>

									<Button
										onClick={handleLogout}
										className='dropdown-item dropdown-item-custom d-lg-none d-flex align-items-center gap-1 w-auto'
									>
										<i className='fa-solid fa-arrow-right-from-bracket'></i>
										Logout
									</Button>
								</>
							)}
							{!auth.isLoggedIn && (
								<>
									<NavLink
										to='/login'
										className={({ isActive }) =>
											isActive
												? 'nav-link nav-link-custom text-secondary font-weight-bold'
												: 'nav-link nav-link-custom text-secondary'
										}
									>
										Sign In
									</NavLink>

									<NavLink
										to='/register'
										className={({ isActive }) =>
											isActive
												? 'nav-link nav-link-custom text-secondary font-weight-bold'
												: 'nav-link nav-link-custom text-secondary'
										}
									>
										Sign Up
									</NavLink>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
