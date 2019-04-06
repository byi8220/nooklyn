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
    }
    
    trashman() {
        let trash = [];
        for(let i = 0; i < 200; i++){
            trash.push(
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>)
        }
        return trash;
    }
    render() {
        return (
            <List style={{maxHeight:'100%', overflow:'auto'}}>
                {this.trashman()}
            </List>
        )
    }
}
