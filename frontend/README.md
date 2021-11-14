# API

### baseURL: http://39.104.48.59:8080/

### 注册

url
```
user/register/
```

axios post
```json
{
    username: 'Bob',
    password: 'gp7'
}
```

axios response
```json
{
    "data": {
      "username": "Carol",
      "password": "pbkdf2_sha256$260000$9lJqzQx8CDCIYuJCJIuhuB$E2sBkAMNbCBc2n58JBhW3OfaM+9zub8frfWZKcJVgiE="
    },
    "status": 201,  //若注册失败，status为400
    "statusText": "Created",
    "headers": {
      "content-length": "122",
      "content-type": "application/json"
    },
    "config": {
      "transitional": {
        "silentJSONParsing": true,
        "forcedJSONParsing": true,
        "clarifyTimeoutError": false
      },
      "transformRequest": [
        null
      ],
      "transformResponse": [
        null
      ],
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "maxBodyLength": -1,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      "baseURL": "http://39.104.48.59:8080",
      "method": "post",
      "url": "/user/register/",
      "data": "{\"username\":\"Carol\",\"password\":\"gp7\"}"
    },
    "request": {}
}
```


### 登录

url
```
user/login/
```

axios post
```json
{
    username: 'Bob',
    password: 'gp7'
}
```

axios response
```json
{
    "data": "",
    "status": 200,      //若登录失败，status为400
    "statusText": "OK",
    "headers": {
        "content-length": "0"
    },
    "config": {
        "transitional": {
        "silentJSONParsing": true,
        "forcedJSONParsing": true,
        "clarifyTimeoutError": false
        },
        "transformRequest": [
        null
        ],
        "transformResponse": [
        null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "headers": {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
        },
        "baseURL": "http://39.104.48.59:8080",
        "method": "post",
        "url": "/user/login/",
        "data": "{\"username\":\"Bob\",\"password\":\"gp7\"}"
    },
    "request": {}
}
```
