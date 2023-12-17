# Node.js Backend Challenge

## Goal: Create a strong and scalable Node.js backend using MongoDB for your database.

Tech and Tools Used – Node.js(v18.18.0), Express.js, MongoDB Atlas, Postman

Functionalities Implemented:
1.	Auth System – user sign up, user sign in, user sign out
2.	CRUD Operations functionalities for user, post, and comment
3.	REST API for :
  a)	profile create, profile update, profile delete and view all users
  b)	post create, post update, post delete and view all posts
  c)	comment on post, update the comment, delete the comment
4.	Error handling helper functions and middlewares

## How to Set up Backend:
I.	Open Terminal or cmd or Powershell (whatever applicable).<br>
II.	Move to the desired location in your local machine.<br>
III.	Type the commands as per the given Steps below and hit Enter. Make sure to replace <url> with the actual URL.<br>

Step 1. Clone the GitHub repo on your local machine in your desired location.<br>
Example. **git clone <repo_url>** <br>

Step 2. In the Terminal, type **npm install**. <br>

Step 3. Create a .env file and then add the following data in it: <br>
  a)	PORT=5000 // or any suitable port number <br>
  b)	DATABASE=<your_mongoDB_connection_string>  <br>
      Note: <your_mongoDB_url > = mongodb://localhost:27017/mydbname (for local MongoDB setup) <br>
      <your_mongoDB_url > for Mongo DB Atlas – please refer - [go to guide](https://www.mongodb.com/docs/guides/atlas/connection-string/) <br>
  c)	JWT_SECRET=<random_text> // example : xyz@456, etc. <br>

Step 4. Type npm run start or npm start and hit Enter. <br>

The terminal should display this message : <br>
DB connected <br>
Backend Started @ PORT : <-- PORT NUMBER --> <br>
**----------------------------------------------------Setup Complete--------------------------------------------------**



## How to use the Backend:
Tools to be Used : Postman – [download](https://www.postman.com/downloads/) <br>
Base_URL - <http://localhost:<PORT_NUMBER> <br>
URL Structure: Base_URL/Endpoint <br>
API Endpoints: <br>

**1.	Signup - POST – /api/user/signup** <br>
Body payload – JSON format – replace <-- value --> with actual valid values <br>
{ <br>
    "name" : "<-- value -->", <br>
    "email" : "<-- value -->", <br>
    "password" : "<-- value -->" <br>
} <br>

**2.	Signin - POST - /api/user/signin** <br>
Body payload <br>
{ <br>
    "email" : "<-- value -- >", <br>
    "password" : "<-- value -- >" <br>
} <br>
**Note: copy the token value required for further endpoints** <br>

**3.	Update User - PUT - /api/user/update/:userId** <br>
userId – new ObjectId(‘id’) – refer mongo document – “_id” key <br>

  example -- http://localhost:5000/api/user/update/657c9e00216b75674346a0b2 <br>
  Add Headers – key – Authorization <br>
  		Value – Bearer <token> <br>
  Body_payload : <br>
  { <br>
      "name" : "<-- value -->"	<br>
  } <br>
**4.	Delete User - DELETE - /api/user/delete/:userId** <br>
Add headers as previous ones… <br>

**5.	View all users - GET - /api/user/:userId/allusers** <br>
Add Headers <br>

**6.	Signout - GET - /api/user/:userId/signout** <br>
Add Headers  <br>

**7.	Create New Post – POST - /api/post/create/:userId** <br>
Add headers <br>
Body: <br>
{ <br>
    "title" : "<-- value -->", <br>
    "content" : "<-- value -->" <br>
} <br>

**8.	Update Post – PUT - /api/post/:postId/:userId** <br>
Add headers <br>
Body: <br>
{ <br>
    "content" : "<-- value -->" <br>
} <br>

**9.	View All Posts – GET - /api/post/allposts/:userId** <br>
Add Headers <br>

**10.	Delete Post – DELETE - /api/post/delete/:postId/:userId** <br>
Add Headers <br>

**11.	Add Comment – POST - /api/comment/add/:postId/:userId** <br>
Add Headers <br>
Body: <br>
{ <br>
    "content" : "<-- value -->" <br>
} <br>

**12.	Update Comment – PUT - /api/comment/update/:commentId/:postId/:userId** <br>
Add Headers <br>
Body: <br>
{ <br>
    "content" : "<-- value -->" <br>
} <br>

**13.	Delete Comment – DELETE - /api/comment/delete/:commentId/:postId/:userId** <br>
Add Headers

**---------------------------------------------------------END-----------------------------------------------------------**
