import React, { Component } from 'react'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


export default class TripListPage extends Component {

    constructor(props) {
        super(props);
        this.onTripClicked = this.onTripClicked.bind(this);
    }


    onTripClicked(tripId, tripDest){
        this.props.loadTrip(tripId, tripDest);
    }
    renderItems() {
        if(!this.props.pageData){
            return [];
        }
        return this.props.pageData.map( (item) => {
            return(
            <ListItem button
            onClick={this.onTripClicked.bind(this,item.id, item.attributes["destination"])}>
                <ListItemText 
                    primary={item.attributes["destination"]} 
                    secondary={item.attributes["origin-departure"]}
                    />
                <ListItemAvatar>
                    <Avatar src={item.attributes["route-image-url"]} />
                </ListItemAvatar>
            </ListItem>
        )});
    }
    render() {
        return (
            <List style={{maxHeight:'100%', overflow:'auto'}}>
                {this.renderItems()}
            </List>
        )
    }
}
