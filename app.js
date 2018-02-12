/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var Store = require('./store');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./properties.file');
var https = require('https');


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

// Default response - with ChatBot info card
var bot = new builder.UniversalBot(connector, function (session, args) {
    session.send('Sorry,  I dont have an answer for that currently.<br><br>Can I help you with something else?');
    var msg = new builder.Message(session).addAttachment(createHeroCard(session));
    session.send(msg);
});


function createHeroCard(session) {
        return new builder.HeroCard(session)
            .title('Accenture FAQ Bot')
            .subtitle('<<< Demo version >>>')
            .text('The knowledge base is limited to the FAQ provided in the Technology Ireland Handbook')
            .buttons([
                builder.CardAction.openUrl(session, 'https://collections.accenture.com/FileViewer.aspx?f=f2ad46cc-344d-4de4-b2c3-cbad4a2562da', 'Read HandBook')
            ]);;
}
        

bot.set('storage', tableStorage);

// Main dialog with LUIS

var recognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/77ea1671-23d7-4bfb-a186-a2e9e53582cc?subscription-key=70255eaedfa0422f8b3f91a8aad987a7&verbose=true&timezoneOffset=0&q=");
bot.recognizer(recognizer);

// Handling each intends
bot.dialog('rolefamily', function (session, args) {
    console.log("Role family !");
    var property = properties.get('rolefamily');
    session.endDialog(property);
}).triggerAction({
    matches: 'rolefamily'
});
bot.dialog('changerolefamily', function (session, args) {
    console.log("Change Role family !");
    var property = properties.get('changerolefamily');
    session.endDialog(property);
}).triggerAction({
    matches: 'changerolefamily'
});
bot.dialog('careercounsellor', function (session, args) {
    console.log("Counsellor!");
    var property = properties.get('careercounsellor');
    session.endDialog(property);
}).triggerAction({
    matches: 'careercounsellor'
});
bot.dialog('greeting', function (session, args) {
    console.log("greeting !");
    
    session.send('Hi Welcome to the Accenture FAQ Bot :)');
    session.endDialog("How can I help you?");
}).triggerAction({
    matches: 'greeting'
});

// Enhanced

bot.dialog('whereCanContractWork', function (session, args) {
    console.log("whereCanContractWork!");
    var property = properties.get('whereCanContractWork');
    session.endDialog(property);
}).triggerAction({
    matches: 'whereCanContractWork'
});
bot.dialog('remainInRoleFamily', function (session, args) {
    console.log("remainInRoleFamily!");
    var property = properties.get('remainInRoleFamily');
    session.endDialog(property);
}).triggerAction({
    matches: 'remainInRoleFamily'
});
bot.dialog('onlineResourceForRoleFamily', function (session, args) {
    console.log("onlineResourceForRoleFamily!");
    var property = properties.get('onlineResourceForRoleFamily');
    session.endDialog(property);
}).triggerAction({
    matches: 'onlineResourceForRoleFamily'
});
bot.dialog('understandingRole', function (session, args) {
    console.log("understandingRole!");
    var property = properties.get('understandingRole');
    session.endDialog(property);
}).triggerAction({
    matches: 'understandingRole'
});
bot.dialog('identifyPeopleOfSameRole', function (session, args) {
    console.log("identifyPeopleOfSameRole!");
    var property = properties.get('identifyPeopleOfSameRole');
    session.endDialog(property);
}).triggerAction({
    matches: 'identifyPeopleOfSameRole'
});
bot.dialog('attendingTechnologyEvents', function (session, args) {
    console.log("attendingTechnologyEvents!");
    var property = properties.get('attendingTechnologyEvents');
    session.endDialog(property);
}).triggerAction({
    matches: 'attendingTechnologyEvents'
});
bot.dialog('roleFamilyAndTalentDiscussions', function (session, args) {
    console.log("roleFamilyAndTalentDiscussions!");
    var property = properties.get('roleFamilyAndTalentDiscussions');
    session.endDialog(property);
}).triggerAction({
    matches: 'roleFamilyAndTalentDiscussions'
});
bot.dialog('nonAlignedRoleAndPromotion', function (session, args) {
    console.log("nonAlignedRoleAndPromotion!");
    var property = properties.get('nonAlignedRoleAndPromotion');
    session.endDialog(property);
}).triggerAction({
    matches: 'nonAlignedRoleAndPromotion'
});
bot.dialog('nonMatchingRole', function (session, args) {
    console.log("nonMatchingRole!");
    var property = properties.get('nonMatchingRole');
    session.endDialog(property);
}).triggerAction({
    matches: 'nonMatchingRole'
});
bot.dialog('roleDictation', function (session, args) {
    console.log("roleDictation!");
    var property = properties.get('roleDictation');
    session.endDialog(property);
}).triggerAction({
    matches: 'roleDictation'
});
bot.dialog('peopleAlignedToCD&O', function (session, args) {
    console.log("peopleAlignedToCD&O!");
    var property = properties.get('peopleAlignedToCD&O');
    session.endDialog(property);
}).triggerAction({
    matches: 'peopleAlignedToCD&O'
});
bot.dialog('moveBtweenDTES', function (session, args) {
    console.log("moveBtweenDTES!");
    var property = properties.get('moveBtweenDTES');
    session.endDialog(property);
}).triggerAction({
    matches: 'moveBtweenDTES'
});
bot.dialog('movingTOHigherLevels', function (session, args) {
    console.log("movingTOHigherLevels!");
    var property = properties.get('movingTOHigherLevels');
    session.endDialog(property);
}).triggerAction({
    matches: 'movingTOHigherLevels'
});
bot.dialog('promotionConsideration', function (session, args) {
    console.log("promotionConsideration!");
    var property = properties.get('promotionConsideration');
    session.endDialog(property);
}).triggerAction({
    matches: 'promotionConsideration'
});
bot.dialog('trainingForRole', function (session, args) {
    console.log("trainingForRole!");
    var property = properties.get('trainingForRole');
    session.endDialog(property);
}).triggerAction({
    matches: 'trainingForRole'
});

bot.dialog('whatsTheTime', function (session, args, next) {
    var country = builder.EntityRecognizer.findEntity(args.intent.entities, 'country');
    
    if (country) {
      Store.searchHotels(country,session);
    } else {
           console.log("Time not fetch !");
        }
    }).triggerAction({
    matches: 'whatsTheTime'
});
