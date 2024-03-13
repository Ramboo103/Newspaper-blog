import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { Col, Container, Row } from 'react-bootstrap';

import UserInfo from '../../components/UserInfo';
import ListArticlesInProfile from '../../components/ListArticlesInProfile';
import { RootState } from '../../store';
import LimitPage from '../../components/LimitPage';
import PaginationComponent from '../../components/Pagination';

export default function UserPage() {
	const { articlesCount } = useSelector((state: RootState) => state.article);
	const { choose, username } = useParams();
	const navigate = useNavigate();

	document.title = `User - ${username}`;

	const [limit, setLimit] = useState<number>(10);

	const onSetLimit = (a: number) => setLimit(a);

	const resetPager = (): void => {
		return setLimit(10);
	};

	function handleMyArticles() {
		navigate(`/profile/${username}/MyArticles`);
		resetPager();
	}
	function handleFavorited() {
		navigate(`/profile/${username}/Favorited`);
		resetPager();
	}

	return (
		<>
			<UserInfo></UserInfo>

			<section className='userpage'>
				<Container className='mb-5'>
					<Row className='justify-content-md-center'>
						<Col lg={8}>
							<div className='d-flex justify-content-between align-items-center border-bottom mb-3'>
								<div className='tabs d-flex'>
									<div className='tab'>
										<span
											className={`h5 text-decoration-none d-flex px-2 py-3 mb-0 cursor-pointer ${
												choose === 'MyArticles' ||
												choose === undefined
													? 'text-black border border-primary-80 border-3 border-top-0 border-end-0 border-start-0'
													: 'text-secondary'
											}`}
											onClick={handleMyArticles}
										>
											My Articles
										</span>
									</div>
									<div className='tab'>
										<span
											className={`h5 text-decoration-none d-flex px-2 py-3 mb-0 cursor-pointer ${
												choose === 'Favorited'
													? 'text-black border border-primary-80 border-3 border-top-0 border-end-0 border-start-0'
													: 'text-secondary'
											}`}
											onClick={handleFavorited}
										>
											Favorited Articles
										</span>
									</div>
								</div>
								<LimitPage
									totalCount={articlesCount}
									onSetLimit={onSetLimit}
								/>
							</div>
							<div className='wrapper'>
								{choose === 'Favorited' ? (
									<ListArticlesInProfile
										filterType='Favorited'
										limit={limit}
									></ListArticlesInProfile>
								) : (
									<ListArticlesInProfile
										filterType='MyArticles'
										limit={limit}
									></ListArticlesInProfile>
								)}
							</div>

							<PaginationComponent
								totalCount={articlesCount}
								limit={limit}
							/>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
