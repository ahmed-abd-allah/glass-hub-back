# glass-hub-back

Location Service
This is a Node.js application with an Express server that provides functionality related to managing locations. It includes APIs for creating locations and fetching all locations.

Setup
Ensure you have Node.js installed on your system.
Clone this repository to your local machine.
Navigate to the project directory in your terminal.
Run npm install to install dependencies.
Set up a PostgreSQL database and adjust the connection string in models/location.js accordingly.
Run npm start to start the server.
Usage
Create a Location
Endpoint: POST /api/v1/location
Request Body:
json
Copy code
{
"title": "Location Title",
"lat": "Latitude",
"lng": "Longitude",
"fileUrl": "File URL"
}
Response:
json
Copy code
{
"id": "Location ID",
"title": "Location Title",
"lat": "Latitude",
"lng": "Longitude",
"file_url": "File URL"
}
Get All Locations
Endpoint: GET /api/v1/location
Response:
json
Copy code
[
{
"id": "Location ID",
"title": "Location Title",
"lat": "Latitude",
"lng": "Longitude",
"file_url": "File URL"
},
...
]
Dependencies
Express.js: Web application framework for Node.js
pg: PostgreSQL client for Node.js
nodemon (devDependency): Utility that monitors changes in the source code and automatically restarts the server
Project Structure
models/location.js: Contains database functions for managing locations.
locationRoutes.js: Defines routes related to locations.
resoursesRoutes.js: Placeholder file (not utilized in the provided code).
server.js: Entry point of the application where the server is initialized.
package.json: Manifest file containing project metadata and dependencies.
README.md: Documentation file.
