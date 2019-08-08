# ns8-test
Small, RESTful API test in typescript and express.

## Installation and Running
Clone this repo, `cd` into the folder created, then run `npm install`. Choose one of the following options:

To build and run the "production" code, run
```
npm run build
npm start
```

To run in "development" mode
```
npm run start-dev
```

Either way, the application will open at either port 3000 or the port provided in the associated `env` file.

## Endpoints

### `POST /users/add`
Adds a user to the system. Assigns an ID on create. Checks to see if email already exists, and rejects creation if it does.

Request body structure:
```
{
  "user": {
    "email": <string:email>,
    "password": <string>,
    "phone": <Optional(string)>
  }
}
```

### `POST /events/add`
Adds an event assigned to a user to the system. Will fail if attempting to assign an event to a non-existent user.

Request body structure:
```
{
  "event": {
    "type": <string>,
    "userId": <number>
  }
}
```

### `GET /events/user/:id`
Returns events assigned to the provided user ID. Returns an empty list if ID doesn't have any events or doesn't exist.

### `GET /events/today`
Returns the events created in the last 24 hours. No parameters.

## Utilized Technologies
This project utilizes express and typescript, the boilerplate of which was partially provided by `express-generator-typescript`. A good chunk of that code was unnecessary, and thus removed from the project (such as public asset folders and delivering HTML pages).

The data is handled by simple JSON objects within the code. This was used due to the availability of libraries (e.g. lodash) that can search through JSON objects relatively easily, as well as to avoid spending a whole bunch of time figuring out and setting up true mock data systems. If this were a true production application, that time would naturally be spent to allow developers freedom to mock data while not getting in the way of plugging the application into a database. I initially spent a good chunk of time trying to get clever with the JSON data structure and dependency injection, but I was going in circles, so I went with the simple method utilized in the code.

## Assumptions, Next Steps, Thoughts, and Further Questions
0) Connect it to a real or mock DB to avoid the global vars.

1) I did not implement authorization to avoid falling down that rabbit hole, but it's definitely something this API would need. Along that same line, user account security would need improvement, considering it's storing the passwords as plaintext.

2) The project outline stated that the argument to create an event only required a `type` parameter, but considering this API is stateless (as per REST guidelines), that doesn't allow the event to connect to a user. As such, the request to the server must also include a user ID in order to connect the two. As stated in #1, this is also an argument for adding authorization systems, since this information could, down the line, be ascertained from a cookie or header instead of as part of the bare request body.

3) Having worked on applications without considering logging, logging would be a natural next feature to add. Logging is essential for quick and accurate debugging. Currently, it simply outputs to the console. Along that same vein, error messages could be a little more helpful.

4) I'm never 100% sure on the organization of an application, and thus would want to take a step back and see if there'd be a better way to organize the code than I have done here.

5) Would this API want to be cached? Some more discovery would be needed to make sure caching could be easily implemented into this API.

6) To continue off point #2, having this be a stateless API allows for much easier scaling, since each instance wouldn't be holding its own state, granted right now each instance _is_ handling its own state due to the JSON data stores, but I assumed this wouldn't be run in a cluster since - and I'm metagaming a bit here - it's a dev test.

7) Considering that the application's data store is just JSON objects, the data storage is handled synchronously. If it were being handled by a true DB, it'd be best to make those calls asynchronous to avoid blocking.

8) Are unit tests required? I assumed not. For production, it would make sense to have them.

9) In the event that a user is attempting to be added that already exists, is that an upsert or an ignore? I assumed the latter, since I'd imagine there'd rather be an explicit update to user data. Also, in the event of the ignore, would that be considered a bad request? I said no to avoid an error, but utilized a different response code than when it's actually added.

10) A good amount of the error handling could be abstracted to avoid repetition.