import React, { Component } from 'react'

import './PaneView.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import axios from 'axios';

export default class CurrentTripView extends Component {

    constructor(props){
        super(props);
        this.state = {
            isFavorite : this.props.isFavorite
        }

        this.onStationArrivalClicked = this.onStationArrivalClicked.bind(this);
        this.toggleFavorites = this.toggleFavorites.bind(this);
    }

    onStationArrivalClicked(arrivalId){

    }

    toggleFavorites(){
        let newIsFavorite = !this.state.isFavorite;
        let tripId = this.props.currentTripId;
        const API_FAVORITE_TRIPS = `/api/favoriteTrips/${tripId}`;
        this.setState( (prevState, props) =>({
            isFavorite: newIsFavorite
        }), () => {
            if(newIsFavorite){
                axios.post(API_FAVORITE_TRIPS)
                .then(res => {

                })
                .catch( err => {
                    console.log(err)
                });
            }else{
                axios.delete(API_FAVORITE_TRIPS)
                .then(res => {

                })
                .catch( err => {
                    console.log(err)
                });
            }
        });
    }
    renderItems(){
        if(!this.props.currentArrivals){
            return [];
        }
        return this.props.currentArrivals.map( (item) => {
            return(
            <ListItem button key={item.id}
            onClick={this.onStationArrivalClicked.bind(this,item.id)}>
                <ListItemText 
                    primary={item.attributes["station-name"]} 
                    secondary={new Date(item.attributes["time"]).toLocaleString()}
                    />

            </ListItem>
        )});
    }

    render() {
        return (
            <div className="side-panel-container">

            <div className="navbar">
                <div onClick={this.props.onBackBtnClick}  className="navbar-btn btn-unselected">
                    <i id="viewLinesBtn" className="material-icons">arrow_back</i>  
                </div>      
                <div className="navbar-item">
                    {this.props.currentTripDest}
                </div>

                <div onClick={this.toggleFavorites} className={`navbar-btn ${this.state.isFavorite ? "btn-selected" : "btn-unselected"}`}>
                    <i id="favTripBtn"  className="material-icons">star_border</i>  
                </div>      
            </div>
            
            <div>
                <hr />
            </div>


            <List style={{maxHeight:'100%', overflow:'auto'}}>
                {this.renderItems()}
            </List>

            </div>
        )
    }
}
