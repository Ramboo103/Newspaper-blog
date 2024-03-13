import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className='footer bg-secondary-20 py-3 position-absolute end-0 bottom-0 start-0'>
			<Container>
				<Link
					to='/'
					className='fs-5 fw-bold text-primary-80 text-primary-90-hover text-decoration-none me-1 d-inline-flex'
				>
					NEWSPAPER
				</Link>{' '}
				- design by <strong>GROUP 1</strong> of{' '}
				<strong>HN23_FRF_PRD_03</strong>
			</Container>
		</footer>
	);
}
