const Mockenzo = require("../index")

const mockJsonFile = require('./mocks/list.json')

const httpMockenzo = Mockenzo()
    .http()//init config http
        .on(3000)//listen on port
            .post('/enzo')//init config route
            .delay(3000)//add delay for response
            .statusCode(400)//send status code
            .response({
                'error_code': 400,
                'error_description': 'Bad Request'
            })
            .run()//finish config and run
        .get('/enzo')//init new route
            .statusCode(401)
            .response({
                'error_code': 401,
                'error_description': 'Unauthorized'
            })
        .run()
            .get('/enzos')
            .statusCode(200)
            .responseJsonFile(mockJsonFile)
        .run()
    .start(() => {
        console.log("http server is running")
    });

const socketMockenzo = Mockenzo()
    .socket()
        .on('/', 3001)
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
