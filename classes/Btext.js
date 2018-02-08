module.exports = class GymNotice
{
  process(message, prefix)
  {
    var msgText = message.content.replace(".b ", "");
    console.log(msgText);
  }
}