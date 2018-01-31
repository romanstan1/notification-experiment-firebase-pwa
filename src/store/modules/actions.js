
export const getImageUrls = (url) => {
  return dispatch => dispatch({
    type: 'GET_IMAGE_URLS',
    payload: url
  })
}
export const setAppointments = (appointments) => {
  return dispatch => dispatch({
    type: 'SET_APPOINTMENTS',
    payload: appointments
  })
}
