# serve-static-with-cache

This is a fork of [expressjs/serve-static](https://github.com/expressjs/serve-static).
Adds caching files in memory. Also compresses files before caching. 

## Install

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install serve-static-with-cache
```


```js
var cachedServeStatic = require('serve-static-with-cache');
express.use(cachedServeStatic(pathToStaticFiles));
```

