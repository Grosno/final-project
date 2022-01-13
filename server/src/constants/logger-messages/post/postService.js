const postService = {
  GET_POSTS_LIST_INPUT_PARAMS: '[PostService.getPosts] URL PARAMS query={}',
  GET_POSTS_LIST_SUCCESS: '[PostService.getPosts] success status={} response={}',
  GET_POSTS_LIST_ERROR: '[PostService.getPosts] error status={} response={}',

  GET_POSTS_BY_USER_ID_URL_PARAMS: '[PostService.getPostsByUser] URL PARAMS id={} page={} limit={}',
  GET_POSTS_BY_USER_ID_SUCCESS: '[PostService.getPostsByUser] success status={} response={}',
  GET_POSTS_BY_USER_ID_ERROR: '[PostService.getPostsByUser] error status={} response={}',
}

export default postService;
