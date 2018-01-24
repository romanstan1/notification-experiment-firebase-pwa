import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash'

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
      const imageNames = _.values(snapshot.val());
      imageNames.forEach((image) =>
        storage.ref('glasses/').child(image.fileName).getDownloadURL().then((url) =>
          context.setState({images:[...context.state.images, url]})
        ))
    })
  }

  render() {
    const {images,progress} = this.state
    console.log("images",images)
    return (
      <div className="Shop">
        <h2>Shop</h2>
        <div className="browse">
          {images.map((url) =>
            <div className='imageWrap'><img src={url} alt=""/></div>
          )}
        </div>
        <br/>
        <progress value={progress} max='100'></progress><br/>
        <input onChange={this.handleFileChange} type="file"/>
      </div>
    );
  }
}

export default Shop;
