import { ILocationActionType } from '../types/actions';
import { LOAD_LOCATION } from '../constants/actions/location';

export const loadLocationAction = (location: string): ILocationActionType => ({
  type: LOAD_LOCATION,
  currentLocation: location,
});
