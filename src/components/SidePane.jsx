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
        this.loadNewTripAndSwitchTab = this.loadNewTripAndSwitchTab.bind(this);
    }

    switchPanes(tab) {
        this.setState({
            tabIndex : tab
        });
    }

    loadNewTripAndSwitchTab(arrivals, dest) {
        this.setState({
            tabIndex:2,
            currentArrivals: arrivals,
            currentTripDest: dest
        });
        console.log(this.props);
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
                    onBackBtnClick={this.switchPanes.bind(this,1)}
                    currentTripDest={this.state.currentTripDest} 
                    currentArrivals={this.state.currentArrivals} />}
            </div>
        )
    }
}
