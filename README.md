# React - .Net - SQL Web Application
## Overview

Inspired by educational applications such as Anki, I wanted to create a single page web application with the use of ReactJS, .NET and a SQL database.

## Table of contents

- [Backend](#backend)
- [Database](#database)
- [Frontend](#frontend)

### Backend
To create the server side, I have chosen the C# framework ASP.NET Core and took advantage of ASP.NET Core Identity to build the authentication and authorization side of the project. For database operations, I added Entity Framework Core. Swagger was integrated into theproject  to test the API endpoints easily, at any point during the server developement. Other packeges that I have installed were CORS, JWT and AutoMapper.


#### CORS

Given that the server and the client have different origins, using CORS in order to manage the client's requests to the server was a necessary step. To make the server more secure, I write two CORS policies. One for non authenticated visitors. They are granted the permission to POST data, in case they want to create an account and they can see the public categories and generate a test with the cards in those decks, so they have the permission to the GET method as well. The second policy, for the authenticated users, gives them permission to all methods, as they should be able to edit and remove their own cards. 

### Database

For database quering and maipulation I have used SQL, managed through SQL Server. 

Entity Framework Core is used in order to create a connection between the server and SQL Server, also creating a schema for this project: QuizApp. ASP.NET Core Identity add the user tables, to which I added a class named UserRoles, in order to give users specific permissions over the application. 

### Frontend 

On the client side of this application, I have made use of ReactJS. In order to manage the context, Redux and it's toolkit was a perfect choice. In order to save images, I integrated Cloudinary into my project.
