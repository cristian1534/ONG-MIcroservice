
# BACKEND ONG SERVICE
Backend part of No Country's project. Microservice connecting Node js, Express and Mongo DB. ONG has a complete C.R.U.D for its operations regarding posting vacancies for potentials candidates to apply. As POST has also complete C.R.U.D to be used by any ONG registered and loged in due to Token using for private routes and sessions. ONG and POSTS are connected eachother by _id, this allow Frontend team to filter by ONG/POST or POST/ONG.
Facebook API used for Authentication as second option for JWT. 
Documentation upload with Swagger.


## Author
- [@cristian1534](https://github.com/cristian1534)


## Screenshots

![App Screenshot](https://res.cloudinary.com/dwdqe8hyw/image/upload/v1679961114/cyj1xpr6svpwafllgwr5.png)


## Documentation

[Swagger] (http://localhost:5000/api/v1/docs)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

# ONG-SERVICE
MONGO_URI=
PORT=
SECRET_TOKEN=

# Cloudinary
CLOUDINARY_USER_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Facebook Metadata
CLIENT_ID=
CLIENT_SECRET=

## Installation

Install ONG-SERVICE with npm

```bash
  npm install
```
    
## Run Locally

Clone the project

```bash
 https://github.com/No-Country/c10-30-ft-mern.git
```

Go to the project directory

```bash
  cd ONG-SERVICE
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Tech Stack

**Server:** Node, Express, MongoDB, Facebook API, Swagger, JWT, Cloudinry, Express-Validator, Passport.


## Used By

This project is used by the following companies:

- NO COUNTRY

