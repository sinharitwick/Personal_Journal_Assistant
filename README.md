# Personal Journal Assistant

The Personal Journal Assistant is a microservices-based application that helps users manage their personal journal entries. It provides features to create, read, update, and delete journal entries. Additionally, it offers sentiment analysis of journal content using an AI-powered classifier. Along with that, it also has a prompt tool which enables users to give a prompt and in response, content is displayed which is again powered by AI.

## Features

- Create a new journal entry with content, date, metadata, and goals.
- Retrieve journal entries for a specific user.
- Update a journal entry with new content, metadata, or goals.
- Delete a journal entry.
- Perform sentiment analysis on journal content using an AI-powered classifier.
- AI-powered prompt tool to generate random text

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- @xenova/transformers (for sentiment analysis and prompt tool)
- JSON Web Tokens (JWT) for authentication
- Postman (for testing API endpoints)

## Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/your-username/personal-journal-assistant.git
2. Install the dependencies:
   ```shell
   cd personal-journal-assistant
   npm install
3. Set up the environment variables:
   - Create a .env file in the root directory.
   - Add the following variables and provide appropriate values:
   ```shell
   PORT=5001
   MONGODB_URI=<your-mongodb-uri>
   ACCESS_TOKEN_SECRET=<your-access-token-secret>
4. Start the application:
   ```shell
   npm start
5. Access the application at http://localhost:5001 or the specified port.

## API Endpoints

### User Registration
- Endpoint: POST https://journai.vercel.app/api/register
- Description: Register a new user.
- Request Body:
  ```shell
  {
    "username": "tonystark",
    "email": "jarvis@gmail.com",
    "password": "howard"
  }

### User Login
- Endpoint: POST https://journai.vercel.app/api/login
- Description: Log in a user.
- Request Body:
  ```shell
  {
    "email": "jarvis@gmail.com",
    "password": "howard"
  }
- Response Body:
  ```shell
  {
    "message": "successfully logged in"
  }

### User Logout
- Endpoint: GET https://journai.vercel.app/api/logout
- Description: Log out the currently logged-in user.
- Response Body:
  ```shell
  {
    "message": "Logged out successfully"
  }

### Create a new journal entry
- Endpoint: POST https://journai.vercel.app/entry
- Description: Create a new journal entry for a specific user.
- Request Body:
  ```shell
  {
     "content": "I had a productive day!",
     "date": "2023-07-01",
     "metadata": {
       "location": "Home"
     },
     "goals": [
       {
         "title": "Exercise more",
         "progress": 50
       },
       {
         "title": "Read a book",
         "progress": 25
       }
     ]
  }

### Retrieve journal entries
- Endpoint: GET https://journai.vercel.app/entry
- Description: Retrieve journal entries for a specific user.

### Update a journal entry
- Endpoint: PUT https://journai.vercel.app/entry/:id
- Description: Update a journal entry by its ID.
- Request Parameters: id - ID of the journal entry to be updated.
- Request Body:
  ```shell
  {
     "content": "I had an amazing day!",
     "date": "2023-07-01",
     "metadata": {
       "location": "Home"
     },
     "goals": [
       {
         "title": "Exercise more",
         "progress": 50
       },
       {
         "title": "Read a book",
         "progress": 25
       }
     ]
  }

### Delete a journal entry
- Endpoint: DELETE https://journai.vercel.app/entry/:id
- Description: Delete a journal entry by its ID.
- Request Parameters: id - ID of the journal entry to be deleted.
- Response Body:
  ```shell
  {
     "message": "Entry deleted successfully"
  }

### Filter Entries by Date Range
- Example Endpoint: GET https://journai.vercel.app/entry?start=2023-07-01&end=2023-07-02
- Description: Retrieve entries within a specified date range.
- Query Parameters:
    start: The start date of the range (format: YYYY-MM-DD).
    end: The end date of the range (format: YYYY-MM-DD).

### Prompt Tool
- Endpoint: POST https://journai.vercel.app/prompt
- Description: Generate random text based on prompt
- Request Body:
  ```shell
  {
    "prompt": "Write about the clouds in the sky."
  }
- Response Body:
  ```shell
  {
    "generatedText": [
        "Clouds in the sky are large, fluffy clouds that often resemble cotton balls. They can be found on sunny days and indicate fair weather or thunderstorm conditions depending upon their altitude and location within an area of low pressure system."
    ]
  }
## Usage

1. Make requests to the API endpoints using a tool like Postman.
2. Ensure to include the necessary request parameters and headers, such as the bearer token for authentication.
3. Refer to the source code for more details on request payloads and response formats.

## Deployed Link

[https://journai.vercel.app/](https://journai.vercel.app/)
