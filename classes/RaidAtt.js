/*To do:
* Raidmon command
* Here commmand
* Coming command
* Cancel command
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
              guild.createChannel(channelName, "text");
          }
      }
    }
  }
  
  raidMon(prefix, message)
  {
      //Sets the mon for the raid. Very similar to rraid. May be able to alter rraid to fill this role
      //Rename the channel with the pokemon name
  }
  
  coming(prefix, message)
  {
      //Mark as coming. Needs to take in input like '2' for 2 people or 'm1 v1' for one mystic one valor
      //Count the number of people per team
  }
  
  here(prefix, message)
  {
      //Mark a users group as here
      var msg = message.content;
      msg = msg.replace(prefix + "here ", "");
      if (msg == "" || msg == " ")
      {
          hereList = hereList + message.author;
          message.channel.send(`$message.author} is at the raid!`);
          if (message.member.roles.find("name", "Mystic"))
          {
              mystCount++;
          }
          else if (message.member.roles.find("name", "Instinct"))
          {
              instCount++;
          }
          
          else if (message.member.roles.find("name", "Valor"))
          {
              valCount++;
          }
          else
          {
              console.log("Team count error");
              message.channel.send("It appears you don't have a team. Please message a moderator to have one assigned.");
          }
      }
      else
      {
          //Maybe allow here for multiple members? Or just throw error
      }
  }
  
  cancel(prefix, message)
  {
      //Cancel the reservation
  }
  
  list(prefix, message)
  {
      //Lists all members currently coming and at the raid
  }
  
  newGroup(prefix, message)
  {
      //Allow for the bot to start over in the same channel to coordinate a later group
      hereList = "";
      comingList = "";
      startTime = "";
      mystCount = 0;
      instCount = 0;
      valCount = 0;
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
      //channel.delete();
  }
}
