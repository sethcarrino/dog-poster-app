import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { store } from './redux/store';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</React.StrictMode>
);