import { Col, Container, Row } from 'react-bootstrap';

import CommentForm from '../../components/CommentForm';
import ListComments from '../../components/ListComment';
import DetailedArticle from '../../components/DetailedArticle';

export default function NestedArticles() {
	return (
		<>
			<DetailedArticle></DetailedArticle>

			<section className='comment-container mt-5 pt-5 border-top'>
				<Container className='mb-5'>
					<Row className='justify-content-md-center'>
						<Col md={6}>
							<CommentForm />

							<ListComments />
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
