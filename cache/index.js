/**
 * Created by Islam on 30.11.2016.
 */

var compression = require('compression');

module.exports = function(){
    var cacheData = {};
    var compressionMiddleware = compression({level: 9});

    return function(req, res, _next){
        var cached = cacheData[req.path];

        if(cached){
            //setting headers
            for(var header in cached.headers) res.setHeader(header, cached.headers[header]);
            //writing data
            for(var i = 0; i < cached.chunksData.length - 1; i++){
                var chunkData = cached.chunksData[i];
                res.write(chunkData[0], chunkData[1]);
            }
            res.end();
        }else{
            res.__cache = {
                data: {
                    chunksData: [],
                    headers: null
                },
                path: req.path,
                next: _next,
                write: res.write,
                end: res.end
            };
            res.write = write;
            res.end = end;

            //set compression middleware
            compressionMiddleware(req, res, emptyFunc);
        }

        return {
            isCached: !!cached,
            next: !cached && function(err){
                next(err, res);
            }
        }
    };


    function write(chunk, encoding){
        this.__cache.data.chunksData.push([chunk, encoding]);
        this.__cache.write.call(this, chunk, encoding);
    }

    function end(chunk, encoding){
        chunk && this.__cache.data.chunksData.push([chunk, encoding]);
        this.__cache.data.headers = this._headers;
        cacheData[this.__cache.path] = this.__cache.data;
        this.__cache.end.call(this, chunk, encoding);
    }

    function next(err, res){
        res.write = res.__cache.write;
        res.end = res.__cache.end;
        res.__cache.next(err);
    }

    function emptyFunc(){}
};