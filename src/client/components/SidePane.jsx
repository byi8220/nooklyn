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
    }

    switchPanes(tab) {
        this.setState({
            tabIndex : tab
        });
    }

    unloadTrip() {
        this.setState({
            tabIndex:1,
            currentArrivals: null,
            currentTripDest: null
        });
        this.props.loadNewTrip(null);
    }

    loadNewTripAndSwitchTab(arrivals, dest) {
        arrivals = arrivals.filter( (item) => item.attributes["station-name"] != null);
        // Chose to Sort them by time
        arrivals.sort(function(a,b) {
            let aTime = new Date(a.attributes["time"]);
            let bTime = new Date(b.attributes["time"]);
            return aTime.getTime() - bTime.getTime();
        });
        this.setState({
            tabIndex:2,
            currentArrivals: arrivals,
            currentTripDest: dest
        });
        this.props.loadNewTrip(arrivals);
    }
    render() {

        return (
            <div>
                { this.state.tabIndex === 0
                    && <TrainLinesView id="trainLinesView" onBackBtnClick={this.switchPanes.bind(this,1)} />}
                { this.state.tabIndex === 1
                    && <AllTripsView id="allTripsView" 
                    filteringLine={this.state.filteringLine} onLinesBtnClick={this.switchPanes.bind(this,0)}
                    loadNewTripAndSwitchTab={this.loadNewTripAndSwitchTab.bind(this)} />}
                { this.state.tabIndex === 2
                    && <CurrentTripView id="currentTripView" 
                    onBackBtnClick={this.unloadTrip}
                    currentTripDest={this.state.currentTripDest} 
                    currentArrivals={this.state.currentArrivals} />}
            </div>
        )
    }
}
