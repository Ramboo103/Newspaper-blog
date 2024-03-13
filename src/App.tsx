import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routers from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

function App() {
	const routes = createBrowserRouter(routers);
	return (
		<>
			<RouterProvider
				router={routes}
				fallbackElement={<p>Loading...</p>}
			/>
		</>
	);
}

export default App;
