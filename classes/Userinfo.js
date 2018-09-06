module.exports = class Userinfo
{
  display(prefix, message, channelName)
  {
    message.guild.fetchMembers();
		let pattern = prefix + "userinfo";
		let userID = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim();
		userID = userID.replace(/[!@&\/\\#,+()$~%.'":*?<>{}]/g,'');
		
		if( channelName == 'commands' && userID ){
			message.guild.fetchMember(userID, true)
			.then((member)=>{
        var team="None";
        var level="None";
        if(member.roles.find("name", "Level 1-19")) level ="Level 1-19";
        if(member.roles.find("name", "Level 20-29")) level ="Level 20-29";
        if(member.roles.find("name", "Level 30-34")) level ="Level 30-34";
	if(member.roles.find("name", "Level 35-39")) level ="Level 35-39";
	if(member.roles.find("name", "Level 40")) level = "Level 40";
        if(member.roles.find("name", "Instinct")) team="Instinct";
        if(member.roles.find("name", "Valor")) team="Valor";
        if(member.roles.find("name", "Mystic")) team="Mystic";
				let userMeta = message.guild.members.get(userID);
				message.channel.send(`${message.author} here is the user info you are looking for`, {
					"embed": {
						"color": 3447003,
						"title": member.displayName,
						"thumbnail": {
							"url": member.user.avatarURL
						},
						"fields": [{
							"name": "Created At",
							"value": member.joinedAt.toString(),
							"inline": true
						},
            {
              "name": "Team",
							"value": team,
							"inline": true
            },
            {
              "name": "Level",
							"value": level,
							"inline": true
            }
          ]
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
}
