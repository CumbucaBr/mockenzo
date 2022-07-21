module.exports = function() {
    const express = require('express');
    const cors = require("cors");

    const app = express();
    app.use(express.json())
    app.user(cors())

    const portDefault = 3000

    let appListener;
    let portAddress;
    let configs = [];

    let config = {
        path: undefined,
        response: undefined,
        method: undefined,
        statusCode: undefined,
        port: undefined,
        delay: undefined,
    };

    function builderRequests() {
        configs.forEach((config) => {
            switch (config.method) {
                case 'GET':
                    app.get(config.path, handlerRequest(config));
                    break;
                case 'POST':
                    app.post(config.path, handlerRequest(config));
                    break;
                case 'PUT':
                    app.put(config.path, handlerRequest(config));
                    break;
                case 'DELETE':
                    app.delete(config.path, handlerRequest(config));
                    break;
                case 'PATCH':
                    app.patch(config.path, handlerRequest(config));
                    break;
            }
        })
    }

    function handlerRequest(config) {
        return (req, res) => {
            if (config.delay) {
                setTimeout(() => {
                    res.status(config.statusCode).send(config.response ?? undefined);
                }, config.delay);
            } else {
                res.status(config.statusCode).send(config.response ?? undefined);
            }
        }
    }

    return {
        on: function (port) {
            portAddress = port;
            return this;
        },
        get: function (endpoint) {
            config.method = 'GET';
            config.path = endpoint;
            return this;
        },
        post: function (endpoint) {
            config.method = 'POST';
            config.path = endpoint;
            return this;
        },
        put: function (endpoint) {
            config.method = 'PUT';
            config.path = endpoint;
            return this;
        },
        delete: function (endpoint) {
            config.method = 'DELETE';
            config.path = endpoint;
            return this;
        },
        patch: function (endpoint) {
            config.method = 'PATCH';
            config.path = endpoint;
            return this;
        },
        statusCode: function (statusCode) {
            config.statusCode = statusCode;
            return this;
        },
        response: function (response) {
            config.response = response;
            return this;
        },
        responseJsonFile: function (jsonFile) {
            config.response = jsonFile;
            return this;
        },
        delay: function (delay) {
            config.delay = delay;
            return this;
        },
        run: function () {
            configs.push(config);
            config = {};
            return this;
        },
        start: function (run) {
            builderRequests();
            appListener = app.listen(portAddress || portDefault);
            if (run) run()

            return this;
        },
        stop: function () {
            appListener.close()
        }
    };
};
