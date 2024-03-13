import { Col, Container, Row } from 'react-bootstrap';
import ValidateSettingForm from '../../components/SettingForm';

export default function SettingPage() {
	document.title = 'Setting profile page';

	return (
		<>
			<Container>
				<Row className='justify-content-md-center'>
					<Col lg={8}>
						<ValidateSettingForm></ValidateSettingForm>
					</Col>
				</Row>
			</Container>
		</>
	);
}
