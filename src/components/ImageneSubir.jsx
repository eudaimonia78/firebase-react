import React, {Component} from 'react';
import {storage} from '../firebase';

class ImagenSubir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      const cargarimagen = storage.ref(`images/${image.name}`).put(image);
      cargarimagen.on('state_changed', 
      (snapshot) => {
        // funcion mate
        const mate = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress: mate});
      }, 
      (error) => {
           // error de funcion ...
        console.log(error);
      }, 
    () => {
        // funcion completada ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
    });
  }
  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={style}>
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Subir</button>
        <br/>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
      </div>
    )
  }
}

export default ImagenSubir;