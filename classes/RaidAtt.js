/*To do:
* Egg command
* Create channel
* Here commmand
* Coming command
* Cancel command
* Delete channel
* Start time? Should it be based on votes or set by the coordinator?
*/
const timePattern = new RegExp(/^\d?\d$/g);
const Moment = require('moment-timezone'),
    moment = require('moment');

module.exports = class RaidAtt
{
  egg(prefix, message)
  {
    var msg = message.content;
    msg = msg.replace(prefix + "egg ", "");
    var msgArgs = msg.split(" ");
    if (msgArgs != 2)
    {
      console.log("argError on field command");
      message.channel.send("Please try again. You entered in too many or too few arguments. Try .egg **Egg level** **Hatch Time**");
    }
    else
    {
      console.log(msgArgs);
      var eggLevel = msgArgs[0];
      var startTime = msgArgs[1];
    }
  }
}
