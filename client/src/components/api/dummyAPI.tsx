import {
  METHOD_GET, METHOD_POST, METHOD_PUT, PROXY_CREATE_USER_URL, PROXY_POSTS_URL,
  PROXY_USER_URL,
} from '../../constants/api/dummyAPI';
import { IRegistrationUser, IUpdatedUserData } from '../../types/typesAPI';

export const getUsersData = (
  page: number,
  limit: number,
) => fetch(`${PROXY_USER_URL}?page=${page}&limit=${limit}`, {
  method: METHOD_GET,
}).then((response) => response.json());

export const getUsersPosts = (
  page: number,
  limit: number,
) => fetch(`${PROXY_POSTS_URL}?page=${page}&limit=${limit}`, {
  method: METHOD_GET,
}).then((response) => response.json());

export const getPostsByUser = (
  page: number,
  limit: number,
  id: string,
) => fetch(`${PROXY_USER_URL}/${id}/post?page=${page}&limit=${limit}`, {
  method: METHOD_GET,
}).then((response) => response.json());

export const getCommentsByPost = (
  page: number,
  limit: number,
  id: string,
) => fetch(`${PROXY_POSTS_URL}/${id}/comment?page=${page}&limit=${limit}`, {
  method: METHOD_GET,
}).then((response) => response.json());

export const getUserProfile = (
  id: string,
) => fetch(`${PROXY_USER_URL}/${id}`, {
  method: METHOD_GET,
}).then((response) => response.json());

export const updateUserProfile = (
  id: string,
  updatedUserData: IUpdatedUserData,
) => fetch(`${PROXY_USER_URL}/${id}`, {
  method: METHOD_PUT,
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
  body: JSON.stringify(updatedUserData),
}).then((response) => response.json());

export const postNewUser = (
  userData: IRegistrationUser,
) => fetch(PROXY_CREATE_USER_URL, {
  method: METHOD_POST,
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
  body: JSON.stringify(userData),
}).then((response) => response.json());
