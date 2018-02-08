module.exports = class GymNotice
{
  process(message, prefix)
  {
    var msgText = message.content.substring(".b ");
    console.log(msgText);
  }
}