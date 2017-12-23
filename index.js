/* jshint esversion: 6 */
/* jshint node: true */
const Discord = require("discord.js"),
	client = new Discord.Client(),
	TwitterStream = require('twitter-stream-api'),
	newUsers = [],
	pokedex = require('./pokedex.js'),
	GoogleMapsAPI = require('googlemaps'),
	request = require('request').defaults({
		encoding: null
	}),
	DateTime = require('datetime-converter-nodejs'),
	Moment = require('moment-timezone'),
	moment = require('moment'),
	Exif = require("simple-exiftool"),
	textract = require("textract"),
	Jimp = require("jimp"),
	ghbLevelPattern = new RegExp(/Level 4|Level 5/i),
	helloPattern = new RegExp(/\bhi\b|\bhello\b|\bgreetings\b|\bhey\b/i),
	holaPattern = new RegExp(/\bhola\b/i),
	thanksPattern = new RegExp(/\bthanks\b|\bthank\b|\bthank\b \byou\b|\bthank\b \bu\b|\bthx\b|\bthxs\b/i),
	graciasPattern = new RegExp(/\bgracias\b/i),
	adminPattern = new RegExp(/admin|bot|mod/i),
	teamPattern = new RegExp(/instinct|Instinct|mystic|Mystic|valor|Valor/i),
	cityPattern = new RegExp(/boca|coral_springs|coconut_creek|davie|deerfield|ft_lauderdale|hollywood|margate|north_lauderdale|parkland|pompano|plantation|sunrise|tamarac/);

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var raidBosses = require('./data/raidboss.json'),
	publicConfig = {
		key: 'AIzaSyCYtlcX6HByoHsNAIcSOpTpRLffPai-i7g',
		stagger_time: 1000, // for elevationPath
		encode_polylines: false,
		secure: true, // use https
		//proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
	},
	gmAPI = new GoogleMapsAPI(publicConfig),
	twitterKeys = {
		consumer_key : "poyJARVI2vqGmfyaEIabWXlmm",
		consumer_secret : "LxqjoxmofSTWsbScn7wUNxd7DKDjNJ6bjFvf9CPrUEHhcTGO9f",
		token : "288824671-XwJxXH5n9eNmXwbffb5oXP99USx3rysrxj2Ypo38",
		token_secret : "lfZ6lD3Ju5CfykIRMPLaMAnUHrbpbXl3d8yg0ynAsYR9K"
	},
	Twitter = new TwitterStream(twitterKeys, false),
	twitterUsers = [ 2839430431 , 849344094681870336, 961341668 ],
	timesAnHour = 0;


client.login("Mzk0MTMyNTcyNzYzODQ4NzA1.DSAKTA.d2r7QnChHAAcLD7mqXeYczsK4Mo");

client.on("ready", () => {
	console.log("I am ready!");
	client.setInterval( everyHour, 900000 );//3600000 1800000 1200000 900000 60000
});

Twitter.stream('statuses/filter', {
	follow: twitterUsers
});

