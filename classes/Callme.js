module.exports = class Callme
{
  display(prefix, message)
  {
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
}