import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AUTH } from '../../saga/actionTypes';
import { RootState } from '../../store';
import { useEffect } from 'react';

interface SignInValues {
	email: string;
	password: string;
}

const SignInSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string().required('Password is required'),
});

export default function SignInForm() {
	document.title = 'Sign In';

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state: RootState) => state.auth);
	const handleLogin = (
		values: SignInValues,
		{ setSubmitting }: FormikHelpers<SignInValues>,
	) => {
		const { email, password } = values;

		dispatch({
			type: AUTH.LOGIN,
			payload: {
				user: {
					email,
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
		<section className='sign-in py-5'>
			<Container>
				<Row className='justify-content-md-center'>
					<Col md={6}>
						<h1 className='sign-in-h1 text-blue-700 font-bold text-center'>
							Sign In
						</h1>
						<p className='text-center'>
							<Link
								to='/register'
								className='text-blue text-decoration-none'
							>
								Need an account?
							</Link>
						</p>
						<Formik
							initialValues={{ email: '', password: '' }}
							validationSchema={SignInSchema}
							onSubmit={handleLogin}
						>
							<Form className='form'>
								<div className='mb-3'>
									<label htmlFor='email'>Email</label>
									<Field
										type='email'
										id='email'
										name='email'
										placeholder='Enter your Email Here '
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
										placeholder='Enter your Password Here'
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

								<Button
									type='submit'
									className='btn bg-primary-80 bg-primary-90-hover border-primary-80 border-primary-90-hover text-white w-100'
								>
									Sign In
								</Button>
							</Form>
						</Formik>
					</Col>
				</Row>
			</Container>
		</section>
	);
}
