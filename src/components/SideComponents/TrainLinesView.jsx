import React, { Component } from 'react'

export default class TrainLinesView extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentlyFiltering: false
        };
        this.toggleFavorites = this.toggleFavorites.bind(this);

    }


    toggleFavorites() {
        this.setState( (prevState, props) => ({
            currentlyFiltering: !prevState.currentlyFiltering
            }) 
        );
    }
    render() {
        return (
            <div>
            <div className="navbar">
                <div onClick={this.props.onBackBtnClick} className="navbar-btn btn-unselected">
                    <i id="viewLinesBtn" className="material-icons">arrow_back</i>  
                </div>      
                <div className="navbar-item">
                    <h2>Filter By Line</h2>  
                </div>
                <div onClick={this.toggleFavorites} className={`navbar-btn ${this.state.currentlyFiltering ? "btn-selected" : "btn-unselected"}`}>
                    <i id="favLineBtn"  className="material-icons">star_border</i>  
                </div>      
            </div>
            <hr />
            </div>
        )
    }
}
