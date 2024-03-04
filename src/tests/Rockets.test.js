import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Rockets from '../components/Rockets';
import { setReserve } from '../redux/rockets/rocketsSlice';

const mockStore = configureMockStore([thunk]);

describe('Rockets Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rockets: {
        allRockets: [
          {
            id: 'rocket1',
            rocket_name: 'Rocket 1',
            description: 'Description of Rocket 1',
            flickr_images: 'url-of-image-1',
            reserved: false,
          },
        ],
        loading: false,
      },
    });
  });

  test('renders Rockets component with loading state', () => {
    store = mockStore({
      rockets: {
        allRockets: [],
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const loadingElement = screen.getByText('Loading');
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders Rockets component with rockets data', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const rocketDesc1 = screen.getByText('Description of Rocket 1');
    expect(rocketDesc1).toBeInTheDocument();
  });

  test('calls reserve when reserve button is clicked', async () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const reserveButtonElement = screen.getByText('Reserve Rocket');
    expect(reserveButtonElement).toBeInTheDocument();

    reserveButtonElement.click();

    await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith(setReserve({ id: 'rocket1', reserved: true })));
  });
});
