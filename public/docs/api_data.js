define({ "api": [
  {
    "type": "get",
    "url": "/api",
    "title": "Root",
    "name": "GetAPIRoot",
    "group": "Index",
    "description": "<p>This path gets the root of the API</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"success\": true,\n  \"message\":\"API Root\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/index.js",
    "groupTitle": "Index"
  },
  {
    "type": "get",
    "url": "/api/itinerary",
    "title": "Get All Itineraries",
    "name": "GetItineraries",
    "group": "Itinerary",
    "description": "<p>This path gets a list of all itineraries</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "[...]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/itinerary.js",
    "groupTitle": "Itinerary"
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "Delete Users by ID",
    "name": "DeleteUsersID",
    "group": "User",
    "description": "<p>This path Deletes a user by passing in the ID to the url</p>",
    "examples": [
      {
        "title": "Example Path:",
        "content": "/api/users/583003f9284d9222bf802777",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "Get All Users",
    "name": "GetUsers",
    "group": "User",
    "description": "<p>This path gets a list of all users</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "[...]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Create User",
    "name": "PostUsers",
    "group": "User",
    "description": "<p>This path creates a user from request body data</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "User"
  }
] });
