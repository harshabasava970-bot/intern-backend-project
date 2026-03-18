# Backend Internship Project

## Features

* User Authentication (JWT)
* Role-based Access (Admin/User)
* Task CRUD APIs
* MongoDB Database

## Tech Stack

* Node.js
* Express.js
* MongoDB

## Setup Instructions

1. Clone repo
2. Run `npm install`
3. Create `.env` file:

   * MONGO_URI=your_mongo_url
   * JWT_SECRET=your_secret
4. Run `node backend/server.js`

## API Endpoints

* POST /api/auth/register
* POST /api/auth/login
* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id
