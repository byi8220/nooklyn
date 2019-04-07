import React, { Component } from 'react'

import './PaneView.css';

export default class CurrentTripView extends Component {
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

                <div onClick={this.toggleFavorites} className={`navbar-btn ${this.props.isFavorite ? "btn-selected" : "btn-unselected"}`}>
                    <i id="favTripBtn"  className="material-icons">star_border</i>  
                </div>      
            </div>
            
            <div>
                <hr />
            </div>


            </div>
        )
    }
}
