const postRepository = {
  GET_POSTS_LIST_SEARCH_PARAMS: '[PostRepository.getPostsList] SEARCH PARAMS page={}, limit={}',
  GET_POSTS_LIST_SUCCESS: '[PostRepository.getPostsList] success status={} response={}',
  GET_POSTS_LIST_ERROR: '[PostRepository.getPostsList] error status={} response={}',
  GET_POSTS_LIST_MAPPER_REPLY_RESULT: '[PostRepository.getPostsList] mapper result {}',

  GET_POSTS_BY_USER_ID_PARAMS: '[PostRepository.getPostsByUserId] PARAMS id={} page={} limit={}',
  GET_POSTS_BY_BY_USER_ID_SUCCESS: '[PostRepository.getPostsByUserId] success status={} response={}',
  GET_POSTS_BY_BY_USER_ID_ERROR: '[PostRepository.getPostsByUserId] error status={} response={}',
}

export default postRepository;
