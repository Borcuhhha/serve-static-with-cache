# serve-static-with-cache

This is a fork of [expressjs/serve-static](https://github.com/expressjs/serve-static).
Adds caching files in memory. Also compresses files before caching. If you use 'compression' middleware for other requests, for the correct operation is necessary to add 'serve-static-with-cache' middleware before 'compression' middleware.

## Install

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install git+https://github.com/Borcuhhha/serve-static-with-cache.git
```


```js
var cachedServeStatic = require('serve-static-with-cache');
express.user(cachedServeStatic(pathToStaticFiles));
```

