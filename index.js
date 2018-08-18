/* jshint esversion: 6 */
/* jshint node: true */
const Discord = require("discord.js"),
	client = new Discord.Client(),
	newUsers = [],
	request = require('request').defaults({
		encoding: null
	}),
	DateTime = require('datetime-converter-nodejs'),
	Moment = require('moment-timezone'),
	moment = require('moment'),
	Exif = require("simple-exiftool"),
	textract = require("textract"),
	Jimp = require("jimp"),
	GMapsAPI = require("./classes/GMapsAPI.js"),
	GMapsObj = new GMapsAPI(),
	Address = require("./classes/Address.js"),
	AddressObj = new Address(),
	PokedexCmd = require("./classes/PokedexCmd.js"),
	PokedexObj = new PokedexCmd(),
	Invite = require("./classes/Invite.js"),
	InviteObj = new Invite(),
	TAddDel = require("./classes/TAddDel.js"),
	TAddDelObj = new TAddDel(),
	News = require("./classes/News.js"),
	NewsObj = new News(),
	Userinfo = require("./classes/Userinfo.js"),
	UserinfoObj = new Userinfo(),
	Help = require("./classes/Help.js"),
	HelpObj = new Help(),
	Callme = require("./classes/Callme.js"),
	CallmeObj = new Callme(),
	BotContact = require("./classes/BotContact.js"),
	BotContactObj = new BotContact(),
	TwitterMsgs = require("./classes/TwitterMsgs.js"),
	TwitterObj = new TwitterMsgs(),
	GymNotice = require("./classes/GymNotice.js"),
	GymNoticeObj = new GymNotice(),
	ghbLevelPattern = new RegExp(/Level 1|Level 2|Level 3|Level 4|Level 5/i),
	Rraid = require("./classes/Rraid.js"),
	RraidObj = new Rraid(),
	raidChannelPattern = new RegExp(/raids/),
	Btext = require("./classes/Btext.js"),
	BTextObj = new Btext(),
	Field = require("./classes/Field.js"),
	FieldObj = new Field(),
	pokedex = require('./pokedex.js');

var types = require('./data/types.json');
raidBosses = require('./data/raidboss.json');
var timesAnHour = 0;


client.login(process.env.clientlogin);

client.on("ready", () => {
	console.log("I am ready!");
	client.setInterval( everyHour, 900000 );//3600000 1800000 1200000 900000 60000
	grabGamepressEvolveList();
});

//start tweet messaging service
TwitterObj.display(client);

client.on("guildMemberAdd", (member) => {
	const guild = member.guild;
	
	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
	member.user.send(`Welcome! ${member.user.username} to **${member.guild.name}**
  Here are a few things to start with:
  1. __**Please**__ go ahead and read the **#rules** channel for general information, as well as rules and guidelines on how to use the **PoGoPoly** discord server.
  2. __**Please Do Not**__ post raids in the **#general** channel, use the **#raids** channel. It helps keep the conversations organized.  
  3. If you don't see any of the other channels please be patient. Contact an admin, and someone will give you permissions as soon as possible.
  4. To change your nickname, you can use the \`.callme\` command followed by the nickname you want to use. Your nickname will only change in this server.  Changing it to your PoGo account name will help others identify you.
  5. Use @here to notify active users in the current channel. It will help you call the attention of people that may be interested in your post, but __please do not misuse__ @here. Use it only when absolutely necessary.
  6. You can use the \`.tadd\` and \`.tdel\` commands to receive @ notifications for specific tiers of raids.  For example, try .tadd T5 or .tadd tier 5.
	7. You can also notify others of raids at poly, using \`.rraid PokeName MinsLeft\`
	8. Use the voice channels in times of inclement weather.
  9. Under no circumstances should you cause drama or fight with other members. If you need to talk, create a private group chat and talk it out there.
	10. If you are having issues, or want to learn more what the bot can do, just type \`.help\`
  Happy Hunting, hope you catch 'em all.`);

	//commented out, testing
	//let role = member.guild.roles.find("name", 'Member');
	//member.addRole(role).catch(console.error);
	
	
  if (!newUsers[guild.id]){
	 newUsers[guild.id] = new Discord.Collection(); 
  } 
  newUsers[guild.id].set(member.id, member.user);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  if ( newUsers[guild.id] && newUsers[guild.id].has(member.id) ){
	  newUsers[guild.id].delete(member.id);
  }
});

