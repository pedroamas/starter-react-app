import React, { Component } from 'react';

const URL = '/videos';

export default class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.match.params.id,
      videoData: {}
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(URL + `/${this.state.videoId}/data`);
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <video controls muted autoPlay crossOrigin="anonymous">
          <source src={URL + `/${this.state.videoId}`} type="video/mp4"></source>
          <track label="English" kind="captions" srcLang="en" src={URL + `/${this.state.videoId}/caption`} default></track>
        </video>
        <h1>{ this.state.videoData.name }</h1>
        </>
    )
  }
}
