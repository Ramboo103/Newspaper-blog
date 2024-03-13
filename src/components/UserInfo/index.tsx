import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Container, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { RootState } from '../../store';
import { PROFILE } from '../../saga/actionTypes';

export default function UserInfo() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
	const profile = useSelector((state: RootState) => state.profile.Profile);
	const loading = useSelector((state: RootState) => state.profile.loading);
	const currentUsername = localStorage.getItem('username');
	const [localFollow, setLocalFollow] = useState(profile.following);
	const { username } = useParams();

	useEffect(() => {
		dispatch({
			type: PROFILE.FETCH,
			payload: {
				username: `${username}`,
			},
		});
	}, [dispatch, username]);

	const handleFollowing = () => {
		if (!auth) {
			navigate('/login');
		} else {
			setLocalFollow(!profile.following);

			dispatch({
				type: PROFILE.TOGGLE_FOLLOW,
				payload: {
					following: profile.following,
					username: profile.username,
				},
			});
		}
	};

	return loading ? (
		<div className='d-flex justify-content-center'>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden mx-auto'>Loading...</span>
			</Spinner>
		</div>
	) : (
		<section className='mainvisual bg-warning-40 mb-5'>
			<Container>
				<div className='py-5 text-center'>
					<Image
						src={profile.image}
						alt={profile.username}
						className='avatar-xl mb-2'
						roundedCircle
					/>
					<h1 className='fs-3 text-uppercase fw-bold'>
						I'm User Page and my Name is{' '}
						{profile?.username || 'undefined'}
					</h1>
					<blockquote className='blockquote mb-1'>
						<p className='mb-0'>
							Here My Bio:{' '}
							{profile.bio || 'Oh I did not update my Bio yet ^^'}
						</p>
					</blockquote>

					{currentUsername === profile.username ? (
						<Link to='/settings'>
							<Button
								variant=''
								className='bg-warning-80 bg-warning-90-hover'
							>
								Settings
							</Button>
						</Link>
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
				</div>
			</Container>
		</section>
	);
}
