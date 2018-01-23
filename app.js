/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var Store = require('./store');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./properties.file');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, function (session, args) {
    session.send('Hi Welcome to the Accenture FAQ Bot :)');
    session.send("How can I help you?");
});

bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;
console.log("<><><>");
// Main dialog with LUIS

var recognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/77ea1671-23d7-4bfb-a186-a2e9e53582cc?subscription-key=70255eaedfa0422f8b3f91a8aad987a7&verbose=true&timezoneOffset=0&q=");
bot.recognizer(recognizer);
bot.dialog('rolefamily', function (session, args) {
    console.log("Role family !");
    var property = properties.get('rolefamily');
    session.send(property);
}).triggerAction({
    matches: 'rolefamily'
});
bot.dialog('changerolefamily', function (session, args) {
    console.log("Change Role family !");
    var property = properties.get('changerolefamily');
    session.send(property);
}).triggerAction({
    matches: 'changerolefamily'
});
bot.dialog('careercounsellor', function (session, args) {
    console.log("Counsellor!");
    var property = properties.get('careercounsellor');
    session.send(property);
}).triggerAction({
    matches: 'careercounsellor'
});