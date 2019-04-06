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
            currentTrip: null
        }
        this.switchPanes = this.switchPanes.bind(this);
        
    }

    switchPanes(tab) {
        this.setState({
            tabIndex : tab
        });
    }

    render() {

        return (
            <div>
                { this.state.tabIndex === 0
                    && <TrainLinesView id="trainLinesView" onBackBtnClick={this.switchPanes.bind(this,1)} />}
                { this.state.tabIndex === 1
                    && <AllTripsView id="allTripsView" 
                    filteringLine={this.state.filteringLine} onLinesBtnClick={this.switchPanes.bind(this,0)}/>}
                { this.state.tabIndex === 2
                    && <CurrentTripView id="currentTripView" 
                    currentTrip={this.state.currentTrip} />}
            </div>
        )
    }
}
