# Architecture Diagram

This folder contains the architecture diagram for our NodeGoat DevSecOps project.

## Files
- `architecture.drawio`: editable source (open with draw.io / diagrams.net)
- `architecture.pdf`: exported copy for the report

## Components
| Component | Technology | Port |
|-----------|------------|------|
| Browser | User's web browser | n/a |
| NodeGoat web app | Node.js / Express (Docker container `web`) | 4000 |
| MongoDB | mongo:4.4 (Docker container `mongo`) | 27017 |

## Data flows
1. **Browser → Web app:** the user sends HTTP requests to http://localhost:4000.
2. **Web app → MongoDB:** the web app reads and writes data using the connection string `mongodb://mongo:27017/nodegoat`.

## Trust boundaries
1. **Public internet / user side:** the browser is untrusted. Everything it sends must be treated as possibly malicious input.
2. **Docker internal network:** the `web` and `mongo` containers talk to each other here. Only port 4000 is published to the host.
3. **Database:** MongoDB is exposed only inside the Docker network (`expose: 27017`), so it can't be reached directly from outside.