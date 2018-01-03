module.exports = class News
{
  newson(prefix, message)
  {
    let news = message.guild.roles.find("name", "news");
    message.member.addRole(news).then(member => {
        message.channel.send(`${message.author} you are now receiving news notifications.`);
    }).catch(error => {
      if (error) {
        message.channel.send(`${message.author} oops I'm having hiccups please try again in a few seconds.`);
      }
    });
  }
  newsoff(prefix, message)
  {
    let news = message.guild.roles.find("name", "news");
    message.member.removeRole(news).then(member => {
        message.channel.send(`${message.author} you are no longer receiving news notifications.`);
    }).catch(error => {
      if (error) {
        message.channel.send(`${message.author} oops I'm having hiccups please try again in a few seconds.`);
      }
    });
  }
}