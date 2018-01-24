
export const getImageUrls = (url) => {
  return dispatch => dispatch({
    type: 'GET_IMAGE_URLS',
    payload: url
  })
}
