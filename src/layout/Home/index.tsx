import { useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import ListArticles from '../../components/ListArticles';
import PaginationComponent from '../../components/Pagination';
import LimitPage from '../../components/LimitPage';
import Tags from '../../components/Tags';
import { RootState } from '../../store';

export default function Home() {
	document.title = 'Home page';

	const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
	const { articlesCount } = useSelector((state: RootState) => state.article);

	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean);
	const slug: string = pathSegments[0];
	const nameTag: string = pathSegments[1];

	const [limit, setLimit] = useState<number>(10);

	const onSetLimit = (a: number) => setLimit(a);

	const resetPager = (): void => {
		return setLimit(10);
	};

	return (
		<>
			<section className='mainvisual bg-warning-40 mb-5'>
				<Container>
					<div className='py-5 text-center'>
						<h1 className='text-uppercase fw-bold'>newspaper</h1>
						<blockquote className='blockquote mb-1'>
							<p className='mb-0'>
								A good newspaper is a nation talking to itself
							</p>
						</blockquote>
					</div>
				</Container>
			</section>

			<Container className='mb-5'>
				<Row>
					<Col lg={8}>
						<div className='d-flex justify-content-between align-items-center border-bottom mb-3'>
							<div className='tabs d-flex'>
								<div className='tab'>
									<Link
										to={'/'}
										className={`h5 text-decoration-none d-flex px-2 py-3 mb-0 ${
											!isNaN(parseInt(slug)) ||
											slug === undefined
												? 'text-black border border-primary-80 border-3 border-top-0 border-end-0 border-start-0'
												: 'text-secondary'
										}`}
										onClick={resetPager}
									>
										Global Feed
									</Link>
								</div>
								{auth && (
									<div className='tab'>
										<Link
											to={'/feed'}
											className={`h5 text-decoration-none d-flex px-2 py-3 mb-0 ${
												slug === 'feed'
													? 'text-black border border-primary-80 border-3 border-top-0 border-end-0 border-start-0'
													: 'text-secondary'
											}`}
											onClick={resetPager}
										>
											Your Feed
										</Link>
									</div>
								)}

								{nameTag && isNaN(parseInt(nameTag)) && (
									<div className='tab'>
										<Link
											to={'/tag'}
											className={`h5 text-decoration-none d-flex px-2 py-3 mb-0 ${
												slug === 'tag'
													? 'text-black'
													: 'text-secondary'
											}`}
											onClick={resetPager}
										>
											#{nameTag}
										</Link>
									</div>
								)}
							</div>

							<LimitPage
								totalCount={articlesCount}
								onSetLimit={onSetLimit}
							/>
						</div>
						<div className='wrapper'>
							<ListArticles limit={limit} />
						</div>

						<PaginationComponent
							totalCount={articlesCount}
							limit={limit}
						/>
					</Col>
					<Col lg={4}>
						<h2>Tags</h2>
						<Tags />
					</Col>
				</Row>
			</Container>
		</>
	);
}