function grabGamepressRaidList(){
	request('https://pokemongo.gamepress.gg/sites/pokemongo/files/pogo-jsons/raid-boss-list.json?v100', function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var importedJSON = JSON.parse(body);
		 var convertedJSON = {};
		 var len = importedJSON.length;
		 for (var i=0; i<len; i++)
		 {
			 if (importedJSON[i].legacy === "Off" && importedJSON[i].future === "Off" && importedJSON[i].special === "Off") {
				 var name = importedJSON[i].title;
				 var level = importedJSON[i].tier;
				 name = name.replace(/<(?:.|\n)*?>/gm, '');
				 level = level.replace(/(<(?:.|\n)*?>)|\\n/gm, '');
				 level = level.replace(/\\n/gm, '').trim();
				 
				 String.prototype.lpad = function(padString, length) {
	    	 		var str = this;
	    			while (str.length < length)
	        		str = padString + str;
	    			return str;
					}
				 
				 convertedJSON[name.toLowerCase()] = 
				 {
					 "level": "Level "+level,
					 "image": "http://www.serebii.net/pokemongo/pokemon/"+(pokedex(name.toLowerCase()).id).toString().lpad("0", 3)+".png",
					 "cp": importedJSON[i].cp,
					 "active": true
				 };
			 }
		 }
		 if (convertedJSON.length != 0) {
		 	console.log("grabbed raid list successfully");
			console.log(convertedJSON);
			raidBosses = convertedJSON;
	 	 }
  } else {
		console.log("did not grab raid list successfully");
	}
})
}

function grabGamepressEvolveList(){
	request('https://pokemongo.gamepress.gg/sites/pokemongo/files/pogo-jsons/move-en.json', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		 var importedJSON = JSON.parse(body);
		 var len = importedJSON.length;
		console.log("grabbed pokemon move list successfully");
		grabGamepressPokemonList(importedJSON);
	} else {
		console.log("did not grab pokemon move list successfully");
	}
})
}

