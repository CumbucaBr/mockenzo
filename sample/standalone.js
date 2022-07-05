const Mockenzo = require("../index")

Mockenzo()
    .on(3000)
    .post('/enzo')
        .delay(3000)
        .statusCode(400)
        .response({
            'error_code': 400,
            'error_description': 'Bad Request'
        })
        .run()
    .get('/enzo')
        .statusCode(401)
        .response({
            'error_code': 401,
            'error_description': 'Unauthorized'
        })
        .run()
    .get('/enzos')
        .statusCode(200)
        .responseJsonFile('../sample/mocks/list.json')
        .run()
    .start(() => {
        console.log("server is running")
    });
