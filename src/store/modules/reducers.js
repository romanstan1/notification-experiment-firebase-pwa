

const initialState = {
  imageUrls: [],
  appointments: []
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'GET_IMAGE_URLS': return {
      ...state,
      imageUrls: state.imageUrls.includes(action.payload)? state.imageUrls :
        [].concat(state.imageUrls, action.payload)
    }
    case 'SET_APPOINTMENTS': return {
      ...state,
      appointments: [].concat(action.payload)
    }
    default: return state
  }
}
