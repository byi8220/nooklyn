import React, { Component } from 'react'

import './PaneView.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import axios from 'axios';

// Didn't find an endpoint for all the lines so I'm hardcoding them in



export default class TrainLinesView extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            currentlyFiltering: false,
            SUPPORTED_LINES: [
                "1", "2", "3", "4", "5", "6", "6X", "7", "7X",
                "A", "C", "E", "B", "D", "F", "M", "G", "J", "Z", "L", "S", "N", "Q", "R", "W"
                ],
            favoriteLines: []
        };
        this.toggleFavorites = this.toggleFavorites.bind(this);
        this.generateLineIcons = this.generateLineIcons.bind(this);
        this.onLineClicked = this.onLineClicked.bind(this);
        this.loadFavData = this.loadFavData.bind(this);
        this.inFavorites = this.inFavorites.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    componentDidMount() {
        this.loadFavData();
    }

    toggleFavorites() {
        this.setState((prevState, props) => ({
            currentlyFilteringByFavorites: !prevState.currentlyFilteringByFavorites
        }), this.loadFavData);
    }

    onLineClicked(lineName){
        this.props.filterByLine(lineName);

    }

    loadFavData(){
        const API_FAVORITE_LINES = '/api/favoriteLines';
        axios.get(API_FAVORITE_LINES)
        .then( res => {
            console.log(res.data);
            let data = res.data.filter(function(item) {
                return item.id != null;
            }).map(function(item){
                return item.id
            });
            this.setState({
                favoriteLines: data
            })
        })
        .catch( err => {
            console.log(err);
        });
    }

    inFavorites(lineName){
        for(let i = 0; i < this.state.favoriteLines.length; i++){
            if(lineName === this.state.favoriteLines[i]){
                return true;
            }
        }
        return false;
    }

    addToFavorites(lineName){
        if(this.inFavorites(lineName)){
            return
        }
        const API_FAVORITE_LINES = `/api/favoriteLines/${lineName}`;
        axios.post(API_FAVORITE_LINES)
        .then((res) =>{
            this.loadFavData();
        })
        .catch( err => {
            console.log(err);
        })
    }

    removeFromFavorites(lineName){
        if(!this.inFavorites(lineName)){
            return
        }
        const API_FAVORITE_LINES = `/api/favoriteLines/${lineName}`;
        axios.delete(API_FAVORITE_LINES)
        .then((res) =>{
            this.loadFavData();
        })
        .catch( err => {
            console.log(err);
        })
    }

    generateLineIcons(){
        let renderedLines = (this.state.currentlyFilteringByFavorites) ? 
                                  this.state.favoriteLines
                                : this.state.SUPPORTED_LINES;
        let icons = renderedLines.map(item => {
            return(
            <ListItem key={item}
                >
                    <ListItemAvatar button onClick={this.onLineClicked.bind(this, item)}>
                        <Avatar alt={`${item} train`} src = {`https://nooklyn-interview.herokuapp.com/subway/${item}.png`} />
                    </ListItemAvatar>
                    <ListItemIcon>
                        {this.inFavorites(item) ? 
                            <StarIcon onClick={this.removeFromFavorites.bind(this,item)} />
                        :   <StarBorder onClick={this.addToFavorites.bind(this,item)} />
                        }
                    </ListItemIcon>
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
                    <div onClick={this.toggleFavorites} className={`navbar-btn ${this.state.currentlyFilteringByFavorites ? "btn-selected" : "btn-unselected"}`}>
                        <i id="favLineBtn"  className="material-icons">star_border</i>  
                    </div>      
                </div>
                <hr />
                {this.generateLineIcons()}
            </div>
        )
    }
}
