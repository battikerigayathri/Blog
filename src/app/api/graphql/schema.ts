const typeDefs = `
  type Query {
    hello(name: String): String,
  }
  type Mutation{
    login(userName:String,password:String):loginResponse
  }
  type loginResponse{
msg:String
token:String
  }
`
export default typeDefs;