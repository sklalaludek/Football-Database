class CacheProxy {
    _fetchData(url) {
        return fetch(url, {
            headers: {
                'X-Auth-Token' : 'b2190fa9c8134b2d9740ea7738a40a0d'
            }
        }).then(r => r.json() );
    }
    constructor() {
        this.cache = {}
        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData(url).then(data => {
                    this.cache[url] = data;
                    return data;
                });
        }
    }
}

module.exports = new CacheProxy();
