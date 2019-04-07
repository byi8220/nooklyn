import React, { Component } from 'react';


import './PaneView.css';

import Pagination from 'react-bootstrap/Pagination'
import TripListPage from './TripListPage';
import axios from 'axios';

export default class AllTripsView extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentlyFiltering: false,
            pageNo: 1,
        };
        this.toggleFavorites = this.toggleFavorites.bind(this);
        this.showLines = this.showLines.bind(this);
        this.loadPageData = this.loadPageData.bind(this);
    }

    componentDidMount() {
        this.loadPageData(1);
    }

    showLines() {
        this.props.onLinesBtnClick();
    }

    toggleFavorites() {
        this.setState((prevState, props) => ({
            currentlyFiltering: !prevState.currentlyFiltering
        }))
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
                <div onClick={this.toggleFavorites} className={`navbar-btn ${this.state.currentlyFiltering ? "btn-selected" : "btn-unselected"}`}>
                    <i id="favTripBtn"  className="material-icons">star_border</i>  
                </div>      
            </div>
            <div>
                <hr />
            </div>

            {!this.state.currentlyFiltering ?
                <TripListPage pageData={this.state.pageData} />
            :   <TripListPage pageData={this.state.favData}  /> }
            
            <div id="pagination">
                {!this.state.currentlyFiltering && this.generatePagination()}
            </div>

        </div>
        )
    }
}