Twitter.on('data', function (obj) {
    let tweet = JSON.parse(obj),
		messageContent = '';
	if(typeof tweet.user !== 'undefined' && tweet.user !== null){
		//console.log(tweet);
		//console.log(tweet.user.screen_name);
		//console.log( tweet.user.id );
		//console.log(twitterUsers.includes( tweet.user.id ));
		if( twitterUsers.includes( tweet.user.id ) ){
			//console.log( tweet );
			//https://twitter.com/TheSquareMedia/status/899313829099819008

			messageContent = `@everyone BREAKING NEWS from ${tweet.user.screen_name} https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
			client.guilds.forEach((item, index)=>{
				//console.log(item);
				//console.log(index);
				let announcements = '';
				announcements = item.channels.find('name', 'announcements');
				if ( announcements && !(tweet.user.screen_name === 'TheSquareMedia' && item.name === 'CS Raidrz') ) {
					announcements.send( messageContent );
				}else if( !(tweet.user.screen_name === 'TheSquareMedia' && item.name === 'CS Raidrz') ){
					item.channels.get(index).send( messageContent );
				}

			});
		}
	}
});

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
  6. Use the voice channels in times of inclement weather.
  7. Under no circumstances should you cause drama or fight with other members. If you need to talk, create a private group chat and talk it out there.
  Happy Hunting, hope you catch 'em all.`);

	//if( member.guild.name == 'square bot test' ){
	let role = member.guild.roles.find("name", 'Member');
	//console.log(member.guild.roles.find("name", 'Raidrz'));
	member.addRole(role).catch(console.error);
	//}
	
	
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

function everyHour(){
	let currentDate = Moment().tz('America/New_York').format('YYYY-MM-DD HH:MM:SS');
	let currentDateString = Moment().tz('America/New_York').format( 'YYYY-MM-DD');
	let currentTime = Moment().tz('America/New_York');
	//console.log(currentTime.hour());
	if( currentTime.hour() <= 23 && currentTime.hour() >= 6 ){
		client.guilds.forEach((item, index)=>{
			console.log(item);
			console.log(index);
			if ( newUsers[index] && newUsers[index].size > 0 && timesAnHour == 0) {//newUsers.size > 10
				//console.log('its pass 9');
				const userlist = newUsers[index].map(u => u.toString()).join(" ");
				item.channels.get("general").send("Welcome our new members!\n" + userlist);
				newUsers[index].clear();
			}

			/*
			 * Clear pinned messages on city channels.
			 */
			
				item.channels.forEach((item, index)=>{
					if( cityPattern.test( item.name ) ){
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
	}
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
	
	if( message.system && message.type === 'PINS_ADD' && cityPattern.test(channelName) && message.author.username === 'PoGoPolyBot' ){
		//console.log( message );
		message.delete();
	}
	
	if( message.author.username == 'GymHuntrBot' ){
		if( message.embeds.length > 0 && message.embeds[0].url && ghbLevelPattern.test(message.embeds[0].title)){
			let coordinates = message.embeds[0].url;
			coordinates = coordinates.replace( 'https://GymHuntr.com/#', '');
			let reverseGeocodeParams = {
				  "latlng":        coordinates,
				  "result_type":   "locality",
				  "language":      "en",
				  "location_type": "APPROXIMATE"
				};
			gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
				//console.log(result.results[0].address_components[0].short_name);
				let cityChannelName = result.results[0].address_components[0].short_name.toLowerCase().replace( ' ', '_' );
				//console.log(message.embeds);
				let content = message.embeds[0].description.split('\n'),
					raidBoss = content[1],
					raidBossImg = message.embeds[0].thumbnail.url,
					ssTakenDate = new Date(message.createdTimestamp),
					gymResults = content[0],
					timerResults = content[3].replace( '*Raid Ending: ', '').replace(' hours ', ':').replace(' min ', ':').replace(' sec*', ''),//*Raid Ending: 1 hours 35 min 34 sec*
					endedTime = '',
					timerArr = {};
				console.log(content);
				if( cityChannelName === 'fort_lauderdale' ){
					cityChannelName = 'ft_lauderdale';			
				}
				if (timerResults !== '') {
					timerArr = timerResults.split(':');
					endedTime = moment(ssTakenDate).add({ hours: timerArr[0], minutes: timerArr[1], seconds: timerArr[2] }).tz('America/New_York').format("h:mm:ss A");
				}
				if( raidBoss ){
					let roleToMention = message.guild.roles.find('name', cityChannelName),
						raidBossMention = message.guild.roles.find('name', raidBoss),
						cityChannel = '';
					roleToMention = (roleToMention) ? '<@&' + roleToMention.id + '>' : '';
					raidBossMention = (raidBossMention) ? '<@&' + raidBossMention.id + '>' : '';
					cityChannel = message.guild.channels.find('name', cityChannelName);
					if ( cityChannel ) {
						cityChannel.send(`${roleToMention} Gymhuntr has found a ${raidBossMention} Raid`, {
							"embed": {
								"color": 3447003,
								"title": 'Raid Posted!',
								"thumbnail": {
									"url": raidBossImg,
								},
								"fields": [{
									"name": "Gym",
									"value": gymResults,
									"inline": true
								}, {
									"name": "Timer",
									"value": timerResults,
									"inline": true
								}, {
									"name": "Ends At",
									"value": endedTime,
									"inline": true
								}]
							}
						} ).then(message => {
							message.pin();
						});
					}
				}
				
			});
		}
	}
	
	if (message.author.bot) return;
	
	if( message.isMentioned(message.guild.members.get("339590026973282304")) ){
	   let response = '';
	   if( helloPattern.test(message.content) ){
			response = `Hi! ${message.author} if you are having trouble try using the \`.help\` command or contacting an admin while I learn how to do more helpful things.`;
		}else if( holaPattern.test(message.content) ){
			response = `Hola ${message.author} un gusto ayudarte, si estas teniendo algun problema usa el \`.help\` command o contacta a un admin mientras yo aprendo como hacer mas cosas para ayudarte.`;
		}else if( thanksPattern.test(message.content) ){
			response = `You're Welcome! ${message.author} glad to help, if you are having trouble try using the \`.help\` command or contacting an admin while I learn how to do more helpful things.`;
		}else if( graciasPattern.test(message.content) ){
			response = `De nada! ${message.author} un gusto ayudarte, si estas teniendo algun problema usa el \`.help\` command o contacta a un admin mientras yo aprendo como hacer mas cosas para ayudarte.`;
		}else{
			response = `Wattup? ${message.author} if you are having trouble try using the \`.help\` command or contacting an admin while I learn how to do more helpful things.`;
		}
	
		if( response ){
			message.channel.send(response);
		}
	}
	
	/*
	 * CALLME
	 */
	if (message.content.startsWith(prefix + "callme")) {
		let pattern = prefix + "callme";
		let nickname = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim();
		message.guild.member(message.author).setNickname(nickname).then((member) =>{
			message.channel.send(`${message.author} from now on we will call you ${nickname}`);
		}).catch((error)=>{
			if(error){
					console.log(error);
			}
			message.channel.send(`${message.author} uh oh! something went wrong i couldn't change your nickname plase try again!`);
		});
		
	}
	
	/*
	 * HELP
	 */
	if (message.content.startsWith(prefix + "help")) {
		let pattern = prefix + "help",
			helpType = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().toLocaleLowerCase(),
			channelVal = '\n\n__**Channels**__\n\n**#general** this is for general talk. No raid coordination allowed. \n**#announcements** this is were we let you know the news about the game and our server. \n**#commands** this is were you have the freedom to use all commands in our server. \n**#city_maps** this is where you can find information about city bounds and some useful addresses \n**#nest** this is where you\'ll find people posting about nests. \n**#rare_pokemon_sightings** this is where you\'ll find people posting about rare sightings \n**#gallery** this is where people showcase images taken in the field. \nAfter this you\'ll find all the city channels where Raids are coordinated. \n',
			commandVal = '\n\n__**Commands**__\n\n**.address** this command retrieves the top result from GMaps. usage: `.address mullins park coral springs`\n**.callme** this command changes your nickname on our server. usage: `.callme PoGoPolyBot there\'s no one better there\'s no one greater`\n**.help** this is commandseption.\n**.iam** this command adds roles to your profile, to know what roles you can add use `.help roles`, usage: `.iam mystic` or `.iam mystic,coral springs`.\n**.iamnot** this command removes roles from your profile, to know what roles you can remove use `.help roles`, usage: `.iamnot mystic` or `.iamnot mystic,coral springs`.\n**.invite** this command creates an invite you can send your friends. \n**.pokedex** this command retrieves a pokemon entry from the pokedex. usage: `.pokedex bulbasaur`',
			rolesVal = '\n\n__**Roles**__\n\n**Team Roles**\nthis roles change the color of your nickname to your team\'s color.\n\nMystic Raidrz\nValor Raidrz\nInstinct Raidrz\n\n**TIP:** you can enter just the team name the bot will recognize the appripiate role.\n\n**City Roles**\nthis roles send you a notification when the bot recognizes a raid image posted in a city you want to raid in.\n\nboca\ncoral_springs\ncoconut_creek\ndavie\ndeerfield\nft_lauderdale\nhollywood\nmargate\nnorth_lauderdale\nparkland\npompano\nplantation\nsunrise\ntamarac\n\n**TIP:** you can enter the city roles without the underscore and in lower or uppercase just keep in mind the name needs to be exact so `ft lauderdale` will work `fort lauderdale` won\'t,',
			raidsVal = '\n\n__**Raids**__\n\nBased on our current field research Raids start at 6AM and end at 8PM, you may find active raids after 8PM, but no new ones will popup after 8PM',
			helpContent = '',
			helpTypeMessage = 'everything';
		switch(helpType){
			case 'channels':
				helpContent = channelVal;
				helpTypeMessage = helpType;
				break;
			case 'commands':
				helpContent = commandVal;
				helpTypeMessage = helpType;
				break;
			case 'roles':
				helpContent = rolesVal;
				helpTypeMessage = helpType;
				break;
			case 'raids':
				helpContent = raidsVal;
				helpTypeMessage = helpType;
				break;
		}
		if( helpType != '' ){
			message.channel.send(`${message.author} Looks like you need help with ${helpTypeMessage}. here is some helpful information.${helpContent}`);
		}else{
			message.channel.send(`${message.author} it's ok. I am here to help i just need you to be more specific. What do you need help with? type \`.help commands\` for help with commands or \`.help channels\` for help with channels or \`.help roles\` for help with roles or \`.help raids\` for help with raids`);
		}
		
	}
	/*
	 * USERINFO Command 341205742868496385
	 */
	if (message.content.startsWith(prefix + "userinfo")) {
		let pattern = prefix + "userinfo";
		let userID = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim();
		if( channelName == 'roundtable' && userID ){
			message.guild.fetchMember(userID, false)
			.then((member)=>{
				//console.log(member);
				//console.log(member.user);
				let userMeta = message.guild.members.get(userID);
				//console.log(userMeta);
				message.channel.send(`${message.author} here is the user info you are looking for`, {
					"embed": {
						"color": 3447003,
						"title": member.displayName + '('+ member.nickname +')',
						"thumbnail": {
							"url": member.user.avatarURL
						},
						"fields": [{
							"name": "Created At",
							"value": member.joinedAt,
							"inline": true
						}]
					}
				});
			})
			.catch((error)=>{
				if(error){
					console.log(error);
				}
			});
			
		}
	}
	
	/*
	 *  IAM - IAMNOT Command
	 */
	if (message.content.startsWith(prefix + "iamnot")) {
		let pattern = prefix + "iamnot";
		let roles = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().split(",");
		let rolesFound = [];
		let rolesFoundNames = [];
		roles.forEach(function (item, index) {
			let theRole = item.trim();
			//if( teamPattern.test(theRole) ){
			//	theRole = item.replace(/[_-]/g, ' ').replace(raidrzPattern, 'raidrz').trim().replace(/\b\w/g, l => l.toUpperCase());
			//}else{
				theRole = cap(item.toLowerCase().replace(' ', '_').trim());
			//}
			let role = ( typeof message.guild.roles !== 'undefined' ) ? message.guild.roles.find("name", theRole) : 'undefined';
			let isAdmin = adminPattern.test(theRole);
			if (role !== null && role !== 'undefined' && isAdmin === false) {
				rolesFound.push(role);
				rolesFoundNames.push(theRole);
			}
		});
		message.member.removeRoles(rolesFound).then(member => {
			let rolesAdded = rolesFoundNames.join();
			if (rolesAdded.length > 0) {
				message.channel.send(`${message.author} I removed this role(s) for you ${rolesAdded}`);
			} else {
				message.channel.send(`${message.author} I could't remove any role(s) for you, either you've already remove it or you enter the wrong role name.`);
			}
		}).catch(error => {
			if (error) {
				message.channel.send(`${message.author} oops I'm having hiccups please try again in a few seconds.`);
			}
		});
	} else if (message.content.startsWith(prefix + "iam")) {
		let pattern = prefix + "iam";
		let roles = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().split(",");
		let rolesFound = [];
		let rolesFoundNames = [];
		roles.forEach(function (item, index) {
			let theRole = item.trim();
			//if( teamPattern.test(theRole) || raidrzPattern.test(theRole) ){
			//	theRole = item.replace(/[_-]/g, ' ').replace(raidrzPattern, 'raidrz').trim().replace(/\b\w/g, l => l.toUpperCase());
			//}else{
				theRole = cap(item.toLowerCase().replace(' ', '_').trim());
				
				
			//}
			/*if (teamPattern.test(theRole) && raidrzPattern.test(theRole) === false) {
				theRole = theRole + " Raidrz";
			}*/
			let role = ( typeof message.guild.roles !== 'undefined' ) ? message.guild.roles.find("name", theRole) : 'undefined';
			let isAdmin = adminPattern.test(theRole);
			if (role !== null && role !== 'undefined' && isAdmin === false) {
				rolesFound.push(role);
				rolesFoundNames.push(theRole);
			}
		});
		message.member.addRoles(rolesFound).then(member => {
			let rolesAdded = rolesFoundNames.join();
			if (rolesAdded.length > 0) {
				message.channel.send(`${message.author} I added this role(s) for you ${rolesAdded}`);
			} else {
				message.channel.send(`${message.author} I could't add any role(s) for you, either you are already part of them or you enter the wrong role name.`);
			}
		}).catch(error => {
			if (error) {
				message.channel.send(`${message.author} oops I'm having hiccups please try again in a few seconds.`);
			}
		});
	}
	/*
	 *  CHECK SCREENSHOT
	 */


	/*
	 * INVITE COMMAND
	 */
	if (message.content.startsWith(prefix + "invite")) {
		var inviteOptions = {
			temporary: true,
			maxAge: 86400,
			maxUses: 0
		};
		message.channel.createInvite(inviteOptions)
			.then((invite) => {
				message.channel.send(`${message.author} i have created an invite link to share with new friends here you go: ${invite.url}`);
			})
			.catch((err) => {
				console.log(err);
				message.channel.send(`Oh no! ${message.author} something went wrong. Sorry i couldn't get you an invite link, please try again later.`);
			});
	}

	/*
	 * POKEDEX COMMAND
	 */
	if (message.content.startsWith(prefix + "pokedex")) {
		var pattern = prefix + "pokedex";
		var query = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().toLowerCase();
		var pokemon = pokedex(query);
		var typeValue = '';
		var weaknessValue = '';
		var quickMoves = '';
		var chargedMoves = '';
		var statsValue = '';
		
		//console.log( pokemon );
		if (typeof pokemon === 'undefined' || pokemon === null ) {
			message.channel.send(`${message.author} I couldn't find a pokedex entry for ${query}`);
		} else {
			function getEmoji(name) {
				var emojiId = '';
				message.guild.emojis.forEach(function (item, index) {
					if (item.name === name) {
						emojiId = item.id;
					}
				});

				return emojiId;
			}

			pokemon.type.forEach(function (item, index) {
				var emojiId = getEmoji('type' + item);
				//console.log(emojiId);
				typeValue += '<:type' + item + ':' + emojiId + '> ';
			});
			Object.keys(pokemon.weaknesses).forEach(function (key) {
				var itemValue = key.toLocaleLowerCase();
				var amount = pokemon.weaknesses[key];
				var emojiId = getEmoji('type' + itemValue);
				//console.log(emojiId);
				weaknessValue += '<:type' + itemValue + ':' + emojiId + '> (' + amount + ')';
			});
			Object.keys(pokemon.chargeMoves).forEach(function (key) {
				chargedMoves += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ": Attack - " + pokemon.chargeMoves[key].power;
				if (pokemon.chargeMoves[key].dps !== null && typeof pokemon.chargeMoves[key].dps !== 'undefined') {
					chargedMoves += " | DPS " + pokemon.chargeMoves[key].dps + "\n";
				} else {
					chargedMoves += "\n";
				}
			});

			Object.keys(pokemon.quickMoves).forEach(function (key) {
				quickMoves += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ": Attack - " + pokemon.quickMoves[key].power;
				if (pokemon.quickMoves[key].dps !== null && typeof pokemon.quickMoves[key].dps !== 'undefined') {
					quickMoves += " | DPS " + pokemon.quickMoves[key].dps + "\n";
				} else {
					quickMoves += "\n";
				}
			});

			Object.keys(pokemon.stats).forEach(function (key) {
				statsValue += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ": " + pokemon.stats[key] + "\n";
			});
			message.channel.send(`${message.author} here is your pokedex result for ${query}`, {
				"embed": {
					"color": 3447003,
					"title": `**${pokemon.id}** ` + pokemon.name,
					"thumbnail": {
						"url": pokemon.img
					},
					"fields": [{
						"name": "Type(s)",
						"value": typeValue,
						"inline": true
					}, {
						"name": "Weaknesse(s)",
						"value": weaknessValue,
						"inline": true
					}, {
						"name": "Stats",
						"value": statsValue,
						"inline": true
					}, {
						"name": "MaxCP",
						"value": pokemon.maxCP,
						"inline": true
					}, {
						"name": "Charged Move(s)",
						"value": chargedMoves,
						"inline": true
					}, {
						"name": "Quick Move(s)",
						"value": quickMoves,
						"inline": true
					}]
				}
			});
		}
	}
	/*
	 * ADDRESS COMMAND
	 */
	if (message.content.startsWith(prefix + "address")) {
		let pattern = prefix + "address";
		let query = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim();
		if( !(/broward/i).test(query) ){
			query = query + " Broward";
		}
		if( !(/fl|florida/i).test(query) ){
			query = query + ", Florida";	
		}
		//console.log(query);
		let placeSearchTextParams = {
			"query": query,
			"location": '26.272368, -80.250188',
			"radius": '9.656064003688153'
		};
		gmAPI.placeSearchText(placeSearchTextParams, function (err, result) {
			if (result.results[0] && err === null) {
				let mapUrl = encodeURI('https://www.google.com/maps/place/' + result.results[0].formatted_address);
				if (result.results[0].name) {
					let mapImageParams = {
						"center": result.results[0].formatted_address,
						"zoom": 15,
						"size": '500x300',
						"maptype": 'roadmap',
						"markers": [{
							"location": result.results[0].formatted_address,
							"label": result.results[0].name,
							"color": 'red',
							"shadow": true
						}],
						"style": [{
							"feature": 'road',
							"element": 'all',
							"rules": {
								"hue": '0x00ff00'
							}
						}]
					};
					let mapImage = gmAPI.staticMap(mapImageParams);
					message.channel.send(`${message.author} here is your address ${result.results[0].formatted_address}`, {
						"embed": {
							"color": 3447003,
							"title": result.results[0].name,
							"url": mapUrl,
							"description": "click on the title to go to google maps.",
							"image": {
								"url": mapImage
							},
						}
					});
				} else {
					let mapImageParams = {
						"center": result.results[0].formatted_address,
						"zoom": 15,
						"size": '500x300',
						"maptype": 'roadmap',
						"markers": [{
							"location": result.results[0].formatted_address,
							"label": result.results[0].formatted_address,
							"color": 'red',
							"shadow": true
						}],
						"style": [{
							"feature": 'road',
							"element": 'all',
							"rules": {
								"hue": '0x00ff00'
							}
						}]
					};
					let mapImage = gmAPI.staticMap(mapImageParams);
					message.channel.send(`${message.author} here is your address ${result.results[0].formatted_address}`, {
						"embed": {
							"color": 3447003,
							"title": query,
							"url": mapUrl,
							"description": "click on the title to go to google maps.",
							"image": {
								"url": mapImage
							},
						}
					});
				}


			} else {
				message.channel.send(`${message.author} couldn't find what you where looking for`);
			}
		});
	}
	
	if ( message.attachments.keyArray().length >= 1 && cityPattern.test(channelName) && ( ( currentTime.hour() <= 21 && currentTime.hour() >= 6 ) ) ) {//&& ( ( currentTime.hour() <= 21 && currentTime.hour() >= 6 ) || (typeof message.guild !== 'undefined' && typeof message.guild.name !== 'undefined' && message.guild.name === 'square bot test') ) )

		message.attachments.forEach(function (item, index) {
			//console.log(item);
			let attachment = [item.url];
			let img = item.url;
			//console.log( img );
			let gymResults = '',
				timerResults = '',
				androidTimeResults = '',
				//levelResults = '',
				nameResults = '';
			//cpResults = '';

			request.get(img, function (err, res, body) {
				if (err !== null) {
					console.log(err);
				}
				Exif(body, (error, metaData) => {
					if (error) {
						//console.log(error);
					}
					let endedTime = '',
						timerDate = '';
					let currentDate = Moment().tz('America/New_York').format();
					let ssTakenDate = '';
					if( typeof metaData !== 'undefined' && typeof metaData.DateCreated !== 'undefined' ){
						let ssTakenArray = metaData.DateCreated.replace(" ", ":").split(":");
						ssTakenDate = ssTakenArray[0] + '-' + ssTakenArray[1] + '-' + ssTakenArray[2] + ' ' + ssTakenArray[3] + ':' + ssTakenArray[4] + ':' + ssTakenArray[5] + '-04:00';
						ssTakenDate = Moment( new Date(ssTakenDate) ).tz('America/New_York').format(); //"2017-08-05 23:27:00-04:00"
					}
					
					//let howLong = DateTime.isoTimeDiff(currentDate, ssTakenDate);
					//console.log(ssTakenDate);
					Jimp.read(img)
						.then(function (image) {
							image.resize(750, Jimp.AUTO);
							let gymImage = image.clone(),
								timerImage = image.clone(),
								androidTimeImage = image.clone(),
								//levelImage = image.clone(),

								nameImage = image.clone(),
								//cpImage = image.clone(),
								imgWidth = image.bitmap.width,
								imgHeight = image.bitmap.height,
								gymHcrop = 1275,
								gymW = 150,
                        		gymH = 80,
								nameHcrop = 1220,
								nameW = 0,
								nameH = 315,
								timerHcrop = 1280,
								timerW = 565,
								timerH = 790,
								cpHcrop = 1220;
							
							if( imgHeight < 1331 ){
								gymHcrop =  1200;
								timerHcrop = 1215;
								timerH = 750;
								timerW = 550;
								nameHcrop = 1150;
								nameW = 0;
								nameH = 300;
								cpHcrop = 1180;
							}else if( imgHeight >= 1542){
							    gymHcrop =  1450;
							    gymH = 150;
							    timerHcrop = 1490;
							    timerH = 870;
							    nameHcrop = 1440;
							    nameH = 400;
							}
							// do stuff with the image 
							if( imgHeight > 1000 ){
							gymImage.crop(gymW, gymH, (imgWidth - 140), (imgHeight - gymHcrop))
								.quality(100)
								.invert()
								.greyscale()
								.contrast(-0.46)
								.normalize() //.write( './tmp/edited.png')
								.getBuffer(gymImage.getMIME(), function (err, buffer) {
									if (err) {
										console.log(err);
									}
									textract.fromBufferWithMime(gymImage.getMIME(), buffer, function (error, text) {
										if (err) {
											console.log(err);
										}
										gymResults = text;

										timerImage.crop(timerW, timerH, (imgWidth - 620), (imgHeight - timerHcrop))
											.quality(100)
											.invert()
											.greyscale()
											.contrast(-0.46)
											.normalize() //.write( './tmp/edited1.png')
											.getBuffer(timerImage.getMIME(), function (err, buffer) {
												if (err) {
													console.log(err);
												}
												textract.fromBufferWithMime(timerImage.getMIME(), buffer, function (error, text) {
													if (err) {
														console.log(err);
													}
													timerResults = text;

													nameImage.crop(nameW, nameH, (imgWidth), (imgHeight - nameHcrop))
														.quality(100)
														.invert()
														.greyscale()
														.contrast(-0.46)
														.normalize() //.write( './tmp/edited1.png')
														.getBuffer(nameImage.getMIME(), function (err, buffer) {
															if (err) {
																console.log(err);
															}
															textract.fromBufferWithMime(nameImage.getMIME(), buffer, function (error, text) {
																if (err) {
																	console.log(err);
																}
																nameResults = text;
																if( ssTakenDate == '' ){
																	androidTimer( message, nameResults, gymResults, timerResults, androidTimeResults, ssTakenDate, channelName, attachment, img, androidTimeImage, 150 , imgWidth, imgHeight );
																}else{
																	sendRaidMessage( message, nameResults, gymResults, timerResults, '', ssTakenDate, channelName, attachment, img );
																}
															});
														}); // save
												});
											});
									}); // save
								});
							}
						}).catch(function (err) {
							// handle an exception 
							if (err) {
								console.log(err);
							}
						});
				});
			});
		});
	}
	
	if (typeof message.guild !== 'undefined' && typeof message.guild.name !== 'undefined' && message.guild.name === 'square bot test') {
		//client.emit("guildMemberAdd", message.guild.members.get("297918949214126081"));339590026973282304 
		//var channelRole = message.channel.server.roles.get('name', channelName);       339590026973282304
		//let role = member.guild.roles.find("name", 'Raidrz');
		//member.addRole(role).catch(console.error);
		
		//message.pin();
	}
});

function androidTimer( message, nameResults, gymResults, timerResults, androidTimeResults, ssTakenDate, channelName, attachment, img, androidTimeImage, androidTimeW, imgWidth, imgHeight ){
    var androidTimerClone = androidTimeImage.clone();
    
	androidTimerClone.crop((imgWidth - androidTimeW) , 0, androidTimeW , (imgHeight - ( imgHeight - 50)))
		.quality(100)
		.invert()
		.greyscale()
		.contrast(-0.46)
		.normalize() //.write( './tmp/edited1.png')
		.getBuffer(androidTimerClone.getMIME(), function (err, buffer) {
			if (err) {
				console.log(err);
			}
			textract.fromBufferWithMime(androidTimerClone.getMIME(), buffer, function (error, text) {
				if (err) {
					console.log(err);
				}
				androidTimeResults = text.match(/((([0-9]?)[0-9]):[0-9][0-9](\s?)((pm|am)?))/i);
				//console.log(text);
				if( androidTimeResults && androidTimeResults.length >= 0 ){
					androidTimeResults = androidTimeResults[0].trim();
					sendRaidMessage( message, nameResults, gymResults, timerResults, androidTimeResults, ssTakenDate, channelName, attachment, img );
				}else if( androidTimeW >= 80){
					androidTimer( message, nameResults, gymResults, timerResults, androidTimeResults, ssTakenDate, channelName, attachment, img, androidTimeImage, androidTimeW - 22 , imgWidth, imgHeight );
				}else{
					androidTimeResults = '';
					sendRaidMessage( message, nameResults, gymResults, timerResults, androidTimeResults, ssTakenDate, channelName, attachment, img );
				}
			});
	});
}

function sendRaidMessage( message, nameResults, gymResults, timerResults, androidTimeResults, ssTakenDate, channelName, attachment, img ){
	let found = 0,
		raidBoss = '',
		raidBossImg = '',
		timerArr = {};

	nameResults = nameResults.toLowerCase();
	Object.keys(raidBosses).forEach(function (key) {
		
		var pattern = new RegExp(key, "i");
		
		if (nameResults.match(pattern) !== null) {
			raidBoss = key;
			raidBossImg = raidBosses[key].image;
		}
	});
	
	gymResults = gymResults.toLowerCase().trim().replace('/^.[\\,\.\/<>\?;:\'\"\[\]!@#\$%\^&\*()\-_=\+`~\|]/', '').trim();
	
	let raidImage = img;
	if (raidBoss !== '') {
		found++;
	} else {
		raidBossImg = raidImage;
		raidBoss = '';
	}
	if (gymResults !== '') {
		found++;
	} else {
		gymResults = 'Please tab on thumbnail';
	}
	if (timerResults !== '') {
		found++;
		timerArr = timerResults.split(':');
		//console.log(timerResults);
		//console.log(timerArr);
		//console.log(ssTakenDate);
		//console.log(androidTimeResults);
		if( androidTimeResults != '' ){
			let currentDateString = Moment().tz('America/New_York').format( 'YYYY-MM-DD') + ' ' + androidTimeResults;
			ssTakenDate = moment( new Date( currentDateString ) );
			console.log(androidTimeResults);
			//console.log(ssTakenDate);
			endedTime = ssTakenDate.add({ hours: timerArr[0], minutes: timerArr[1], seconds: timerArr[2] }).format("h:mm:ss A");
		}else{
			endedTime = moment(ssTakenDate).add({ hours: timerArr[0], minutes: timerArr[1], seconds: timerArr[2] }).tz('America/New_York').format("h:mm:ss A");
		}
	} else {
		timerResults = 'Please tab on thumbnail';
	}
	/*if (cpResults !== '') {
		found++;
	} else {
		cpResults = 'Please tab on thumbnail';
	}*/
	let roleToMention = message.guild.roles.find('name', channelName);
	roleToMention = (roleToMention) ? '<@&' + roleToMention.id + '>' : '';
	let raidBossMention = message.guild.roles.find('name', raidBoss);
	raidBossMention = (raidBossMention) ? '<@&' + raidBossMention.id + '>' : '';
	if ( timerResults !== '' && timerArr.length == 3 && endedTime !== 'Invalid date' ) {
		let oldMessage = message;
		message.channel.send(`${roleToMention} there is a ${raidBossMention} Raid`, {
			"embed": {
				"color": 3447003,
				"title": 'Raid Posted!',
				"thumbnail": {
					"url": raidBossImg,
				},
				"fields": [{
					"name": "Gym",
					"value": gymResults,
					"inline": true
				}, {
					"name": "Timer",
					"value": timerResults,
					"inline": true
				}, {
					"name": "Ends At",
					"value": endedTime,
					"inline": true
				}]
			},
			"files": attachment,
		}).then(message => {
			oldMessage.delete();
			message.pin();
		});

	}
}