## About CHATqL:

The core concept behind CHATqL involves leveraging the capabilities of the ChatGPT model to personalize interactions, tailoring them to individual users. This entails enabling users to utilize the ChatGPT API according to their requirements and preferences.

## Why CHATqL

The name "CHATqL" is derived from the fusion of "ChatGPT " and "GraphQL." It embodies the project's essence of using the ChatGPT API to establish user-AI connections through chat interfaces, while also incorporating the querying capabilities of GraphQL for effective data interaction.

## Team Details

@[SIDDHARTH BRAMHECHA](@Sid80)

@[ABHI FADKE](@fadkeabhi)

## Project Links

Github repo : [https://github.com/Sid-80/Grafbase-Hackathon](https://github.com/Sid-80/Grafbase-Hackathon)

Demo Deployment :

## Demo Video
[https://youtu.be/47IBKeabrww](https://youtu.be/47IBKeabrww)

## Functionalities of Project

1. **Easy Login:** Users can sign up or log in using their Google accounts, so they don't need to remember extra passwords.
    
2. **See Chats:** After logging in, users can see the chats they're a part of, like a list of their chat groups.
    
3. **Start New Chats:** Users can start new chat groups to talk about different things with friends or people.
    
4. **Read Chats:** When users click on a chat, they can read all the messages and conversations happening there.
    
5. **Ask AI Questions:** Users can ask GPT, and the answers it gives will be shown and kept in the chat.
    

## Technologies Used

1. Next.js  
    Next.js 13.4.12, situated within the /app directory, serves as the foundational React-based framework that underpins the application's development.
    
2. Grafbase
    
    Grafbase takes the helm as the database, contributing to data management.
    
3. Next-Auth
    
    Authentication is facilitated by Next-Auth, enriching security aspects.
    
4. TypeScript
    
    TypeScript is integrated to impart static typing to the JavaScript codebase, thereby enhancing code quality.
    
5. Tailwind
    
    Tailwind CSS, a utility-first CSS framework, is harnessed to stylize the application's visual elements.
    
6. Axios
    
    Axios, a widely used HTTP client for JavaScript, simplifies making asynchronous HTTP requests and managing responses.
    

## Process of project development

1. Building the UI (frontend) of the project on localhost using next.js
    
2. Along with the frontend development developing the graphql queries which will be used in the project in Pathfinder.
    
3. Implementing the queries developed in Pathfinder into the API in the next.js project.
    
4. Connecting the UI with APIs.
    

## The **heart of GraphBase( grafbase.config.ts )**

We have kept the GraphBase model straightforward. The models are as below.

```javascript
import { g, auth, config } from '@grafbase/sdk'

const message = g.model('Message', {
  request: g.string(),
  response: g.string()
})

const chat = g.model('Chat', {
  chatName: g.string(),
  conversations: g.relation(message).optional().list().optional()
})

const user = g.model('User',{
  email: g.string().unique().search(),
  chats: g.relation(chat).optional().list().optional()
})


export default config({
  schema: g,

  auth: {
    rules: rules => {
      rules.public()
    }
  }
})
```

1. **Importing Modules:**
    

```javascript
import { g, auth, config } from '@grafbase/sdk';
```

Here, we're importing the necessary modules from the `@grafbase/sdk` library. This includes modules for defining models (`g`), handling authentication (`auth`), and configuring the schema (`config`).

2. **Defining the "Message" Model:**
    

```javascript
const message = g.model('Message', {
  request: g.string(),
  response: g.string()
});
```

We're defining the "Message" model using the `g.model` function. It has two fields: `request` and `response`, both of which are of type string. This model represents messages exchanged within the application. Where `request` is a text query asked by the user and `response` is the response received from GPT.

3. **Defining the "Chat" Model:**
    

```javascript
const chat = g.model('Chat', {
  chatName: g.string(),
  conversations: g.relation(message).optional().list().optional()
});
```

The "Chat" model is defined next. It includes the fields `chatName` (a string) and `conversations` (a list of "Message" model instances). The `.optional()` indicates that these fields are not required for every "Chat" instance. Here in `conversations` all the Message related to the chat is stored.

4. **Defining the "User" Model:**
    

```javascript
const user = g.model('User', {
  email: g.string().unique().search(),
  chats: g.relation(chat).optional().list().optional()
});
```

The "User" model is defined with an `email` field (a string). It's marked as `unique()` to ensure each email is unique and `search()` to enable efficient search. Additionally, the model includes a relation to the "Chat" model, representing the chats associated with each user.

5. **Exporting Configuration:**
    

```javascript
export default config({
  schema: g,

  auth: {
    rules: rules => {
      rules.public();
    }
  }
});
```

The configuration is exported using the `config` function. The `schema` is set to `g`, meaning all the defined models are included in the schema. Within the `auth` section, the code specifies authentication rules using the `rules` function. Here, the `public()` rule is applied, allowing public access to the schema. This means that anyone can access the defined models and their data.

## Playing with Pathfinder

When we learned about this hackathon we didn't have any experience with graphql queries. so along with working on UI, we were trying all the required queries and mutations in Pathfinder. During this process, the query builder feature of Pathfinder was very useful. As it was helping us create a query or mutation just with a single click.

The queries file is given below

```javascript
query MessageCollection {
  messageCollection(first:10, filter: {id:{ in: ["message_01H7N0VSV75FTVQ74N3W4DE9ZY"]}}){
    edges{
      node{
        id,
        request,
        response
      }
    }
  }
}

query UserCollection {
  userCollection(first: 20){
    edges{
      node{
        id
        email
      }
    }
  }
}

#create new chat
mutation UserUpdate {
  userUpdate(by: {email : "newuser@gmail.com"} input: {chats:{create: {
    chatName:"test chat 3"
    
  }}}) {
    user {
      email
      chats(last: 1){
        edges{
          node{
            id
            chatName
          }
        }
      }
    }
  }
}

#get user chats
query User {
  user(by: {email: "newuser@gmail.com"}){
    id
    email
    chats(first: 20){
      edges{
        node{
          id
          chatName
        }
      }
    }
  }
}



mutation UserCreate {
  userCreate(input: {
    email:"newuser@gmail.com"
  }) {
    user{
      id,
      email
    }
  }
}

mutation ChatUpdate {
  chatUpdate(by: {id: "chat_01H7T1NEJX93ARRQ701RF7MCD3"} input: {conversations : {create : {request:"Hi", response: "Bye"} }}){
  chat{
    id
    conversations(last: 1){
      edges{
        node{
          id
          request
          response
        }
      }
    }
    }
  }
}



query Chat {
  chat(by: {id: "chat_01H7T1NEJX93ARRQ701RF7MCD3"}) {
    id
    chatName
    conversations(last: 50, orderBy: {createdAt:DESC}){
      edges{
        node{
          id
          request
          response
          createdAt
        }
      }
    }
  }
}
```

## Handling the responses

As the response given by graphbase are deeply complicated, It was very messy to handle them directly in the frontend. So when we received the response on the backend, we restructured the response contents and made them smaller.

The initial functions written to do so was,

```javascript
const axios = require("axios")

const graphbaseEndpoint = "http://127.0.0.1:4000/graphql"

const makeQuery = async ({query}) => {
  try {
    const response = await axios.post(graphbaseEndpoint, { query });

    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

const createUser = async (email) => {

  let query = `
    mutation UserCreate {
        userCreate(input: {
          email: "${email}"
        }) {
          user{
            id,
            email
          }
        }
      }
      `

  const res = await makeQuery(query)

  if (res === null) {
    console.log("apiError");
    return "apiError"
  }

  if (res?.errors?.length && res?.errors[0]?.message == `The value "${email}" is already taken on field "email"`) {
    console.log("Email exists");
    return "emailExists";
  }
  console.log("userCreated");
  return "userCreated";

}


const getUserByEmail = async (email) => {

  query = `
    query User {
      user(by: {email: "${email}"}){
        id
        email
        chats(first: 20){
          edges{
            node{
              id
              chatName
            }
          }
        }
      }
    }
      `

  const res = await makeQuery(query)

  if (res === null) {
    console.log("apiError");
    return "apiError"
  }

  if(res.data.user===null){
    console.log("userNotFound");
    return "userNotFound"
  }

  chats = []

  res.data.user.chats.edges.forEach(element => {
    chats.push(element.node)
  });

  response = {
    userId: res.data.user.id,
    email: res.data.user.email,
    chats: chats
  }
  console.log(response);
  return response

}


const getChatById = async (chatId) => {

  query = `
    query Chat {
      chat(by: {id: "${chatId}"}) {
        id
        chatName
        conversations(last: 50, orderBy: {createdAt:ASC}){
          edges{
            node{
              id
              request
              response
              createdAt
            }
          }
        }
      }
    }
      `

  const res = await makeQuery(query)

  if (res === null) {
    console.log("apiError");
    return "apiError"
  }

  chats = []

  res.data.chat.conversations.edges.forEach(element => {
    chats.push(element.node)
  });

  response = {
    chatId: res.data.chat.id,
    email: res.data.chat.chatName,
    chats: chats
  }
  console.log(response);
  return response

}


const createMessageForChatByChatId = async (chatId, requestDb, responseDb) => {

  query = `
  mutation ChatUpdate {
    chatUpdate(by: {id: "${chatId}"} input: {conversations : {create : {request:"${requestDb}", response: "${responseDb}"} }}){
    chat{
      id
      conversations(last: 1){
        edges{
          node{
            id
            request
          response
          }
        }
      }
     }
    }
  }
      `

  const res = await makeQuery(query)

  if (res === null) {
    console.log("apiError");
    return "apiError"
  }
  if(res.data.chatUpdate.chat.conversations.edges[0].node.request === requestDb){
    return res.data.chatUpdate.chat.conversations.edges[0].node
  }
  return "failed"
}
```

## Challenges faced

After creating the mutations and queries in Pathfinder, we tried to execute the same from our next.js application. But we were getting an error as "user not authorized". At that time we were not aware of the config, auth, and rules in graphbase. But after digging on the internet and graphbase docs we got the solution for it.

```javascript
  auth: {
    rules: rules => {
      rules.public()
    }
  }
```

It was a simple solution to make the rule to schema publically available.

## Conclusion

In this project, we delved into Grafbase, uncovering new data management possibilities. With hands-on experience, we harnessed Grafbase's power for effective data handling. This exploration enriched our chat application's communication capabilities. Integrating Grafbase opened new doors for innovation and user experience enhancement. Our project benefited greatly from this new field of expertise.
