import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash'
import {getImageUrls} from '../store/modules/actions'
import {connect} from 'react-redux'

class Shop extends Component {
  state = {
    progress:0,
    images: []
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref('glasses/' + file.name)

    const dbRef = firebase.database().ref('glasses/')
    const newGlassesRef = dbRef.push();
    newGlassesRef.set({
      fileName: file.name
    });

    const task = storageRef.put(file)
    const context = this

    task.on('state_changed',
      snapshot => context.setState({progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100}),
      err => console.log("Error on file upload: ",err),
      () => console.log("Upload Complete!")
    )
  }

  componentDidMount() {
    const storage = firebase.storage()
    const dbRef = firebase.database().ref('glasses/')
    const context = this
    dbRef.once('value', (snapshot) => {
      const imageNames = _.values(snapshot.val())
      imageNames.forEach(image =>
        storage.ref('glasses/').child(image.fileName).getDownloadURL()
          .then(url => {
            // console.log("urlL ",url)
            // This can be downloaded directly:
            // var xhr = new XMLHttpRequest();
            // console.log("xhr: ",xhr)
            // xhr.responseType = 'blob';
            // xhr.onload = function(event) {
            //   var blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();
            return url
          })
          .then(url => context.props.dispatch(getImageUrls(url)))
      )
    })
  }

  render() {
    const {progress} = this.state
    const {imageUrls} = this.props
    return (
      <div className="Shop">
        <h2>Shop</h2>
        <div className="browse">
          { imageUrls.map((url,i) => <div key={i} className='imageWrap'><img src={url} alt=""/></div>) }
        </div>
        <br/>
        <progress value={progress} max='100'></progress><br/>
        <input onChange={this.handleFileChange} type="file"/>
      </div>
    )
  }
}

export default connect(state => ({
  imageUrls: state.data.imageUrls
}))(Shop)
