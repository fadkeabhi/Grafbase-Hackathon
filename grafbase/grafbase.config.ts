import { g, auth, config } from '@grafbase/sdk'

const message = g.model('Message', {
  request: g.string(),
  response: g.string()
})

const chat = g.model('Chat', {
  chatName: g.string(),
  conversations: g.relation(message).optional().list()
})




export default config({
  schema: g
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
