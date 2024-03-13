import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Image } from 'react-bootstrap';

import { COMMENT } from '../../saga/actionTypes';
import { RootState } from '../../store';

export default function CommentForm() {
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
	const currentUsername = localStorage.getItem('username');
	const avatar = localStorage.getItem('image') ?? undefined;
	const { slug } = useParams();
	const [newComment, setNewComment] = useState('');
	const handlePostComment = () => {
		dispatch({
			type: COMMENT.CREATE,
			payload: {
				slug: `${slug}`,
				comment: {
					body: newComment,
				},
			},
		});
		setNewComment('');
	};

	return (
		<>
			{!auth ? (
				<div className='text-center border-bottom pb-3 mb-3'>
					<Link
						to='/login'
						className='text-blue text-decoration-none'
					>
						Sign In
					</Link>{' '}
					or{' '}
					<Link
						to='/register'
						className='text-blue text-decoration-none'
					>
						Sign Up
					</Link>{' '}
					to comment
				</div>
			) : (
				<>
					<h2>Comment Section</h2>
					<Form className='mb-3'>
						<Form.Group controlId='exampleForm.ControlTextarea1'>
							<Form.Label></Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								placeholder='Write a comment...'
								className='rounded-top-1 rounded-bottom-0'
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
							/>
						</Form.Group>

						<div className='d-flex justify-content-between align-items-center bg-secondary-10 p-2 rounded-top-0 rounded-bottom-1'>
							<Image
								src={`${avatar}`}
								alt={`${currentUsername}`}
								title={`${currentUsername}`}
								className='avatar'
								roundedCircle
							/>

							<Button
								onClick={handlePostComment}
								type='button'
								variant=''
								className='btn bg-primary-80 bg-primary-90-hover border-primary-80 border-primary-90-hover text-white'
							>
								Post comment
							</Button>
						</div>
					</Form>

					<div className='border-bottom mb-3'></div>
				</>
			)}
		</>
	);
}
