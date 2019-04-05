import React, { Component } from 'react'

import './FlexContainer.css';

import SidePane from './SidePane';
import MapPane from './MapPane';

export default class FlexContainer extends Component {
  render() {
    return (
      <div className='container'>
        <div className='side-pane'>
          <SidePane />
        </div>
        <div className='map-pane'>
          <MapPane />
        </div>
      </div>
    )
  }
}
