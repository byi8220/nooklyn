import React, { Component } from 'react';
import TripListPage from './TripListPage';
import './PaneView.css';


export default class AllTripsView extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentlyFiltering: false,
        };
        this.toggleFavorites = this.toggleFavorites.bind(this);
        this.showLines = this.showLines.bind(this);

    }

    showLines() {
        this.props.onLinesBtnClick();
    }

    toggleFavorites() {
        this.setState( (prevState, props) => ({
            currentlyFiltering: !prevState.currentlyFiltering
            }) 
        );
        // Make call to get list of favorites
        console.log(this.state);
    }

    render() {
        return (
        <div>
            <div className="navbar">
                <div onClick={this.showLines} className="navbar-btn btn-unselected">
                    <i id="viewLinesBtn" className="material-icons">train</i>  
                </div>      
                <div className="navbar-item">
                    <h2>Trips</h2>  
                </div>
                <div onClick={this.toggleFavorites} className={`navbar-btn ${this.state.currentlyFiltering ? "btn-selected" : "btn-unselected"}`}>
                    <i id="favTripBtn"  className="material-icons">star_border</i>  
                </div>      
            </div>
            <hr />

        </div>
        )
    }
}
