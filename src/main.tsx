import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { rootStore } from './store';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={rootStore}>
			<App />
		</Provider>
	</React.StrictMode>,
);
