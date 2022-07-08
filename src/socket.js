module.exports = function () {
    const WebSocket = require('ws');
    const portDefault = 3001;
    const pathDefault = '/'

    let server;
    let pathAddress;
    let portAddress;

    const config = {
        onConnection: function () {
        },
        onMessage: function () {
        },
        onError: function () {
        },
        onClose: function () {
        },
        send: function () {
        }
    }

    function bind() {
        server.on('connection', config.onConnection)
        server.on('close', config.onClose)
    }

    return {
        on: function (path, port) {
            pathAddress = path;
            portAddress = port;
            return this;
        },
        onConnection: function (run) {
            config.onConnection = function (ws) {
                run(ws)
                ws.on('message', config.onMessage)
                ws.on('close', config.onClose)
            }
            return this;
        },
        onMessage: function (run) {
            config.onMessage = function (data, isBinary) {
                if(run) run(isBinary ? data : data.toString())
            }
            return this;
        },
        onError: function (run) {
            config.onError = function (error) {
                if(run) run(error)
            }
            return this;
        },
        onClose: function (run) {
            config.onClose = function () {
                if(run) run()
            }
            return this;
        },
        send: function (data) {
            server.clients.forEach(function each(client) {
                if (client.readyState === client.OPEN) {
                    client.send(data)
                }
            });
            return this;
        },
        clients: function () {
            return server.clients;
        },
        start: function (run) {
            server = new WebSocket.WebSocketServer({
                path: pathAddress || pathDefault,
                port: portAddress || portDefault
            });

            bind();

            if(run) run()

            return this;
        },
        disconnect: function () {
            server.clients.forEach((socket) => {
                if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
                    socket.terminate();
                }
            });
            return this;
        },
        stop: function (){
            this.disconnect();
            server.close()
        }
    }
}
