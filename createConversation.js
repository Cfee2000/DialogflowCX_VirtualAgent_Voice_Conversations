
// This is your new function. To start, set the name and path on the left.

exports.handler = async(context, event, callback) => {
  let authToken = process.env.AUTH_TOKEN;
  let accountSid = process.env.ACCOUNT_SID;
  const client = require('twilio')(accountSid, authToken);
  
  let conversation = await client.conversations.v1.conversations
    .create({
      friendlyName: 'VirtualAgentConversation',
      uniqueName: `${event.From}_VirtualAgent_${new Date().toISOString()}`
      });
  console.log(JSON.stringify(conversation));

  //Put the caller in the conversation
  let caller = await client.conversations.v1.conversations(conversation.sid)
    .participants
    .create({
      identity: `${event.From}`
    });
    console.log(caller.sid);

  //Put the VirtualAgent in the conversation
  let virtualAgent = await client.conversations.v1.conversations(conversation.sid)
    .participants
    .create({
      identity: 'VirtualAgent'
    });
  console.log(virtualAgent.sid);

  let returnValues = {'ConversationSid': conversation.sid, "CallerSid": caller.sid, "VirtualAgentSid": virtualAgent.sid, "CallerIdentity": caller.identity, "VirtualAgentIdentity": virtualAgent.identity}
 
  callback(null, returnValues);
};
