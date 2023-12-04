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

const socketMockenzo = Mockenzo()
    .socket()
    .on(3001)
    .onConnection(() => {
        console.log('received new connection')
    })
    .onMessage((data) => {
        console.log(data)//print message sent to server
        socketMockenzo.send("successful")//clients receive "successful"
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
