import React, { Component } from 'react'

import './PaneView.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// Didn't find an endpoint for all the lines so I'm hardcoding them in



export default class TrainLinesView extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            currentlyFiltering: false,
            SUPPORTED_LINES: [
                "1", "2", "3", "4", "5", "6", "6X", "7", "7X",
                "A", "C", "E", "B", "D", "F", "M", "G", "J", "Z", "L", "S", "N", "Q", "R", "W"
                ]
        };
        this.toggleFavorites = this.toggleFavorites.bind(this);
        this.generateLineIcons = this.generateLineIcons.bind(this);
        this.onLineClicked = this.onLineClicked.bind(this);
    }

    toggleFavorites() {
        this.setState( (prevState, props) => ({
            currentlyFiltering: !prevState.currentlyFiltering
            }) 
        );
    }

    onLineClicked(lineName){
        this.props.filterByLine(lineName);

    }

    generateLineIcons(){
        let icons = this.state.SUPPORTED_LINES.map(item => {
            return(
            <ListItem button key={item}
                onClick={this.onLineClicked.bind(this, item)}>
                    <ListItemAvatar>
                        <Avatar alt={`${item} train`} src = {`https://nooklyn-interview.herokuapp.com/subway/${item}.png`} />
                    </ListItemAvatar>
            </ListItem>
            
            );
        });
        return (
            <List style={{maxHeight:'100%', overflow:'auto'}}>
                {icons}
            </List>
        );
    }

    render() {
        return (
            <div className="side-panel-container">

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
                {this.generateLineIcons()}
            </div>
        )
    }
}
