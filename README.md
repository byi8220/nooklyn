# Nooklyn Interview Challenge

## Live copy: [Hosted On DigitalOcean](http://68.183.154.226:8080/)

### Installing and running locally

Requirements: Node.js and npm

Clone the repository and cd into the project:

`git clone https://github.com/byi8220/nooklyn.git`

`cd nooklyn`

Install Dependencies

`npm install`

Build Project

`npm run build`

Deploy Project on port 8080

`npm run deploy`

The project should now be running on localhost:8080


### Points of interest

Some of arrival timestamps appear to be out of order. For example, on Trip ID 1, the trip arrives at Bay 50th St. on 12:41:10 PM, and on Coney Island - Stillwell Av at 12:45:42 PM. This makes sense as the latter station comes after the former on the train ride,

I chose to sort them by timestamp just to make the map lines look cleaner. Paths involving out of order train stations look really erratic.