import React, { Component } from 'react'
import {Map, GoogleApiWrapper, Polyline} from 'google-maps-react';
import './MapPane.css';

// Yes I am baking in API keys, README should explain why I did this.
const MAP_API_KEY = 'AIzaSyA27eLaI_ahxJUeg695P7w2EHbrhKC79k0';


export class MapPane extends Component {
    constructor(props){
        super(props);

        this.drawTripInfo = this.drawTripInfo.bind(this);
    }
    drawTripInfo() {
        if(!this.props.currentTrip){
            return [];
        }
        let pathCoords = this.props.currentTrip.map(function(item) {
            return {
                lat: Number(item.attributes["latitude"]),
                lng: Number(item.attributes["longitude"])
            }
        });
        console.log(pathCoords);

        return(
            <Polyline
            path={pathCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} />
        );
    }
    render() {
        const mapStyle = {
            width:'100%',
            maxWidth:'100%,'
        };
        
        const containerStyle = {position: 'absolute', width: '75%', height:'100%'};
        return (
            <Map
                google = {this.props.google}
                zoom = {12}
                style = {mapStyle}
                containerStyle = {containerStyle}
                // Magic number coords for Trump Tower
                initialCenter={{
                    lat:40.762436, 
                    lng:-73.973774
                }} 
            >
            {this.drawTripInfo()}
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: MAP_API_KEY
})(MapPane);