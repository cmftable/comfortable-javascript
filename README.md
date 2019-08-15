<p align="center">
  <img src="https://images.cmft.io/987150097760522240/1006417412574285824/1006417412595257344/cmft-js-banner.png" />
  <br/><br/>
  <a href="https://slack-comfortable.herokuapp.com/"><img src="https://img.shields.io/badge/-Join%20Slack%20Community-67c0a1.svg?logo=slack" style="display:inline-block" /></a>
  <br/>
</p>


# Javascript Development Kit
<p>
<img src="https://travis-ci.org/cmftable/comfortable-javascript.svg?branch=master" />
<img src="https://img.shields.io/badge/License-MIT-blue.svg" />
<br/><br/>
</p>

## Installation
#### NPM
Run this command:

```sh
npm install comfortable-javascript
```

#### For usage in the Browser
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/comfortable-javascript@latest/dist/comfortable.min.js"></script>
```
> **Note:** For a specific version replace ```@latest``` with the version of your choice.

The SDK will be available as a global variable called: ```Comfortable```

#### Downloadable version
Check out our release Page: https://github.com/cmftable/comfortable-javascript/releases

<br>

### Include the dependency:

```javascript
const Comfortable = require('comfortable-javascript');
```

### Connect to your Repository and make your first request:

```javascript
const api = Comfortable.api('{repository-api-id}', '{api-key}', options);

api.getDocuments()
  .then(result => {
    // futher implementation
  })
  .catch(err => {
    throw err;
  })
```
Complete documentation, installation instructions, and examples are available [here](https://docs.comfortable.io/sdks/javascript).

### Options:
| Option   | Type    | Description                                                                   |
|----------|---------|-------------------------------------------------------------------------------|
| useProxy | boolean | enables the usage of a Proxy Endpoint instead of using https://api.cmft.io/v1 |
| proxy    | string  | Proxy Url e.g. https://custom-api.com/v1                                      |

## Tests
 1. npm is a prerequisite for running the tests. Install npm on your system, then run ```npm install``` to install required files.
 2. Edit ```tests/Api.ts``` to add your credentials and test documents. Alternatively you can set your credentials as environment variables. For this you have to define `CMFT_REPOSITORY`, `CMFT_APIKEY`, `CMFT_DOCUMENT_ID`, `CMFT_DOCUMENT_ALIAS`. `CMFT_ASSET_ID`. `CMFT_PROXY_URL`.
 3. The tests can be executed by running the following command from the root directory:
 ```javascript
 npm run test
 // or
CMFT_REPOSITORY=... CMFT_APIKEY=... CMFT_DOCUMENT_ID=... CMFT_DOCUMENT_ALIAS=... CMFT_ASSET_ID=... CMFT_PROXY_URL=... npm run test
 ```

## More information
 - [Developer Documentation](https://docs.comfortable.io)
 - [Javascript SDK Documentation](https://docs.comfortable.io/sdks/javascript)
 - [Changelog](https://github.com/cmftable/comfortable-javascript/releases)

## Contributing
Pull requests are always welcome!
<br/>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


## License
This repository is published under the [MIT](LICENSE) license.