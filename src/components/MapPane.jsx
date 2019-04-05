import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import './MapPane.css';

// Yes I am baking in API keys, README should explain why I did this.
const MAP_API_KEY = 'AIzaSyA27eLaI_ahxJUeg695P7w2EHbrhKC79k0';


export class MapPane extends Component {
  render() {
    const mapStyle = {
        width:'100%',
        maxWidth:'100%,'
    };
    const containerStyle = {position: 'absolute', width: '70%', height:'100%'};
    return (
        <Map
            google = {this.props.google}
            zoom = {12}
            style = {mapStyle}
            containerStyle = {containerStyle}
            initialCenter={{
                lat:40.762436, 
                lng:-73.973774
            }} 
        />
    );
  }
}


export default GoogleApiWrapper({
    apiKey: MAP_API_KEY
  })(MapPane);