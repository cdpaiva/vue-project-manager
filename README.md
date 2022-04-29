# Vue Project Manager

## Description

Vue Project Manager is an app to both display projects and to keep track of them.
It presents a list of current projects created by the user, allowing to showcase concepts practiced and a brief description of each project.
For each project, there is an associated kanban board, in where the current project status can be tracked.
Users can perform CRUD operations both in the projects and in the tasks of each project.
The current version is intended to be used more as a project showcase than a management tool itself, it is intended for a single user.
The next step is to add multiple users, which can be group in teams and have the tasks assigned to them.

## Tools used and concepts applied

This app is being created as an attempt of my first full stack application, built following all phases of a software development cycle: ever since requirement gathering from deployment.
The project is built in vue.js, with tailwind.css for the style.
Back-end is currently mocked with JSON-server.

## Project setup

To run the project, the JSON-server must be running.
The requests are currently directed to port 3001, so make sure that is where the JSON-server is set to.

To start the json server:

```
npm run db
```
To run the project in development mode:

```
npm run dev
```