const typeDefs = `
  type Query {
    hello(name: String): String,
  }
  type Mutation{
    login(userName:String,password:String):loginResponse
    forgetPassword(email:String):forgetPasswordResponse
     resetPassword(email: String!, otp: String, newPassword: String!): ResetPasswordResponse
  }
  type loginResponse{
msg:String
token:String
  }
  type forgetPasswordResponse{
   msg:String
code:Int
  }
  type ResetPasswordResponse {
 msg: String!
}

`;
export default typeDefs;