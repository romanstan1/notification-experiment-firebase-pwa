

const initialState = {
  imageUrls: []
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'GET_IMAGE_URLS': return {
      ...state,
      imageUrls: state.imageUrls.includes(action.payload)? state.imageUrls :
        [].concat(state.imageUrls, action.payload)
    }
    default: return state
  }
}
