[![npm version](https://badge.fury.io/js/mockenzo.svg)](https://badge.fury.io/js/mockenzo)

# Mockenzo mock-server

Mockenzo is a library to help developers and testers to create mock servers in an easy and practical way

It is a library compatible with all types of unit and integration tests.

## Installation
Use your favorite package manager to install:

```bash
npm install mockenzo --dev
```

```bash
yarn add mockenzo -D
```

## Usage 


### HTTP Mock Server

````javascript
const Mockenzo = require('mockenzo')//javascript / typescript
const mockJsonFile = require('./path/mock_jsonfile_response200.json')

Mockenzo()
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
            .responseJsonFile(jsonFile)
            .run()
        .start(() => {
            console.log("server is running")
        });
````

## HTTP Mock Server with ObjectConfig
````
Object Route Config
{
    route: '/products',
    statusCode: 200,
    method: 'GET',
    delay: 500,
    response: [{name: 'Product 1'}, {name: 'Product 2'}]
}
````

````javascript
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
````

### Socket Mock Server

````javascript
const Mockenzo = require('mockenzo')//javascript / typescript

const mockenzo = Mockenzo()
    .socket()
        .on(3001)
            .onConnection(() => {
                console.log('received new connection')
            })
            .onMessage((data) => {
                console.log(data)//print message sent to server
                mockenzo.send("successful")//clients receive "successful"
            })
            .onError((error) => {
                console.error('received error', error)
            })
            .onClose(() => {
                console.log("closing socket server")
            })
        .start()
````

## Sample

```bash
yarn standalone
```

## How to use

### HTTP Server
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
        <td>Create server listening port | default port is 3000</td>
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
        <td>responseJsonFile(file)</td>
        <td>Response file json object (add file json using require)</td>
    </tr>
    <tr>
        <td>delay(timeMilliseconds)</td>
        <td>add response delay in milliseconds</td>
    </tr>
    <tr>
        <td>run()</td>
        <td>finish the route configuration and run</td>
    </tr>
    <tr>
        <td>start()</td>
        <td>initialize mock server</td>
    </tr>
    <tr>
        <td>start(function(){})</td>
        <td>initialize mock server and execute function when initialize</td>
    </tr>
    <tr>
        <td>stop()</td>
        <td>stop mock server - finishing instance</td>
    </tr>
</table>

### Socket Server
<table>
    <thead>
        <th>
            Methods
        </th>
        <th>
            Description
        </th>
        <th>
            -
        </th>
    </thead>
    <tr>
        <td>on(path, port)</td>
        <td>create server on path server "/users" | default path is "/"</td>
        <td>create server listening port | default port is 3001</td>
    </tr>
    <tr>
        <td>onConnection</td>
        <td>method callled when receive new client connection</td>
        <td></td>
    </tr>
    <tr>
        <td>onMessage(data)</td>
        <td>method called when client send message</td>
        <td></td>
    </tr>
    <tr>
        <td>onError</td>
        <td>method called when a server error occurs</td>
        <td></td>
    </tr>
    <tr>
        <td>onClose</td>
        <td>method callend when client close connection</td>
        <td></td>
    </tr>
    <tr>
        <td>disconnect()</td>
        <td>disconnect all clients</td>
        <td></td>
    </tr>
    <tr>
        <td>start()</td>
        <td>initialize mock server</td>
        <td></td>
    </tr>
    <tr>
        <td>start(function(){})</td>
        <td>initialize mock server and execute function when initialize</td>
        <td></td>
    </tr>
    <tr>
        <td>stop()</td>
        <td>stop mock server - finishing instance</td>
        <td></td>
    </tr>
</table>
