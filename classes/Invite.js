module.exports = class Invite
{
genInvite(message)
{
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
}