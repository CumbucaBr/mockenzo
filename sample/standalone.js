const Mockenzo = require("../index")

Mockenzo().http()
    .on(3000)
    .run([{
        route: '/products',
        statusCode: 200,
        method: 'GET',
        delay: 500,
        response: [{name: 'Product 1'}, {name: 'Product 2'}],
    }, {
        route: '/clients',
        statusCode: 200,
        method: 'GET',
        delay: 1000,
        response: [{name: 'Client 1'}, {name: 'Client 2'}],
    }])
    .start(() => {
        console.log("http server is running")
    });

Mockenzo()
    .socket()
    .on(3001)
    .onConnection(() => {
        console.log('received new connection')
    })
    .onMessage((ws, data) => {
        console.log('on message', data)
        ws.emit('message', 'message received of client');
    })
    .onError((error) => {
        console.error('received error', error)
    })
    .onClose(() => {
        console.log("closing socket server")
    })
    .start(() => {
        console.log("socket server is running")
    })
