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
        var team="";
        if(message.member.roles.find("Instinct")) team="Instinct";
        if(message.member.roles.find("Valor")) team="Valor";
        if(message.member.roles.find("Mystic")) team="Mystic";
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
}