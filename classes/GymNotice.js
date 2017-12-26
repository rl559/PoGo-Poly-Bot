const raid1Pattern = new RegExp(/L1|level 1|L1|T1|tier 1|Tier 1/i),
raid2Pattern = new RegExp(/L2|level 2|L2|tier 2|Tier 2|T2/i),
raid3Pattern = new RegExp(/L3|level 3|L3|tier 3|Tier 3|T3/i),
raid4Pattern = new RegExp(/L4|level 4|L4|tier 4|Tier 4|T4/i),
raid5Pattern = new RegExp(/L5|level 5|L5|tier 5|Tier 5|T5/i),
ghbLevelPattern = new RegExp(/Level 1|Level 2|Level 3|Level 4|Level 5/i);

module.exports = class GymNotice
{
  display(message, GMapsObj)
  {
    
  		if( message.embeds.length > 0 && message.embeds[0].url && ghbLevelPattern.test(message.embeds[0].title)){
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
  				let content;
  				
  				if(descSplit.length == 4)
  				{
  				content = descSplit,
  					raidBoss = content[1],
  					raidBossLvl = raidLevel;
  					raidBossImg = message.embeds[0].thumbnail.url,
  					ssTakenDate = new Date(message.createdTimestamp),
  					gymResults = content[0],
  					timerResults = content[3].replace( '*Raid Ending: ', '').replace(' hours ', ':').replace(' min ', ':').replace(' sec*', ''),//*Raid Ending: 1 hours 35 min 34 sec*
  					endedTime = '',
  					timerArr = {};
  				}
  				console.log(content);
  				if (timerResults !== '') {
  					timerArr = timerResults.split(':');
  					endedTime = moment(ssTakenDate).add({ hours: timerArr[0], minutes: timerArr[1], seconds: timerArr[2] }).tz('America/New_York').format("h:mm:ss A");
  				}
  				if( raidBoss ){
  						let raidBossMention = message.guild.roles.find('name', raidLevel),
  						raidChannel = '';
  					raidBossMention = (raidBossMention) ? '<@&' + raidBossMention.id + '>' : '';
  					raidChannel = message.guild.channels.find('name', 'raids');
  					if ( raidChannel ) {
  						raidChannel.send(`Gymhuntr has found a ${raidBossMention} Raid`, {
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
  		}
  }
}