# DialogflowCX_VirtualAgent_Voice_Conversations

Steps:
1. Create your own Functions Service. 
2. Add the 2 functions here to your service (just copy/paste after naming the function).
3. Import the Studio Flow JSON to a new Studio Flow. 
4. Update the Studio Flow to point to your function.
5. Update the "Connector Name" on the VirtualAgent widget to point to your Dialogflow CX Connector Unique Name (this is what we setup in the Add-ons)
6. Make sure to confirm your Dialogflow CX Add-On Connector is configured properly (eg. Conversation Profile ID, Location, etc etc needs to be setup properly)
7. Set up your Environement Variables in your Function Service with the variables (and appropriate values) I outline in the .env.example file
8. Make sure your Dependencies in your Function Services are up to date (eg. the twilio node version should be 3.80.0, just to be safe)
