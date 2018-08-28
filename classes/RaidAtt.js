/*To do:
* Raidmon command
* Create channel
* Delete channel
* Here commmand
* Coming command
* Cancel command
* New group command
* Start time command
* Starting commmand
* End raid command
*/

//Might not actually be using these
const timePattern = new RegExp(/^\d?\d$/g);
const Moment = require('moment-timezone'),
    moment = require('moment');

var hereList = "";
var comingList = "";
var startTime = "";
var mystCount = 0;
var valCount = 0;
var instCount = 0;

module.exports = class RaidAtt
{
  makeChannel(message) //I am really unsure if this works
  {
      var server = message.guild;
      var name = message;
      
      server.createChannel(name, "text");
  }
  
  deleteChannel(message) //Somehow even more unsure about this one
  {
      //Delete the raid channel at completion
      var server = message.guild;
      var name = message;
      
      server.deleteChannel(name, "text");
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
  
  raidMon(prefix, message)
  {
      //Sets the mon for the raid. Very similar to rraid. May be able to alter rraid to fill this role
      //Rename the channel with the pokemon name
  }
  
  here(prefix, message)
  {
      //Mark a users group as here
  }
  
  coming(prefix, message)
  {
      //Mark as coming. Needs to take in input like '2' for 2 people or 'm1 v1' for one mystic one valor
      //Count the number of people per team
  }
  
  cancel(prefix, message)
  {
      //Cancel the reservation
  }
  
  newGroup(prefix, message)
  {
      //Allow for the bot to start over in the same channel to coordinate a later group
      hereList = "";
      comingList = "";
      startTime = "";
      message.channel.send("A new group has been started! Make sure to post if you're here again if you were at the first group.");
  }
  
  startTime(prefix, message)
  {
      //Sets the start time for the group
  }
  
  starting(prefix, message)
  {
      //Notifies those at the raid and on the way that they are starting the lobby
  }
  
  endRaid(prefix, message)
  {
      //Start the channel delete process
  }
}
