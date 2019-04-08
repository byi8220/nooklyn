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
        this.stopFilteringByLine = this.stopFilteringByLine.bind(this);
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
            console.log(res);
            if(res.data){
                let isFavorite = false;
                if(this.state.favData != null){
                    for(let i = 0; i < this.state.favData.length; i++){
                        if (this.state.favData[i].id === tripId){
                            isFavorite = true;
                        }
                    }
                }
                let trip = {
                    tripId: tripId,
                    arrivals: res.data.data,
                    dest: tripDest,
                    isFavorite: isFavorite
                };
                console.log(trip);
                this.props.loadNewTripAndSwitchTab(trip);
            }
        })
        .catch( err => {
            console.log(err);
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
        let filter = (this.props.currentlyFilteringByLine) ? `filter%5Broute%5D=${this.props.filteringLine}&` : "" ;
        let API_TRIP_PAGE_URL = `https://nooklyn-interview.herokuapp.com/trips?${filter}page%5Bnumber%5D=${pageNo}&page%5Bsize%5D=20`;
        axios.get(API_TRIP_PAGE_URL)
        .then( res => {
            let pageObj = res.data;
            console.log(pageObj);
            let lastPage = pageObj.links["last"]
                            .replace(/(.*)\?/, "")
                            .replace(/(.*)page%5Bnumber%5D=(\d+).*/,"$2");
            console.log(lastPage);
            this.setState({
                pageData: pageObj.data,
                pageNo: pageNo,
                lastPageNo: Number(lastPage)
            });
        })
        .catch( err => {
            console.log(err);
        });
    }

    generatePagination() {
        let pages = [];
        for(let i = 1; i <= this.state.lastPageNo; i++){
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

    stopFilteringByLine(){
        this.props.stopFilteringByLine( () => {
            console.log(this.props.filteringLine);
            console.log(this.props.currentlyFilteringByLine);
            this.loadPageData(1);
        });
    }

    render() {
        return (
        <div className="side-panel-container">

            <div className="navbar">
            {!this.props.currentlyFilteringByLine ? 
                <div onClick={this.showLines} className="navbar-btn btn-unselected">
                    <i id="viewLinesBtn" className="material-icons">train</i>  
                </div>
                :
                <div onClick={this.stopFilteringByLine} className="navbar-btn btn-unselected">
                    <i id="stopFilteringBtn" className="material-icons">arrow_back</i>  
                </div>
            
            }
    
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
