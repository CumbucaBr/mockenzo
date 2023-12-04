const http = require("http");
const socketIO = require("socket.io");

module.exports = function () {
  const portDefault = 3001;
  const httpServer = http.createServer(requestHandler);

  let socketServer;
  let portAddress;

  function requestHandler(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Servidor Socket.IO");
  }

  const config = {
    onConnection: function () {},
    onMessage: function () {},
    onError: function () {},
    onClose: function () {},
    send: function () {},
  };

  function bind() {
    socketServer.on("connection", config.onConnection);
    socketServer.on("close", config.onClose);
  }

  return {
    on: function (port) {
      portAddress = port;
      return this;
    },
    onConnection: function (run) {
      config.onConnection = function (ws) {
        run(ws);
        ws.on("message", (data) => {
          config.onMessage(ws, data);
        });
        ws.on("close", config.onClose);
        ws.on("send", config.send);
      };
      return this;
    },
    onMessage: function (run) {
      config.onMessage = function (ws, data) {
        if (run) run(ws, data);
      };
      return this;
    },
    onError: function (run) {
      config.onError = function (error) {
        if (run) run(error);
      };
      return this;
    },
    onClose: function (run) {
      config.onClose = function () {
        if (run) run();
      };
      return this;
    },
    start: function (run) {
      httpServer.listen(portAddress || portDefault, () => {
        if (run) run();
      });

      socketServer = socketIO(httpServer);

      bind();

      return this;
    },
    disconnect: function () {
      socketServer.emit("message", "client disconnected");
      return this;
    },
    stop: function () {
      this.disconnect();
      httpServer.close();
    },
  };
};
