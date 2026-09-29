# Containerisation Approach

## Overview
Our project uses OWASP NodeGoat, a web app built with Node.js and Express. It has two parts: the web app and a MongoDB database. We use Docker so both parts start with one command:

    docker-compose up --build -d

## The two services

**web (NodeGoat app):** This is built from our own Dockerfile. It runs on port 4000. The port is published, so we can open the app in a browser at http://localhost:4000.

**mongo (database):** This uses the official mongo:4.4 image from Docker Hub. We did not write a Dockerfile for it because the official image is trusted, maintained and ready to use.

## How the web app starts
The database needs a few seconds to start. If the web app starts too early, it fails to connect. To fix this, the web service runs a loop using `nc -z` that checks port 27017 every 2 seconds. When MongoDB is ready, the app runs `db-reset.js` to fill the database with starting data, and then runs `npm start`.

## Networking and trust boundaries
Docker Compose puts both containers on the same private network. The web app reaches the database using the name `mongo`, for example `mongodb://mongo:27017/nodegoat`.

The two services use different port settings:
- `web` uses `ports: "4000:4000"`. This opens the app to the host machine, so it is the public entry point.
- `mongo` uses `expose: 27017`. This makes the port available only to other containers on the Docker network. It is not reachable from the host or the internet.

This gives us two trust boundaries: browser to web app, and web app to database. Keeping the database internal reduces the chance of someone attacking it directly.

## Known issue
The database connection string is currently written in `docker-compose.yml`. This is a secrets-management problem, and we plan to move it out of the file later in the project.