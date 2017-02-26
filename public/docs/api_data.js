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
    "type": "post",
    "url": "/api/itinerary",
    "title": "Create Itineraries",
    "name": "CreateItineraries",
    "group": "Itinerary",
    "description": "<p>This path allows creation of itineraries</p>",
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
    "type": "post",
    "url": "/api/itinerary/generate",
    "title": "Generate Itinerary",
    "name": "GenerateItineraries",
    "group": "Itinerary",
    "description": "<p>This path creates an itinerary</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/itinerary.js",
    "groupTitle": "Itinerary"
  },
  {
    "type": "get",
    "url": "/api/itinerary/city/:city",
    "title": "Get Itineraries By City",
    "name": "GetCityItineraries",
    "group": "Itinerary",
    "description": "<p>This path gets a list of all itineraries for a specific city</p>",
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
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/docs/main.js",
    "group": "_home_jj_Desktop_github_projects_HackIllinois2017_public_docs_main_js",
    "groupTitle": "_home_jj_Desktop_github_projects_HackIllinois2017_public_docs_main_js",
    "name": ""
  }
] });
