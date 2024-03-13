import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Image, Spinner } from 'react-bootstrap';

import { RootState } from '../../store';
import { ARTICLE } from '../../saga/actionTypes';

export default function DetailedArticle() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const detailArticle = useSelector(
		(state: RootState) => state.article.article,
	);
	const [localFavorited, setLocalFavorited] = useState(
		detailArticle.favorited,
	);
	const [localFollow, setLocalFollow] = useState(
		detailArticle.author?.following,
	);
	const isLoading = useSelector(
		(state: RootState) => state.article.isLoading,
	);
	const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
	const currentUsername = localStorage.getItem('username');
	const { slug } = useParams();

	document.title = `${detailArticle.title}`;

	useEffect(() => {
		dispatch({
			type: ARTICLE.FETCH,
			payload: {
				slug: `${slug}`,
			},
		});
	}, [dispatch, slug]);

	const handleFavorited = () => {
		if (!auth) {
			navigate('/login');
		} else {
			setLocalFavorited(!detailArticle.favorited);

			dispatch({
				type: ARTICLE.TOGGLE_ONE_FAVORITE,
				payload: {
					favorited: detailArticle.favorited,
					slug: detailArticle.slug,
				},
			});
		}
	};

	const handleDeleteArticle = () => {
		dispatch({
			type: ARTICLE.DELETE,
			payload: {
				slug: detailArticle.slug,
			},
		});
		navigate('/');
	};

	const handleFollowing = () => {
		if (!auth) {
			navigate('/login');
		} else {
			setLocalFollow(!detailArticle.author?.following);

			dispatch({
				type: ARTICLE.TOGGLE_FOLLOW,
				payload: {
					following: detailArticle.author?.following,
					username: detailArticle.author?.username,
				},
			});
		}
	};

	return isLoading ? (
		<div className='d-flex justify-content-center'>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden mx-auto'>Loading...</span>
			</Spinner>
		</div>
	) : (
		<>
			<section className='article'>
				<div className='mainvisual bg-warning-40 py-5 mb-5'>
					<Container>
						<h1 className='font-bold fs-1 mb-3'>
							{detailArticle.title}
						</h1>
						<Link
							to={`/profile/${detailArticle.author?.username}`}
							className='d-inline-flex gap-2 text-black text-danger-hover text-decoration-none mb-3'
						>
							<Image
								src={detailArticle.author?.image}
								alt={detailArticle.author?.username}
								className='avatar-lg me-1'
								roundedCircle
							/>
							<div className='author__right'>
								<p className='fw-bold mb-0'>
									{detailArticle.author?.username}
								</p>
								<p className='mb-1'>
									<small>
										{detailArticle.createdAt
											?.slice(0, 10)
											.split('-')
											.reverse()
											.join('.')}
									</small>
								</p>
							</div>
						</Link>

						<div className='d-flex gap-2'>
							{currentUsername ===
							detailArticle.author?.username ? (
								<>
									<Link to={`/editor/${detailArticle.slug}`}>
										<Button
											variant=''
											className='bg-success-90 bg-success-hover border-success-90 border-success-hover text-white'
										>
											+ Edit
										</Button>
									</Link>
									<Button
										variant=''
										className='bg-white bg-danger-hover border-danger-90 border-danger-hover text-danger-90 text-white-hover'
										onClick={handleDeleteArticle}
									>
										<span className='me-1'>
											<i className='fa-solid fa-trash-can'></i>
										</span>
										Delete Article
									</Button>
								</>
							) : (
								<Button
									variant=''
									className={`border ${
										localFollow
											? 'text-white bg-danger bg-danger-80-hover border-danger border-danger-80-hover'
											: 'text-black text-danger-hover bg-white border-white border-danger-hover'
									}`}
									onClick={handleFollowing}
								>
									{localFollow ? 'Followed' : '+ Following'}
								</Button>
							)}
							<Button
								className={`border px-2 ${
									localFavorited
										? 'text-white bg-danger-90 bg-danger-hover border-danger-90 border-danger-hover'
										: 'bg-white text-secondary-90 text-danger-hover border-secondary-90 border-danger-hover'
								}`}
								onClick={handleFavorited}
							>
								<i className='fa-solid fa-heart'></i>
								<span className='ms-1'>
									{detailArticle.favoritesCount}
								</span>
							</Button>
						</div>
					</Container>
				</div>

				<Container>
					<div className='article-content'>
						<p className='w25 px-20 mt-5'>{detailArticle.body}</p>
						<div className='d-flex flex-wrap gap-1 mb-3'>
							{detailArticle.tagList?.map((tag, index) => (
								<small
									className='rounded border px-1 py-0 text-secondary'
									key={index}
								>
									{tag}
								</small>
							))}
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}
