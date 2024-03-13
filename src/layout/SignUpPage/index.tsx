import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { AUTH } from '../../saga/actionTypes';
import { RootState } from '../../store';

interface SignUpValues {
	email: string;
	password: string;
	username: string;
}

const SignUpSchema = Yup.object({
	username: Yup.string()
		.required('Username is required')
		.min(6, 'Username should be at least 6 characters'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be between 6 and 12 characters')
		.max(12, 'Password must be between 6 and 12 characters')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(
			/[^a-zA-Z0-9]/,
			'Password must contain at least one special character',
		),
	confirmedPassword: Yup.string()
		.required('Confirm Password is required')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		}),
});

export default function SignUpForm() {
	document.title = 'Sign Up';

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state: RootState) => state.auth);

	const handleSignUp = (
		values: SignUpValues,
		{ setSubmitting }: FormikHelpers<SignUpValues>,
	) => {
		const { email, password, username } = values;

		dispatch({
			type: AUTH.REGISTER,
			payload: {
				user: {
					email,
					username,
					password,
				},
			},
		});
		setSubmitting(false);
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate(-1);
		}
	}, [auth.isLoggedIn, navigate]);

	return (
		<section className='sign-up py-5'>
			<Container>
				<Row className='justify-content-md-center'>
					<Col md={6}>
						<h1 className='sign-in-h1 text-blue-700 font-bold text-center'>
							Sign Up
						</h1>
						<p className='text-center'>
							<Link
								to='/login'
								className='text-blue text-decoration-none'
							>
								Have an account?
							</Link>
						</p>
						<Formik
							initialValues={{
								email: '',
								password: '',
								username: '',
							}}
							validationSchema={SignUpSchema}
							onSubmit={handleSignUp}
						>
							<Form className='form'>
								<div className='mb-3'>
									<label htmlFor='username'>Username</label>
									<Field
										type='text'
										id='username'
										name='username'
										placeholder='Username'
										className='form-control'
									/>
									<ErrorMessage name='username'>
										{(msg) => (
											<div className='error text-danger'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>

								<div className='mb-3'>
									<label htmlFor='email'>Email</label>
									<Field
										type='email'
										id='email'
										name='email'
										placeholder='Email'
										className='form-control'
									/>
									<ErrorMessage name='email'>
										{(msg) => (
											<div className='error text-danger'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>

								<div className='mb-3'>
									<label htmlFor='password'>Password</label>
									<Field
										type='password'
										id='password'
										name='password'
										className='form-control'
									/>
									<ErrorMessage name='password'>
										{(msg) => (
											<div className='error text-danger'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>

								<div className='mb-3'>
									<label htmlFor='confirmedPassword'>
										Confirm password
									</label>
									<Field
										type='password'
										id='confirmedPassword'
										name='confirmedPassword'
										className='form-control'
									/>
									<ErrorMessage name='confirmedPassword'>
										{(msg) => (
											<div className='error text-danger'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>

								<Button
									type='submit'
									className='btn bg-primary-80 bg-primary-90-hover border-primary-80 border-primary-90-hover text-white w-100'
								>
									Sign Up
								</Button>
							</Form>
						</Formik>
					</Col>
				</Row>
			</Container>
		</section>
	);
}
