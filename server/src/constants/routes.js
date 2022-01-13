export const PROXY_USER_URL = '/user';
export const PROXY_USER_BY_ID_URL = `${PROXY_USER_URL}/:id`;
export const PROXY_CREATE_USER_URL = `${PROXY_USER_URL}/create`;

export const PROXY_POST_URL = '/post';
export const PROXY_POST_BY_USER_ID_URL = `${PROXY_USER_BY_ID_URL}/post`;
export const PROXY_COMMENT_BY_POST_ID_URL = `${PROXY_POST_URL}/:id/comment`;
