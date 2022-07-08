module.exports = function () {
    const http = require("./http");
    const socket = require("./socket");

    return {
        http: () => http(),
        socket: () => socket()
    };
};
