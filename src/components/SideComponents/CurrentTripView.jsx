import React, { Component } from 'react'

import './PaneView.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
        this.setState( (prevState, props) =>({
            isFavorite: !prevState.isFavorite
        }
        ));
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
            <div className="trip-flex">

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
