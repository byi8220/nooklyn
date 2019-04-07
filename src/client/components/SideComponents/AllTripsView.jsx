import React, { Component } from 'react';


import './PaneView.css';

import Pagination from 'react-bootstrap/Pagination'
import TripListPage from './TripListPage';
import axios from 'axios';

export default class AllTripsView extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentlyFilteringByFavorites: false,
            pageNo: 1,
        };
        this.toggleFavorites = this.toggleFavorites.bind(this);
        this.showLines = this.showLines.bind(this);
        this.loadFavData = this.loadFavData.bind(this);
        this.loadPageData = this.loadPageData.bind(this);
        this.loadTrip = this.loadTrip.bind(this);
    }

    componentDidMount() {
        this.loadPageData(1);
        this.loadFavData();
    }

    showLines() {
        this.props.onLinesBtnClick();
    }

    toggleFavorites() {
        this.setState((prevState, props) => ({
            currentlyFilteringByFavorites: !prevState.currentlyFilteringByFavorites
        }), this.loadFavData);
    }

    loadTrip(tripId, tripDest){
        let newTrip = [];
        const API_ARRIVALS_PAGE_URL = `https://nooklyn-interview.herokuapp.com/trips/${tripId}/arrivals`
        axios.get(API_ARRIVALS_PAGE_URL)
        .then( res => {
            if(res.data){
                let isFavorite = false;
                for(let i = 0; i < this.state.favData.length; i++){
                    if (this.state.favData[i].id === tripId){
                        isFavorite = true;
                    }
                }
                this.props.loadNewTripAndSwitchTab(
                    {
                        tripId: tripId,
                        arrivals: res.data.data,
                        dest: tripDest,
                        isFavorite: isFavorite
                    });
            }
        })
        .catch( err => {

        });
    }

    loadFavData(){
        const API_FAVORITE_TRIPS = '/api/favoriteTrips';
        axios.get(API_FAVORITE_TRIPS)
        .then( res => {
            let data = res.data.filter(function(item) {
                return item.id != null;
            });
            let favorites = [];
            data.forEach( (item) => {
                if(item.id == null){
                    return;
                }
                const API_TRIP_URL = `https://nooklyn-interview.herokuapp.com/trips/${item.id}`;
                axios.get(API_TRIP_URL)
                .then( res => {
                    favorites.push(res.data.data);
                    console.log(favorites);
                    if(favorites.length === data.length){
                        this.setState({
                            favData: favorites
                        });
                    }
                })
                .catch( err => {
                    console.log(err);
                });
            });
        })
        .catch( err => {
            console.log(err);
        });
    }
    
    loadPageData(pageNo) {
        const API_TRIP_PAGE_URL = `https://nooklyn-interview.herokuapp.com/trips?page%5Bnumber%5D=${pageNo}&page%5Bsize%5D=20`;
        axios.get(API_TRIP_PAGE_URL)
        .then( res => {
            let pageObj = res.data;
            this.setState({
                pageData: pageObj.data,
                pageNo: pageNo
            });
        })
        .catch( err => {
            console.log(err);
        });
    }

    generatePagination() {
        let pages = [];
        for(let i = 1; i <= 118; i++){
            pages.push(
                <Pagination.Item
                    key={i} active={i===this.state.pageNo}
                    onClick={this.loadPageData.bind(this,i)}>{i}</Pagination.Item>
            )
        }
        return (
            <Pagination>
                <Pagination.First />
                {pages}
                <Pagination.Last />
            </Pagination>
        );
    }

    render() {
        return (
        <div className="trip-flex">

            <div className="navbar">
                <div onClick={this.showLines} className="navbar-btn btn-unselected">
                    <i id="viewLinesBtn" className="material-icons">train</i>  
                </div>      
                <div className="navbar-item">
                    <h2>Trips</h2>  
                </div>
                <div onClick={this.toggleFavorites} className={`navbar-btn ${this.state.currentlyFilteringByFavorites ? "btn-selected" : "btn-unselected"}`}>
                    <i id="favTripBtn"  className="material-icons">star_border</i>  
                </div>      
            </div>
            <div>
                <hr />
            </div>

            {!this.state.currentlyFilteringByFavorites ?
                <TripListPage loadTrip={this.loadTrip} pageData={this.state.pageData} />
            :   <TripListPage loadTrip={this.loadTrip} pageData={this.state.favData}  /> }
            
            <div id="pagination">
                {!this.state.currentlyFilteringByFavorites && this.generatePagination()}
            </div>

        </div>
        )
    }
}
