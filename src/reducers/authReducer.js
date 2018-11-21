import _ from 'lodash';
import * as AuthApi from '../utils/Api/AuthApi';

const GUESTS_FETCH               = 'auth/GUESTS_FETCH';
const GUESTS_FETCH_SUCCESS       = 'auth/GUESTS_FETCH_SUCCESS';
const GUESTS_FETCH_FAIL          = 'auth/GUESTS_FETCH_FAIL';

const CHECKIN                    = 'auth/CHECKIN';
const CHECKIN_SUCCESS            = 'auth/CHECKIN_SUCCESS';
const CHECKIN_FAIL               = 'auth/CHECKIN_FAIL';

const initialState = {
  fetchError: '',
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GUESTS_FETCH:
      return {
        ...state,
        fetchError:  null,
      };
    case GUESTS_FETCH_SUCCESS:
      return {
        ...state,
        fetchError: null,
        loading: false,
        data: action.result
      };
    case GUESTS_FETCH_FAIL:
      return {
        ...state,
        loading:  false,
        fetchError: 'Could not fetch guest'
      };

    case CHECKIN:
      return {
        ...state,
        fetchError:  null,
      };
    case CHECKIN_SUCCESS:
      return {
        ...state,
        fetchError: null,
        loading: false,
        data: action.result
      };
    case CHECKIN_FAIL:
      return {
        ...state,
        loading:  false,
        fetchError: 'Error occurred while checking in.'
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return !(_.isEmpty(globalState.auth.data));
}

export function fetchUser(id) {
  return {
    types: [GUESTS_FETCH, GUESTS_FETCH_SUCCESS, GUESTS_FETCH_FAIL],
    promise: () => new Promise((resolve, reject) => {
      AuthApi.fetchUser(id)
      .then(data => (resolve(data)))
      .catch(err => (reject(err)));
    })
  };
}

export function checkin(dataObject) {
  return {
    types: [CHECKIN, CHECKIN_SUCCESS, CHECKIN_FAIL],
    promise: () => new Promise((resolve, reject) => {
      AuthApi.checkin(dataObject)
      .then(data => (resolve(data)))
      .catch(err => (reject(err)));
    })
  };
}
