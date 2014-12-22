# Hapi.js test project

Simple Hapi.js project.

## Quick setup

If you already have Node running on your machine, this is the easiest way to get the project up and running.

### Requirements

- Node.js v0.10.33
- npm v2.1.11

### Installation steps

1. Install project dependencies
`$ npm install`
 
2. Create a config.json file
`$ cp server/config.sample.json server/config.json`

### Run

`$ node server`

### Use

On your browser go to: `http://localhost:8000`

## Using Docker

This is the alternative method using Docker

### Requirements

- Docker - https://docs.docker.com/installation
- Fig - http://www.fig.sh/install.html

### Installation steps

`$ fig -p hapiproject build`

### Run

`$ fig -p hapiproject up`

### Use

On your browser go to: `http://localhost:8000`
