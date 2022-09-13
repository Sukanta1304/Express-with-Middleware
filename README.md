# Express-with-Middleware

#### Make an API using Express to perform CRUD Operation

* Create - POST - /posts/create - Should be able to create/add posts, store them in a json file called posts.json, in key "posts"
* Read - GET - / - Should be able get all the posts present;
* Update - PUT/PATCH - /posts/:id - modify the post of the given post ID
* Delete - DELETE - /posts/:id - delete the post of the given post ID

#### Write a Middleware called "validator" for the POST method - /posts/create. It should check if the post body is having the following fields and having the right data type for it. Only if it is correct,store the post in the json file, else return a message "Validation Failed".

* id - number
* title - string
* content - string
* author - string

#### Write a Middleware called "logger", it should log the METHOD, ROUTE and 'user-agent' from request headers in a file called logs.txt

* Ex:-GET, /, Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36

#### Write a Middleware called "guard", which should protect only the PUT/PATCH and DELETE routes. It should check if in the URL Query, if the password is equal to 54123, if yes, it should allow the user to modify/delete the post. If not, send a message "You are not authorised to do this operation"

### Installation
```
npm init -y

npm i express nodemon

```
