import { Col, Container, Row } from 'react-bootstrap';

import ValidateAddArticle from '../../components/NewPostForm';

function NewPostPage() {
	document.title = 'New article page';

	return (
		<>
			<section className='mainvisual bg-warning-40 mb-5'>
				<Container>
					<div className='py-5 text-center'>
						<h1 className='text-uppercase fw-bold'>Add Article</h1>
					</div>
				</Container>
			</section>

			<section className='newpost'>
				<Container>
					<Row className='justify-content-md-center'>
						<Col lg={8}>
							<ValidateAddArticle></ValidateAddArticle>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}

export default NewPostPage;
