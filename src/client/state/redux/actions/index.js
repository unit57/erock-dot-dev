import { contentfulClient } from '@config/contentful';
import {
  FETCH_USERS,
  FETCH_CURRENT_USER,
  FETCH_ADMINS,
  FETCH_ABOUT_PAGE,
  FETCH_HOME_PAGE,
  UI_TOGGLE_MODAL,
  UI_TOGGLE_MOBILE_MENU
} from '../types';

export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');
  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');
  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
};

export const fetchHomePage = () => async dispatch => {
  const res = await contentfulClient.getEntries({
    content_type: 'pageHome',
    include: 5
  });
  dispatch({
    type: FETCH_HOME_PAGE,
    payload: res
  });
};

export const fetchAboutPage = () => async dispatch => {
  const res = await contentfulClient.getEntries({
    content_type: 'pageAbout',
    include: 5
  });
  dispatch({
    type: FETCH_ABOUT_PAGE,
    payload: res
  });
};
// @todo create app actions folder and move there
export const toggleModal = () => ({
  type: UI_TOGGLE_MODAL
});

export const toggleMobileMenu = () => {
  return {
    type: UI_TOGGLE_MOBILE_MENU
  };
};
