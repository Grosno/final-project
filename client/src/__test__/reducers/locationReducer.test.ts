import locationReducer from '../../reducers/locationReducer';
import { EMPTY_STRING } from '../../constants/common';
import { LOAD_LOCATION } from '../../constants/actions/location';

const initialState = {
  currentLocation: EMPTY_STRING,
};

describe('locationReducer test', () => {
  test('loadLocation', () => {
    const location = 'anywhere';
    expect(locationReducer(initialState, { type: LOAD_LOCATION, currentLocation: location }))
      .toEqual({
        ...initialState,
        currentLocation: location,
      });
  });
});
