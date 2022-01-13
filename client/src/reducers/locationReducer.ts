import produce from 'immer';
import { ILocationState } from '../types/state';
import { EMPTY_STRING } from '../constants/common';
import { ILocationActionType } from '../types/actions';
import { LOAD_LOCATION } from '../constants/actions/location';

export const initialState: ILocationState = {
  currentLocation: EMPTY_STRING,
};

const loadLocation = (draft: ILocationState, location?: string) => {
  draft.currentLocation = location || '';
  return draft;
};

export default (state = initialState, action: ILocationActionType) => produce(
  state,
  (draft: ILocationState) => {
    switch (action.type) {
      case LOAD_LOCATION: return loadLocation(draft, action.currentLocation);
      default: return state;
    }
  },
);
