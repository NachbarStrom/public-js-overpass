## Setup the environment
* Setup the overpass url environment variable:
````bash
export OVERPASS_URL=placeholder
````
* Run the setup bash script:
````bash
bash ./setup_ubuntu16.sh
````
## Run the server
* In detached mode:
````bash
nohup sudo yarn start src/server.js >>logs 2>>logs &
````
* In attached mode:
````bash
yarn start src/server.js
````
# Testing
```bash
yarn test
```
