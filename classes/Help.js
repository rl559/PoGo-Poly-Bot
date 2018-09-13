module.exports = class Help
{
  display(prefix, message)
  {
    let pattern = prefix + "help",
			helpType = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().toLocaleLowerCase(),
			channelVal = '\n\n__**Channels**__\n\n**#general** this is for general talk. No raid coordination allowed. \n**#announcements** this is were we let you know the news about the game and our server. \n**#info** this contains general useful info for Poly PoGo players. \n**#rules** you can brush up on server ettiquette here. \n**#raids** this is used for communicating about and preparing for raids. \n**#sightings** this is where you\'ll find people posting about rare sightings \n**#commands** this is were all bot commands are freely allowed.',
			commandVal = '\n\n__**Commands**__\n\n**.address** this command retrieves the top result from GMaps. usage: `.address mullins park coral springs`\n**.callme** this command changes your nickname on our server. usage: `.callme PoGoPolyBot`\n**.help** this is how you got here!\n**.tadd** this allows you to receive @ notifications from specific tiers of raids, or all tiers with .tadd all. usage: `.tadd T5` or `.tadd all` \n**.tdel** this removes you from receiving tier raid notifications. usage: `.tdel T5` or `.tdel all`\n**.newson, .newsoff** toggles twitter news notifications on and off\n**.invite** this command creates an invite you can send your friends. \n**.rraid** this command notifies users of an available raid tier, and starts a raid timer poll.  usage: `.rraid PokeName MinsRemaining`\n**.field** this command allows you to update the field research tasks. usage: `.field date - stopname - challenge - reward`\n**.rsummary** this command displays a summary of the most recent field research updates for all stops. usage: `.rsummary`\n**.pokedex** this command retrieves a pokemon entry from the pokedex. usage: `.pokedex bulbasaur`\n**.userinfo** this command retrieves user info on a queried user.  usage: `.userinfo @username`',
			raidsVal = '\n\n__**Raids**__\n\nBased on our current field research Raids start at 6AM and end at 8PM, you may find active raids after 8PM, but no new ones will popup after 8PM. \n**.egg** this command creates a new channel for a raid. usage: `.egg eggLevel HatchTime`\n**.raidMon** this command renames the channel to the pokemon after it hatches. It should only be called by the person who created the room with .egg usage: `.raidMon Pokemon`\n**.coming** this command marks you as coming to the raid. Use this if you want to participate in the raid. usage: `.coming`\n**.here** this command marks you as here at the raid. Use this if you are at the gym waiting for the raid to start. usage: `.here`\n**.cancel** this command removes you from the list of people coming or here. Use this command if you no longer want to do the raid. usage: `.cancel`\n**.list** this command prints how many of each team will be at the raid, the current start time, and the list of players coming and here. usage: `.list`\n**.newGroup** this command creates a new group if there will be more than one at the raid. Only use this command after the other group has started their raid. usage: `.newGroup`\n**.setStartTime** this command will set the start time for the raid group. usage: `.setStartTime time`\n**.getStartTime** this command displays the current set start time. usage: `.getStartTime`\n**.endRaid** this command closes the raid room. Use this command if there are no other groups attempting the raid and it will close the channel. This should only be used by the person who created the room with .egg usage: `.endRaid`',
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
			case 'raids':
				helpContent = raidsVal;
				helpTypeMessage = helpType;
				break;
		}
		if( helpType != '' && helpTypeMessage !== 'everything' ){
			message.channel.send(`${message.author} Looks like you need help with ${helpTypeMessage}. Here is some helpful information.${helpContent}`);
		}
		else if (helpTypeMessage === 'everything')
		{
			message.channel.send(`${message.author} Looks like you need help with the help command. Type \`.help commands\` for help with commands or \`.help channels\` for help with channels or \`.help raids\` for help with raids.`);
		}
		else{
			message.channel.send(`${message.author} it's ok. I am here to help. I just need you to be more specific. What do you need help with? Type \`.help commands\` for help with commands or \`.help channels\` for help with channels or \`.help raids\` for help with raids.`);
		}
  }
}
