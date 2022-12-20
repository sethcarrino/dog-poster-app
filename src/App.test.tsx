/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import App from './App';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe('App Component Test', () => {
    Element.prototype.scrollIntoView = jest.fn();
    const middlewares = [thunk]
    const initialState = { 
      dog: {
        loading: false
      },
     };

    const mockStore = configureStore(middlewares);
    let store;

    it('Shows Vecteezy link', () => {
        store = mockStore(initialState);
        const { getByText } = render(<Provider store={store}><App /></Provider>)

        expect(getByText('Dog Background Vectors by Vecteezy')).toBeTruthy();
    });

    it('Shows Header Title and Content', () => {
        store = mockStore(initialState);
        const { getByText } = render(<Provider store={store}><App /></Provider>)

        expect(getByText('Dog Poster Generator')).toBeTruthy();
        expect(getByText("Select the dog breed(s) you want a poster of and then click 'Generate'")).toBeTruthy();
    });
});