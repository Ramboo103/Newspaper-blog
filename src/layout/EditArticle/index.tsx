import { Col, Container, Row } from 'react-bootstrap';

import ValidateEditArticle from '../../components/EditArticleForm';

export default function EditArticle() {
	document.title = 'Edit page';

	return (
		<>
			<section className='mainvisual bg-warning-40 mb-5'>
				<Container>
					<div className='py-5 text-center'>
						<h1 className='text-uppercase fw-bold'>Edit Article</h1>
					</div>
				</Container>
			</section>
			<section className='newpost'>
				<Container>
					<Row className='justify-content-md-center'>
						<Col lg={8}>
							<ValidateEditArticle></ValidateEditArticle>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