function grabGamepressPokemonList(evolveList){
	request('https://pokemongo.gamepress.gg/sites/pokemongo/files/pogo-jsons/list-en.json', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		 var importedJSON = JSON.parse(body);
		 var convertedJSON = {};
		 console.log("grabbed pokemon list successfully");
		 pokemonLength = importedJSON.length;
		 
		 String.prototype.lpad = function(padString, length) {
				var str = this;
				while (str.length < length)
					str = padString + str;
				return str;
			}
			
			prevEvolve = {};
			
			var evolveLen = evolveList.length;
			for (var i = 0; i<evolveLen; i++)
			{
				if (evolveList[i]['field_primary_moves'] === "") {
					delete evolveList[i];
				}
				else if (evolveList[i]["field_evolutions"] != "") {
					var evolves = evolveList[i]["field_evolutions"].toLowerCase().replace(/[^\w\s]/gi, '').replace(" ", "-").split(", ");
					for (var j=0; j< evolves.length; j++) {
						prevEvolve[evolves[j]] = evolveList[i]["title_1"].toLowerCase();
					}
				}
			}
			console.log(evolveList.length);
			console.log(importedJSON.length);

		 evolveList.sort(function(a, b) {
    	var textA = a.title_1;
    	var textB = b.title_1;
    	return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
		importedJSON.sort(function(a, b) {
    	var textA = a.title_1;
    	var textB = b.title_1;
    	return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
		 
		 for (var i = 0; i<Math.min(pokemonLength, evolveLen); i++)
		 {
				//console.log(evolveList[i])
				console.log(i)
				console.log(len(evolveList))
			 var idStr = evolveList[i]['number'];
			 idStr = idStr.replace(/[a-zA-Z]+/, '');
			 var id = parseInt(idStr);
			 var name = evolveList[i]['title_1'];
			 var key = name.toLowerCase().replace(/[^\w\s]/gi, '').replace(" ", "-");
			 var buddy = parseInt(importedJSON[i]['buddy'].replace(" km", ""));
			 var candy = parseInt((importedJSON[i]['candy'].length != 0) ? importedJSON[i]['candy'] : "0");
			 var img = "http://www.serebii.net/pokemongo/pokemon/"+idStr.lpad("0",3)+".png";
			 var stats = {"stamina":parseInt(importedJSON[i]['sta']),"attack":parseInt(importedJSON[i]['atk']),"defense":parseInt(importedJSON[i]['def'])};
			 var maxCP = parseInt(importedJSON[i]['cp']);
			 var type = importedJSON[i]['field_pokemon_type'].toLowerCase().split(", ");
			 var weaknessResist = getWeaknessResist(type);
			 var weaknesses = weaknessResist["weak"];
			 var resistances = weaknessResist["resist"];
			 var quickCharge = getQuickCharge(evolveList[i]['field_primary_moves'], evolveList[i]['field_secondary_moves']);
			 var evolveTo = evolveList[i]["field_evolutions"].toLowerCase().split(", ");
			 var evolveFrom = getEvolveFrom(prevEvolve, key);
			 var fleeRate = parseFloat(evolveList[i]['field_flee_rate'].replace(" %", ""))/100.0;
			 convertedJSON[key] = {
				 "id":id,
				 "buddy":buddy,
				 "candy":candy,
				 "name":name,
				 "img":img,
				 "stats":stats,
				 "maxCP":maxCP,
				 "type":type,
				 "weaknesses":weaknesses,
				 "resistances":resistances,
				 "quickMoves":quickCharge["quickMoves"],
				 "chargeMoves":quickCharge["chargeMoves"],
				 "fleeRate":fleeRate
			 };
			 if (evolveTo[0]!="") convertedJSON[key]["evolveTo"] = evolveTo;
			 if (evolveFrom != false) convertedJSON[key]["evolveFrom"] = evolveFrom;
		 }
		 console.log(convertedJSON);
		 pokedex(convertedJSON);
		 grabGamepressRaidList();
	} else {
		console.log("did not grab pokemon successfully");
	}
})
}

function getWeaknessResist(typeArray){
	//currently only supports pokemon with two types or one type
	var test1 = typeArray[0]+"/"+typeArray[1];
	var test2 = typeArray[1]+"/"+typeArray[0];
	var test3 = typeArray[0];
	toReturn = {};
	if(types.hasOwnProperty(test1))
	{
		toReturn["weak"] = types[test1]["weak"];
		toReturn["resist"] = types[test1]["resist"];
	}
	else if(types.hasOwnProperty(test2))
	{
		toReturn["weak"] = types[test2]["weak"];
		toReturn["resist"] = types[test2]["resist"];
	}
	else if(types.hasOwnProperty(test3) && typeArray.length == 1)
	{
		toReturn["weak"] = types[test3]["weak"];
		toReturn["resist"] = types[test3]["resist"];
	}
	return toReturn;
}

function getQuickCharge(quickMove, chargeMove){
	toReturn = {};
	toReturn["quickMoves"] = {};
	toReturn["chargeMoves"] = {};	
	quickVal = quickMove.toLowerCase().split(", ");
	quickVal.forEach(function(val){
		val = val.replace(" ","-");
		toReturn["quickMoves"][val] = {};
		toReturn["quickMoves"][val]["power"]= null;
		toReturn["quickMoves"][val]["dps"]= null;
	});
	chargeVal = chargeMove.toLowerCase().split(", ");
	chargeVal.forEach(function(val){
		val = val.replace(" ","-");
		toReturn["chargeMoves"][val] = {};
		toReturn["chargeMoves"][val]["power"] = null;
		toReturn["chargeMoves"][val]["dps"] = null;
	});
	return toReturn;
}

function getEvolveFrom(prevEvolve, key){
	//console.log(prevEvolve);
	//console.log(key);
	if (key in prevEvolve) {
		return prevEvolve[key];
	}
	else {
		return false;
	}
}

//actually runs every 15 minutes
function everyHour(){
	console.log(Date.now()+" current timestamp, everyHour triggered");
	let currentDate = Moment().tz('America/New_York').format('YYYY-MM-DD HH:MM:SS');
	let currentDateString = Moment().tz('America/New_York').format( 'YYYY-MM-DD');
	let currentTime = Moment().tz('America/New_York');
		client.guilds.forEach((item, index)=>{
			if ( newUsers[index] && newUsers[index].size > 0 && timesAnHour == 0 && currentTime.hour() <= 23 && currentTime.hour() >= 6) {
				const userlist = newUsers[index].map(u => u.toString()).join(" ");
				item.channels.find('name', 'announcements').send("Welcome our new members!\n" + userlist+"\nPlease make sure to ask an admin for team and level ranks.");
				newUsers[index].clear();
			}

			/*
			 * Clear pinned messages on raid channels. (only 1 right now)
			 */
			
				item.channels.forEach((item, index)=>{
					if( raidChannelPattern.test( item.name ) ){
						item.fetchPinnedMessages()
						.then((pinnedMessages)=>{
							if( pinnedMessages.size > 0){
								pinnedMessages.forEach(( message, index)=>{
									let timerEnds = new Date( currentDateString + ' ' + message.embeds[0].fields[2].value );
									//console.log( timerEnds );
									//console.log( currentDate );
									let	isExpired = moment( currentDate ).isAfter( timerEnds );
									
									//console.log( 'timerends: ' + timerEnds + ' currentTime: '+ currentDate + ' isExpired: '+isExpired );
									if( isExpired ){
										message.unpin();
										console.log(Date.now()+" current timestamp, removed pin");
									}

								});
							}
						})
						.catch((error)=>{
							if(error){
								console.log(error);
							}
						});
					}
				});
		});
	if( timesAnHour >= 3 ){
		timesAnHour = 0;
	}else{
		timesAnHour++;
	}
}

client.on("message", (message) => {
	// Set the prefix
	let prefix = ".",
		channelName = message.channel.name,
		currentTime = Moment().tz('America/New_York');
	
	if( message.system && message.type === 'PINS_ADD' && raidChannelPattern.test(channelName) && message.author.username === 'PoGoPolyBot' ){
		message.delete();
		console.log(Date.now()+" current timestamp, deleted pin notification");
	}
	if( message.author.username === 'PoGoPolyBot' && message.content.indexOf("/poll")>-1 )
	{
		message.delete();
		console.log(Date.now()+" current timestamp, deleted poll message");
	}
	if(message.author.username === 'Simple Poll' && message.content.indexOf("Simple Poll usage:")>-1)
	{
		message.delete();
		console.log(Date.now()+" current timestamp, deleted simple poll error");
	}
	
	if(message.author.username === 'Simple Poll' && message.embeds[0].description.indexOf("What time should we raid?")>-1)
	{
		raidChannel = message.guild.channels.find('name', 'raids');
		var msg2 = raidChannel.send("React here if you aren't/can't go:").then(function (message){message.react('😢');});
	}
	
	if( (message.author.username == 'GymHuntrBot' || message.author.username == 'PoGoPolyBot') && (message.embeds.length > 0 && message.embeds[0].url && ghbLevelPattern.test(message.embeds[0].title)) ){
		GymNoticeObj.display(message, GMapsObj);
		console.log(Date.now()+" current timestamp, GymNotice triggered");
	}
	
	if(message.member.id === process.env.frogman && (message.channel.name === "m-e-m-e-s" || message.channel.name === "commands"))
	{
		message.react('🐸');
	}
	
	if(message.member.id === process.env.bagel && (message.channel.name === "m-e-m-e-s" || message.channel.name === "commands"))
	{
		let bagel = client.emojis.find("name", "bagel");
		message.react(bagel);
	}
	
	if(message.member.id === process.env.treeman && (message.channel.name === "m-e-m-e-s" || message.channel.name === "commands"))
	{
		message.react('🌲');
		message.react('🌳');
		message.react('🎄');
		message.react('🎋');
		message.react('🌴');
		message.react('🌱');
	}
	if(message.member.id === process.env.potato && (message.channel.name === "m-e-m-e-s" || message.channel.name === "commands"))
	{
		//message.react('🥔');
		let party2 = client.emojis.find("name", "partywurmple2");
		message.react(party2).then(function (emoji){message.react('🥔').then(function (emoji){let party = client.emojis.find("name", "partywurmple");message.react(party);});});
	}
	
	if(message.member.id === process.env.cool && (message.channel.name === "m-e-m-e-s" || message.channel.name === "commands"))
	{
		message.react('🔥').then(function (emoji){message.react('😎').then(function (emoji){let fire = client.emojis.find("name", "typefire");message.react(fire);});});
	}
	
	if(message.member.id === process.env.eggplant && (message.channel.name === "m-e-m-e-s" || message.channel.name === "commands"))
	{
		message.react('🍆');
	}
	
	
	if (message.author.bot) return;
	
	if( message.isMentioned(message.guild.members.get(process.env.client_id)) ){
		BotContactObj.display(message);
		console.log(Date.now()+" current timestamp, BotContact triggered");
	}
	
	/*
	 * CALLME
	 */
	if (message.content.startsWith(prefix + "callme")) {
		CallmeObj.display(prefix, message);
		console.log(Date.now()+" current timestamp, callme triggered");
	}
	
	/*
	 * HELP
	 */
	if (message.content.startsWith(prefix + "help")) {
		HelpObj.display(prefix, message);
		console.log(Date.now()+" current timestamp, help triggered");
	}
	
	/*
	 * test Commands (commented out)
	 */
	 /*
	 if (message.content.startsWith(prefix + "test1")) {
		 //Put stuff here to test.
		 console.log(message.guild.members);
	 }
	 if (message.content.startsWith(prefix + "test2")) {
		 message.guild.channels.find('name', 'raids').send({
			 "embed": {
				 "color": 3447003,
				 "title": 'Level 4 Raid is starting soon!',
				 "url": 'https://GymHuntr.com/#28.144546148580186,-81.84874534606935',
				 "thumbnail": {
					 "url": 'https://images-ext-2.discordapp.net/external/zVajuJNDDxqjZc8VAUCL5txYG8yGYm2wFcOCMbC3ugw/https/raw.githubusercontent.com/PokeHuntr/Assets/master/raidlevels/4.png?width=160&height=154',
				 },
				 description: '**GymName**\n*Raid Starting: 0 hours 45 min 50 sec*'
			 }
		 });
	 }*/
	 
	 /*if (message.content.startsWith(prefix + "test"))
	 { 
		 client.guilds.forEach((item, index)=>{
			 let newsMention = item.roles.find('name', 'news');
			 messageContent = '<@&' + newsMention.id + '>'+' BREAKING NEWS from  https://twitter.com//status/';
			 let announcements = '';
			 announcements = item.channels.find('name', 'announcements');
			 if ( announcements ) {
				 announcements.send( messageContent );
			 }
		 });
	 }*/
	 
	 /*
	 * rraid
	 */
	 if(message.content.startsWith(prefix + "rraid")) {
				RraidObj.display(prefix, message, raidBosses);
				console.log(Date.now()+" current timestamp, rraid triggered");
		 }
	
	/*
	* Field and Research Summary commands
	*/
	if(message.content.startsWith(prefix + "field")) {
		FieldObj.field(prefix, message);
		console.log(Date.now() + "current timestamp, userinfo triggered");
	}
	if(message.content.startsWith(prefix + "rsummary")) {
		FieldObj.rsummary(prefix, message);
		console.log(Date.now() + "current timestamp, userinfo triggered");
	}
	
	/*
	 * USERINFO Command
	 */
	if (message.content.startsWith(prefix + "userinfo")) {
		UserinfoObj.display(prefix, message, channelName);
		console.log(Date.now()+" current timestamp, userinfo triggered");
	}
	
	/*
	 *  tadd - tdel Command
	 */
	if (message.content.startsWith(prefix + "tdel")) {
		TAddDelObj.tdel(prefix, message);
		console.log(Date.now()+" current timestamp, tdel triggered");
	} else if (message.content.startsWith(prefix + "tadd")) {
		TAddDelObj.tadd(prefix, message);
		console.log(Date.now()+" current timestamp, tadd triggered");
	}
	
	/*
	* newson - newsoff Command
	*/
	if (message.content.startsWith(prefix + "newson")) {
		NewsObj.newson(prefix, message);
		console.log(Date.now()+" current timestamp, newson triggered");
	} else if (message.content.startsWith(prefix + "newsoff")) {
		NewsObj.newsoff(prefix, message);
		console.log(Date.now()+" current timestamp, newsoff triggered");
	}
	
	/*
	 * INVITE COMMAND
	 */
	if (message.content.startsWith(prefix + "invite")) {
		InviteObj.genInvite(message);
		console.log(Date.now()+" current timestamp, invite triggered");
	}

	/*
	 * POKEDEX COMMAND
	 */
	if (message.content.startsWith(prefix + "pokedex")) {
		PokedexObj.display(prefix, message);
		console.log(Date.now()+" current timestamp, pokedex triggered");
	}
	/*
	 * ADDRESS COMMAND
	 */
	if (message.content.startsWith(prefix + "address")) {
		AddressObj.display(message, prefix, GMapsObj);
		console.log(Date.now()+" current timestamp, address triggered");
		}
		
	/*
	* BTEXT COMMAND
	*/
	if(message.content.startsWith(prefix + "b")){
		BTextObj.process(message, prefix);
		console.log(Date.now()+" current timestamp, btext triggered");
	}
	
	/*
	*April Fools
	if(Math.floor(Math.random() * Math.floor(5))===3){
		BTextObj.process(message, prefix);
	}
	*/

});
