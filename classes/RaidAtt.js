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

var hereList = "";
var comingList = "";

module.exports = class RaidAtt
{
  createChannel(message) //I am really unsure if this works
  {
      var server = message.guild;
      var name = message;
      
      server.createChannel(name, "text")
  }
  
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
      var hatchTime = msgArgs[1];
      if (eggLevel < 1 || eggLevel > 5)
      {
          console.log("Egg level error");
          message.channel.send("Please try again. You entered an incorrect egg level. Egg levels must be between 1-5.");
      }
      else
      {
          var hatchClock = hatchTime.split(":");
          var hatchHour = hatchClock[0];
          var hatchMinute = hatchClock[1];
          if (hatchHour > 24 || hatchMinute > 60)
          {
              console.log("Raid egg time error");
              message.channel.send("Please try again. You entered an incorrect time. Please keep the hours between 1-24 and minutes from 0-59.");
          }
          else
          {
              if (hatchHour > 12)
              {
                  hatchHour = hatchHour - 12;
              }
              hatchMinute = hatchMinute + 45;
              if (hatchMinute > 59)
              {
                  hatchMinute = hatchMinute - 60;
                  hatchHour++;
                  if (hatchHour > 12)
                  {
                      hatchHour = hatchHour - 12;
                  }
              }
              var raidEnd = hatchHour + ":" + hatchMinute;
              //A channel needs made at this point. The name of the channel will be "level-#-egg-raid"
              //After egg hatch and someone reports the pokemon, channl is renamed to "pokemon-raid"
              var channelName = "level-" + eggLevel + "-egg-raid";
              createChannel(channelName);
          }
      }
    }
  }
}
