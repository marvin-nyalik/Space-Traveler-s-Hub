import configureMockStore from 'redux-mock-store';
import Missions from '../components/Missions';
import { Provider } from 'react-redux';
import { screen, render, waitFor } from '@testing-library/react';
import thunk from 'redux-thunk';
import { joinMission } from '../redux/missions/missionSlice';

const mockStore = configureMockStore([thunk])

describe('Missions Component', () => {
  let store;

  beforeEach(()=> {
    store = mockStore({
      missions: {
        isLoading: false,
        missions: [
          {
            id: 'mission1',
            name: 'To the Moon',
            description: 'Mission to the moon',
            reserved: true
          },
          {
            id: 'mission2',
            name: 'To Mars',
            description: 'Going to Mars',
            reserved: false
          },
        ]
      }
    })
  })

  it('Renders loading text on load..', ()=>{
    store = mockStore({
      missions: {
        missions: [],
        isLoading: true,
        error: null
      }
    })

    render (
      <Provider store={store}>
        <Missions/>
      </Provider>
    )
    const loadingText = screen.getByText(/Loading/i);
    expect(loadingText).toBeInTheDocument();
  })

  it('Shows mission information after data fetch', async ()=>{
    render (
        <Provider store={store}>
          <Missions/>
        </Provider>
    )
    const mission1Name = await screen.findByText('To the Moon');
    const mission2Name = await screen.findByText('Going to Mars');

    expect(mission1Name).toBeInTheDocument();
    expect(mission2Name).toBeVisible();
  })

  it('Calls the dispatch with required data', async () => {
    store.dispatch = jest.fn()
    render (
        <Provider store={store}>
          <Missions/>
        </Provider>
    )
    const joinBtn = await screen.findByText('Join Mission');
    joinBtn.click();

    await waitFor(()=> expect(store.dispatch).toHaveBeenCalledWith(joinMission('mission2')))
  })
})
