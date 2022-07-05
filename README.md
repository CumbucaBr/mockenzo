# Mockenzo mock-server

Mockenzo is a library to help developers and testers to create mock servers in an easy and practical way

It is a library compatible with all types of unit and integration tests.

## how to use

<table>
    <thead>
        <th>
            Methods
        </th>
        <th>
            Description
        </th>
    </thead>
    <tr>
        <td>on(port)</td>
        <td>Create server listening port</td>
    </tr>
    <tr>
        <td>get('/')</td>
        <td>Create method get</td>
    </tr>
    <tr>
        <td>post('/')</td>
        <td>Create method post</td>
    </tr>
    <tr>
        <td>put('/')</td>
        <td>Create method put</td>
    </tr>
    <tr>
        <td>delete('/')</td>
        <td>Create method delete</td>
    </tr>
    <tr>
        <td>path('/')</td>
        <td>Create method path</td>
    </tr>
    <tr>
        <td>statusCode(statusCode)</td>
        <td>Send status code number</td>
    </tr>
    <tr>
        <td>response({ })</td>
        <td>Response object</td>
    </tr>
    <tr>
        <td>responseJsonFile('')</td>
        <td>Response file json object (path source project)</td>
    </tr>
    <tr>
        <td>delay(timeMilliseconds)</td>
        <td>add response delay in milliseconds</td>
    </tr>
    <tr>
        <td>run()</td>
        <td>finish the route configuration and run</td>
    </tr>
</table>


## sample

run `node sample/standalone.js`

````javascript
const Mockenzo = require("../index")

Mockenzo()
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
        .responseJsonFile('../sample/mocks/list.json')
        .run()
    .start(() => {
        console.log("server is running")
    });
````

