/* This function will capture status callbacks from Dialogflow CX for each intent processed
*/

//Setup Axios as an HTTP client for updating Segment
const axios = require('axios');

exports.handler = async(context, event, callback) => {
  //Pull the Stringified version of the JSON stored in our VirtualAgentProviderData into a JSON object so we can populate our Segment update payload
  let data = JSON.parse(event.VirtualAgentProviderData);
  console.log("Parameters: " + JSON.stringify(data.Parameters));
  console.log("ConversationId: " + JSON.stringify(data.ConversationId));
  
  let authToken = process.env.AUTH_TOKEN;
  let accountSid = process.env.ACCOUNT_SID;
  const client = require('twilio')(accountSid, authToken);

  console.log("conversation sid: " + data.Parameters.ConversationSid);
  console.log("virtual agent identity: " + data.Parameters.VirtualAgentIdentity);
  console.log("caller identity: " + data.Parameters.CallerIdentity);
  console.log("Customer Intent: " + data.ResolvedInput);
  console.log("Virtual Agent Reply: " + data.ReplyText);

  try {
      let callerMessage = "";
      let virtualAgentMessage = "";
      if(data.ResolvedInput != "") {
        //Create a Conversation Message with the Customer Intent
        callerMessage = await client.conversations.v1.conversations(data.Parameters.ConversationSid)
          .messages
          .create({
            author: `${data.Parameters.CallerIdentity}`,
            body: `${data.ResolvedInput}`
          });
        console.log(callerMessage);
      }

      if(data.ReplyText != "") {
        //Create a Conversation Message with the Virtual Agent Reply
        virtualAgentMessage = await client.conversations.v1.conversations(data.Parameters.ConversationSid)
          .messages
          .create({
            author: `${data.Parameters.VirtualAgentIdentity}`,
            body: `${data.ReplyText}`
          });
        console.log(virtualAgentMessage);
      }

     let messagesCreated = {"callerMessage": callerMessage, "virtualAgentMessage": virtualAgentMessage} 
     callback(null, messagesCreated);
  }catch(error){
    console.error(error);
    return callback(error);
  }
};
