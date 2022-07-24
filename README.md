# DialogflowCX_VirtualAgent_Voice_Conversations

## Steps:
1. Create your own Functions Service. 
2. Add the 2 functions here to your service (just copy/paste after naming the function).
3. Import the Studio Flow JSON to a new Studio Flow. 
4. Update the Studio Flow to point to your "createConversation" function.
5. Update the "Connector Name" on the VirtualAgent widget to point to your Dialogflow CX Connector Unique Name (this is what we setup in the Add-ons)
6. Make sure to confirm your Dialogflow CX Add-On Connector is configured properly (eg. Conversation Profile ID, Location, etc etc needs to be setup properly)
7. Set up your Environement Variables in your Function Service with the variables (and appropriate values) I outline in the .env.example file. Also, make sure "<b>Add my Twilio Credentials (ACCOUNT_SID) and (AUTH_TOKEN) to ENV</b>" is checked
8. Make sure your Dependencies in your Function Service are up to date (eg. the twilio node version should be 3.80.0, just to be safe)
9. Update your StatusCallbackURL in the VirtualAgent widget configuration to point to your "virtualAgentStatusCallback" function

## How does this work?

The Studio Flow has an initial transition on incoming call to a function called "createConversation" that always creates a new Conversation between the Caller and the Virtual Agent. Practically speaking, this involves creating a new Conversation, then creating 2 new Participants on the Conversation, namely the caller and the virtual agent. Currently, I'm creating these 2 participants as "Chat" participants. I give the Caller an Identity equal to their phone number, and I give the VirtualAgent a static Identity of "VirtualAgent".

After the Conversation and Participants are created, the Function returns the SIDs and Identity values as JSON back to the Studio Flow for use downstream. And in fact, I set all of these values as Parameters on the VirtualAgent widget, which in practice means I'm setting up the Dialogflow CX VirtualAgent to have each of these values as Session Parameters throught the lifetime of the session, which also means they can then be leveraged in StatusCallbacks.

In the StatusCallback function, I write new messages to the Conversation as appropriate from both the Caller and the Virtual Agent. 
