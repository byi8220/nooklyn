import React, { Component } from 'react'
import './SidePane.css';

import AllTripsView from './SideComponents/AllTripsView';
import TrainLinesView from './SideComponents/TrainLinesView';
import CurrentTripView from './SideComponents/CurrentTripView';

export default class SidePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 1,
            filteringLine: null,
            currentArrivals: null,
            currentTripDest: null
        }
        this.switchPanes = this.switchPanes.bind(this);
        this.unloadTrip = this.unloadTrip.bind(this);
        this.loadNewTripAndSwitchTab = this.loadNewTripAndSwitchTab.bind(this);
        this.filterByLine = this.filterByLine.bind(this);
        this.stopFilteringByLine = this.stopFilteringByLine.bind(this);
    }

    switchPanes(tab) {
        this.setState({
            tabIndex : tab
        });
    }

    unloadTrip() {
        this.setState({
            tabIndex:1,
            currentTripId: null,
            currentArrivals: null,
            currentTripDest: null
        });
        this.props.loadNewTrip(null);
    }

    loadNewTripAndSwitchTab(trip) {
        console.log(trip);
        trip.arrivals = trip.arrivals.filter( (item) => item.attributes["station-name"] != null);
        // Chose to Sort them by time
        trip.arrivals.sort(function(a,b) {
            let aTime = new Date(a.attributes["time"]);
            let bTime = new Date(b.attributes["time"]);
            return aTime.getTime() - bTime.getTime();
        });
        this.setState({
            tabIndex:2,
            currentTripId: trip.tripId,
            currentArrivals: trip.arrivals,
            currentTripDest: trip.dest,
            currentTripIsFavorite: trip.isFavorite
        });
        this.props.loadNewTrip(trip.arrivals);
    }

    filterByLine(lineName){
        this.setState({
            filteringLine: lineName
        }, () => {
            console.log(lineName);
            this.switchPanes(1);
        });
    }

    stopFilteringByLine(callback){
        this.setState({
            filteringLine: null
        }, () => {
            console.log("Stopped filtering by line");
            console.log(this.state.filteringLine);
            this.switchPanes(1);

            callback();
        });
    }

    render() {

        return (
            <div>
                { this.state.tabIndex === 0
                    && <TrainLinesView id="trainLinesView" onBackBtnClick={this.switchPanes.bind(this,1)} 
                    filterByLine={this.filterByLine.bind(this)} />}
                { this.state.tabIndex === 1
                    && <AllTripsView id="allTripsView" 
                    filteringLine={this.state.filteringLine} onLinesBtnClick={this.switchPanes.bind(this,0)}
                    loadNewTripAndSwitchTab={this.loadNewTripAndSwitchTab.bind(this)} 
                    currentlyFilteringByLine={this.state.filteringLine != null} 
                    stopFilteringByLine={this.stopFilteringByLine} />}
                { this.state.tabIndex === 2
                    && <CurrentTripView id="currentTripView" 
                    onBackBtnClick={this.unloadTrip}
                    currentTripId={this.state.currentTripId}
                    currentTripDest={this.state.currentTripDest} 
                    currentArrivals={this.state.currentArrivals}
                    isFavorite={this.state.currentTripIsFavorite} />}
            </div>
        )
    }
}
