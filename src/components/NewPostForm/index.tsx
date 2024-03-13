import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { ARTICLE } from '../../saga/actionTypes';
import { RootState } from '../../store';
import { useNavigate } from 'react-router';
import { postArticleStart } from '../../reducers/articlesSlice';

function validateTitle(value: string) {
	let error;
	if (!value) {
		error = 'Title is Required';
	}
	return error;
}

function validateDescription(value: string) {
	let error;
	if (!value) {
		error = 'Description is Required';
	}
	return error;
}

function validateBody(value: string) {
	let error;
	if (!value) {
		error = 'Article Body is Required';
	}
	return error;
}

export default function ValidateAddArticle() {
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const article = useSelector((state: RootState) => state.article);

	useEffect(() => {
		if (article.isPostSuccess === true) {
			toast.success(
				'Post New Article Success. Click me to check it out...',
				{
					onClick: () => {
						navigate(`/article/${article.article.slug}`);
					},
				},
			);
		} else if (article.isPostSuccess === false) {
			toast.error(`${article.error}`);
		}
		dispatch(postArticleStart());
	}, [
		article.article.slug,
		article.error,
		article.isPostSuccess,
		dispatch,
		navigate,
	]);

	return (
		<>
			<ToastContainer autoClose={3000}></ToastContainer>
			<Formik
				className='post-form'
				initialValues={{
					title: '',
					description: '',
					content: '',
					tags: [],
				}}
				onSubmit={(values) => {
					dispatch({
						type: ARTICLE.POST,
						payload: {
							article: {
								title: values.title,
								description: values.description,
								body: values.content,
								tagList: values.tags,
							},
						},
					});
				}}
			>
				{({ errors, touched, values, setFieldValue }) => (
					<Form>
						<div className='mb-3'>
							<label htmlFor='title'>Article Title:</label>
							<Field
								id='title'
								name='title'
								validate={validateTitle}
								className='form-control'
							/>
							{errors.title && touched.title && (
								<div className='error text-danger'>
									{errors.title}
								</div>
							)}
						</div>

						<div className='mb-3'>
							<label htmlFor='description'>
								Article Description:
							</label>
							<Field
								id='description'
								name='description'
								validate={validateDescription}
								as='textarea'
								rows={5}
								className='form-control'
							/>
							{errors.description && touched.description && (
								<div className='error text-danger'>
									{errors.description}
								</div>
							)}
						</div>

						<div className='mb-3'>
							<label htmlFor='content'>Article Content:</label>
							<Field
								id='content'
								name='content'
								validate={validateBody}
								as='textarea'
								rows={5}
								className='form-control'
							/>
							{errors.content && touched.content && (
								<div className='error text-danger'>
									{errors.content}
								</div>
							)}
						</div>

						<div className='mb-3'>
							<label htmlFor='tag'>Tags:</label>
							<Field
								id='tags'
								name='tags'
								type='text'
								className='form-control'
								value={inputValue}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>,
								) => {
									const inputValue = e.target.value;
									if (inputValue.endsWith(' ')) {
										const newTag = inputValue.trim();
										if (newTag !== '') {
											setFieldValue('tags', [
												...values.tags,
												newTag,
											]);
										}
										setInputValue('');
									} else {
										setInputValue(inputValue);
									}
								}}
							/>

							<div className='d-flex flex-wrap gap-1 mt-1'>
								{values.tags.map((tag, index) => (
									<span
										key={index}
										className='bg-secondary rounded-pill text-white px-2'
									>
										<small
											className='rounded-circle bg-white-80-hover px-1'
											onClick={() => {
												const newTags = [
													...values.tags,
												];
												newTags.splice(index, 1);
												setFieldValue('tags', newTags);
											}}
										>
											<i className='fa-solid fa-xmark'></i>
										</small>
										{tag}&nbsp;
									</span>
								))}
							</div>
						</div>

						<div className='d-flex justify-content-end'>
							<Button
								type='submit'
								className='btn bg-primary-80 bg-primary-90-hover border-primary-80 border-primary-90-hover text-white'
							>
								Publish Article
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
