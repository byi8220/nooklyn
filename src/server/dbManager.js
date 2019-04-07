import sqlite3 from 'sqlite3';
import path from 'path';

const database = new sqlite3.Database(path.join(__dirname, '..', '..', 'database', 'sample.db'));

export function buildDatabase(){
    console.log("database stuff here");
    const CREATE_TRIPS = "CREATE TABLE IF NOT EXISTS favorite_trips (id, PRIMARY KEY (id));";
    const CREATE_LINES = "CREATE TABLE IF NOT EXISTS favorite_lines (id, PRIMARY KEY (id));";
    database.run(CREATE_TRIPS);
    database.run(CREATE_LINES);
}

export function getFavoriteTrips(callback){
    let stmt = database.prepare("SELECT id FROM favorite_trips");
    stmt.all(function(err, rows){
        callback(err, rows);
    });
    
}

export function saveFavoriteTrip(tripId, callback){
    let stmt = database.prepare("INSERT OR REPLACE INTO favorite_trips VALUES(?)", tripId);
    stmt.run( function(err, rows){
        callback(err, rows);
    });
}

export function deleteFavoriteTrip(tripId, callback){
    let stmt = database.prepare("DELETE FROM favorite_trips WHERE id=(?)", tripId);
    stmt.run( function(err, rows){
        callback(err, rows);
    });
}

export function getFavoriteLines(callback){
    let stmt = database.prepare("SELECT id FROM favorite_lines");
    stmt.all(function(err, rows){
        callback(err, rows);
    });
}

export function saveFavoriteLine(lineName, callback){
    let stmt = database.prepare("INSERT OR REPLACE INTO favorite_lines VALUES(?)", lineName);
    stmt.run( function(err, rows){
        callback(err, rows);
    });
}

export function deleteFavoriteLine(lineName, callback){
    let stmt = database.prepare("DELETE FROM favorite_lines WHERE id=(?)", lineName);
    stmt.run( function(err, rows){
        callback(err, rows);
    });
}