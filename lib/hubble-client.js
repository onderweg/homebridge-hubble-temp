const http = require('http');

const request = ({ host, path, port = 80 }) => {
    const options = {
        host,
        path,
        port,
        method: 'GET',
        headers: {}
    };
    return new Promise((resolve, reject) => {
        let body = "";
        const req = http.request(options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                resolve(null);
                return;
            }
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve(parseResponse(body));
            });
        });
        req.on('error', (e) => {
            reject(new Error('Problem with request: ' + e.message));
        });
        req.end();
    });
};

/**
 * Parses response with following format:
 * value_temperature: 19.2
 *
 * @param response
 * @returns {{}}
 */
const parseResponse = (response) => {
    let result = {};
    response.split('\n').map((line) => {
        const [key, value] = line.split(/:\s*/);
        result = {
            ...result,
            [key]: value
        }
    });
    return result;
};

class HubbleClient {

    constructor({ host }) {
        this.host = host;
    }

    /**
     * Retrieve current temperature
     */
    async getTemperature() {
        const tempInfo = await request({
            host: this.host,
            path: '/?action=command&command=value_temperature'
        });
        return parseFloat(tempInfo.value_temperature);
    }
}

module.exports = HubbleClient;