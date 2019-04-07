import React, { Component } from 'react'

import './FlexContainer.css';

import SidePane from './SidePane';
import MapPane from './MapPane';

export default class FlexContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTrip: null
        }
        
        this.loadNewTrip = this.loadNewTrip.bind(this);
    }

    loadNewTrip(newTrip) {
        this.setState({
            currentTrip: newTrip
        });
    }

    render() {
        return (
        <div className='flex-container'>
            <div className='side-pane'>
                <SidePane loadNewTrip={this.loadNewTrip} />
            </div>
            <div className='map-pane'>
                <MapPane currentTrip={this.state.currentTrip} />
            </div>
        </div>
        )
    }
}
