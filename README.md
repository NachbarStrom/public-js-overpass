## Setup the environment
* Setup your environment variables:
````bash
export OVERPASS_URL=url
export REVERSE_CODING_KEY=key
export REVERSE_CODING_URL=url
````
* Run the setup bash script:
````bash
bash ./setup_ubuntu.sh
````
## Run the server
* Attached to the console:
````bash
yarn start src/server.js
````
* Detached from the console:
````bash
nohup sudo yarn start src/server.js >>logs 2>>logs &
````
* For development purposes (file changes trigger reload):
```bash
yarn dev
```
# Testing
Runs the integration tests against the local machine, so the server must be up and running.
```bash
yarn test
```
