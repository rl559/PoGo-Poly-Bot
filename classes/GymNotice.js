const raid1Pattern = new RegExp(/L1|level 1|L1|T1|tier 1|Tier 1/i),
raid2Pattern = new RegExp(/L2|level 2|L2|tier 2|Tier 2|T2/i),
raid3Pattern = new RegExp(/L3|level 3|L3|tier 3|Tier 3|T3/i),
raid4Pattern = new RegExp(/L4|level 4|L4|tier 4|Tier 4|T4/i),
raid5Pattern = new RegExp(/L5|level 5|L5|tier 5|Tier 5|T5/i),
Moment = require('moment-timezone'),
moment = require('moment');
pokedex = require('../pokedex.js');

let endTime;

function getEmoji(name, message) {
  var emojiId = '';
  message.guild.emojis.forEach(function (item, index) {
    if (item.name === name) {
      emojiId = item.id;
    }
  });

  return emojiId;
}

module.exports = class GymNotice
{
  
  display(message, GMapsObj)
  {
    
  		//if( message.embeds.length > 0 && message.embeds[0].url && ghbLevelPattern.test(message.embeds[0].title)){
  			let raidLevel = '';
  			if(raid1Pattern.test(message.embeds[0].title)) raidLevel = 'T1';
  			if(raid2Pattern.test(message.embeds[0].title)) raidLevel = 'T2';
  			if(raid3Pattern.test(message.embeds[0].title)) raidLevel = 'T3';
  			if(raid4Pattern.test(message.embeds[0].title)) raidLevel = 'T4';
  			if(raid5Pattern.test(message.embeds[0].title)) raidLevel = 'T5';
  			let coordinates = message.embeds[0].url;
  			coordinates = coordinates.replace( 'https://GymHuntr.com/#', '');

  			let cityChannelName = GMapsObj.getCityChannelName(coordinates);
  			if( cityChannelName === 'fort_lauderdale' ){
  				cityChannelName = 'ft_lauderdale';			
  			}
  				let descSplit = message.embeds[0].description.split('\n');
          console.log(descSplit);
  				let content;
  				
  				if(descSplit.length == 4)
  				{
  				content = {'desc': descSplit,
  					'raidBoss': descSplit[1],
  					'raidBossLvl': raidLevel,
  					'raidBossImg': message.embeds[0].thumbnail.url,
  					'ssTakenDate': new Date(message.createdTimestamp),
  					'gymResults': descSplit[0],
  					'timerResults': descSplit[3].replace( '*Raid Ending: ', '').replace(' hours ', ':').replace(' min ', ':').replace(' sec*', ''),//*Raid Ending: 1 hours 35 min 34 sec*
  					'endedTime': '',
  					'timerArr': {}};
  				}
  				console.log(content);
  				if (content && content.timerResults && content.timerResults !== '') {
  					content.timerArr = content.timerResults.split(':');
            endTime = moment(content.ssTakenDate).add({ hours: content.timerArr[0], minutes: content.timerArr[1], seconds: content.timerArr[2] }).tz('America/New_York');
  					content.endedTime = endTime.format("h:mm:ss A");
  				}
  				if( content && content.raidBoss ){
  						let raidBossMention = message.guild.roles.find('name', raidLevel),
  						raidChannel = '';
  					raidBossMention = (raidBossMention) ? '<@&' + raidBossMention.id + '>' : '';
  					raidChannel = message.guild.channels.find('name', 'raids');
  					if ( raidChannel ) {
              var weaknesses = Object.keys(pokedex(content.raidBoss).weaknesses);
              var resistances = Object.keys(pokedex(content.raidBoss).resistances);
              console.log(weaknesses);
              var weaknessEmojis = "";
              var resistEmojis = "";
              for(var weakness in weaknesses)
              {
                var emojiName = "type"+weaknesses[weakness].toLowerCase();
                weaknessEmojis = weaknessEmojis + "<:type"+emojiName+":"+getEmoji(emojiName, message)+">";
              }
              for(var resist in resistances)
              {
                var emojiName = "type"+resistances[resist].toLowerCase();
                resistEmojis = resistEmojis + "<:type"+emojiName+":"+getEmoji(emojiName, message)+">";
              }
              var stringToSend = '';
              var arr = [];
              if(content.endedTime !== '' && content.endedTime)
              {
                var addOptions = true;
                var optionCount = 0;
                var tempDate = Moment().tz('America/New_York');
                while(addOptions && optionCount <9)
                {
                  tempDate.add(5, 'm');
                  if(tempDate.isBefore(endTime))
                  {
                    arr.push(tempDate.format("hh:mm:ss a"));
                  }
                  else {
                    addOptions = false;
                  }
                  optionCount++;
                }
                var emojis = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣'];
                for(var i=0; i<arr.length; i++)
                {
                  stringToSend = stringToSend +emojis[i]+arr[i]+"\n";
                }
                stringToSend = stringToSend+'😢'+"Unable to attend";
              }
  						raidChannel.send(`A ${raidBossMention} Raid has been found!`, {
  							"embed": {
  								"color": 3447003,
  								"title": 'Raid Posted!',
  								"thumbnail": {
  									"url": content.raidBossImg,
  								},
  								"fields": [{
  									"name": "Gym",
  									"value": content.gymResults,
  									"inline": true
  								}, {
  									"name": "Timer",
  									"value": content.timerResults,
  									"inline": true
  								}, {
  									"name": "Ends At",
  									"value": content.endedTime,
  									"inline": true
  								},{
                    "name": "Weaknesses/Resistances",
                    "value": "W: "+weaknessEmojis+"\nR: "+resistEmojis,
                    "inline": true
                  },
                  {
                    "name": "What time should we raid?",
                    "value": stringToSend,
                    "inline": false
                  }]
  							}
  						} ).then(message => {
  							message.pin();
                if(arr.length>0){
                  message.react('1⃣').then(function (emoji){
                    if(arr.length >1)
                      message.react('2⃣').then(function (emoji){
                        if(arr.length > 2)
                          message.react('3⃣').then(function (emoji){
                            if(arr.length > 3)
                              message.react('4⃣').then(function(emoji){
                                if(arr.length>4)
                                  message.react('5⃣').then(function (emoji){
                                    if(arr.length>5)
                                      message.react('6⃣').then(function (emoji){
                                        if(arr.length>6)
                                          message.react('7⃣').then(function (emoji){
                                            if(arr.length>7)
                                              message.react('8⃣').then(function (emoji){
                                                if(arr.length>8)
                                                  message.react('9⃣');
                                              });
                                          });
                                      });
                                  });
                                });
                              });
                          });
                      });
                  }
                  message.react('😢');
                }
  						});
  					}
            /*if(content.endedTime !== '' && content.endedTime)
            {
              var arr = [];
              var addOptions = true;
              var optionCount = 0;
              var tempDate = Moment().tz('America/New_York');
              while(addOptions && optionCount <9)
              {
                tempDate.add(5, 'm');
                if(tempDate.isBefore(endTime))
                {
                  arr.push(tempDate.format("hh:mm:ss a"));
                }
                else {
                  addOptions = false;
                }
                optionCount++;
              }
              var stringToSend = '/poll "What time should we raid?" ';
              for(var i=0; i<arr.length; i++)
              {
                stringToSend = stringToSend + "\"" +arr[i] + "\" ";
              }
              raidChannel = message.guild.channels.find('name', 'raids');
              var msg = raidChannel.send(stringToSend);
              
              
            }*/
  				}
  		//}
  }
}