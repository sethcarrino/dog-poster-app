import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('With React Testing Library', () => {
    const initialState = { 
      dogs: [],
      breeds: [],
      loading: false,
      error: false,
      errorMessages: [],
      errorMessage: '',
      images: [],
     };
    const mockStore = configureStore();
    let store;

    it('Shows Vecteezy link', () => {
        store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByText('Dog Background Vectors by Vecteezy')).not.toBeNull();
    });
});