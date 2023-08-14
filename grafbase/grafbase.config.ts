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


  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
