[![Build Status](https://travis-ci.com/enpayne/agile-assessment-tool.svg?token=XM7zo21DjfuY5wpehaVz&branch=develop)](https://travis-ci.com/enpayne/agile-assessment-tool)

# agile-assessment-tool

Agile Assessment Tool Zühlke Singapore. This tool serves the purpose to assess the customer's knowledge
about the agile methodology and also provide an entry point for Zühlke's business.

## Development Guide

### Prerequisites

You will need Docker installed. Please refer to [Mac Install](https://docs.docker.com/docker-for-mac/install/) and [Windows Install](https://docs.docker.com/docker-for-windows/install/).

### Local Development Workflow

1. Clone the repository to you local repository and navigate to the project folder.

2. Start the docker containers by typing `$ docker-compose up` in the terminal.

   - If you receive a node-sass related error that asks you to rebuild the node-sass package, run `$ docker-compose up` using the following command in the `docker-compose.yml` file on first run:
   - Line 9: `command: sh -c "cd client && npm rebuild node-sass && cd .. && npm install && npm run install:all && npm run build:client && npm run start:dev"`

3. Ensure the web server is running by viewing `localhost:3000` on the browser.

4. Start a test watcher on your development environment by typing `$ npm run install:all && npm run test:watch` into the terminal.

   - Testing the `./server` makes use of an in-memory mongodb package [`mongodb-memory-server`](https://github.com/nodkz/mongodb-memory-server). This package will automatically download a mongodb binary into a cache for future use.
   - If for some reason the `./server` tests fail, please delete the `./server/./node_modules/.cache/mongodb-memory-server` folder and try again. If your download speeds are slow, consider increasing the timeout in `app.test.js`.

5. Run the e2e test watcher by typing `$ ./node_modules/cypress/bin/cypress open` into the terminal and clicking the `Run all test specs` button.

### Automatic CI/CD

1. TravisCI will build the application for us. This happens automatically when pushing to any github branch.

2. When a release is pushed to **`master`** by approving a PR that merges a `release/vX.X.X` branch to `master`, TravisCI will deploy it to our Azure Web App service.

   - Go the [Zuhlke Agile Assessment Tool Website](https://agileassessment-prod.azurewebsites.net) to verify the change.
