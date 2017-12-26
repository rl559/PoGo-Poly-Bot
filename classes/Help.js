module.exports = class Help
{
  display(prefix, message)
  {
    let pattern = prefix + "help",
			helpType = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().toLocaleLowerCase(),
			channelVal = '\n\n__**Channels**__\n\n**#general** this is for general talk. No raid coordination allowed. \n**#announcements** this is were we let you know the news about the game and our server. \n**#info** this contains general useful info for Poly PoGo players. \n**#rules** you can brush up on server ettiquette here. \n**#raids** this is used for communicating about and preparing for raids. \n**#sightings** this is where you\'ll find people posting about rare sightings \n**#commands** this is were all bot commands are freely allowed.',
			commandVal = '\n\n__**Commands**__\n\n**.address** this command retrieves the top result from GMaps. usage: `.address mullins park coral springs`\n**.callme** this command changes your nickname on our server. usage: `.callme PoGoPolyBot`\n**.help** this is how you got here!\n**.tadd** this allows you to receive @ notifications from specific tiers of raids. usage: `.tadd T5` \n**.tdel** this removes you from receiving tier raid notifications. usage: `.tdel T5`\n**.invite** this command creates an invite you can send your friends. \n**.rraid** this command notifies users of an available raid tier, and starts a raid timer poll.  usage: `.rraid PokeName MinsRemaining`\n**.pokedex** this command retrieves a pokemon entry from the pokedex. usage: `.pokedex bulbasaur`\n**.userinfo** this command retrieves user info on a queried user.  usage: `.userinfo @username`',
			raidsVal = '\n\n__**Raids**__\n\nBased on our current field research Raids start at 6AM and end at 8PM, you may find active raids after 8PM, but no new ones will popup after 8PM.  You may report raids after the Pokemon hatches using .rraid PokeName MinsRemaining  This will notify anyone who opted in with .tadd and start a poll based on time remaining.',
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