var hereList = "";
var comingList = "";
var raidStartTime = "";
var mainCoord = "";
var mystCount = 0;
var valCount = 0;
var instCount = 0;

module.exports = class RaidAtt
{
  
  egg(prefix, message)
  {
    mainCoord = message.author;
    var msg = message.content;
    msg = msg.replace(prefix + "egg ", "");
    var msgArgs = msg.split(" ");
    if (msgArgs[1] == "" || msgArgs[2] != "")
    {
      console.log("argError on egg command");
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
              message.channel.send("Please try again. You entered an incorrect time. Please keep the hours between 1-12 and minutes from 0-59.");
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
              var channelName = "level-" + eggLevel + "-egg-raid";
              guild.createChannel(channelName, "text");
              var newChannel = guild.channel.find("name", channelName); //might be .channel or .channels must test to find out
              if (eggLevel === 1)
              {
                  newChannel.send("A @T1 raid has been reported by @" + mainCoord + "!");
              }
              else if (eggLevel === 2)
              {
                  newChannel.send("A @T2 raid has been reported by @" + mainCoord + "!");
              }
              if (eggLevel === 3)
              {
                  newChannel.send("A @T3 raid has been reported by @" + mainCoord + "!");
              }
              if (eggLevel === 4)
              {
                  newChannel.send("A @T4 raid has been reported by @" + mainCoord + "!");
              }
              if (eggLevel === 5)
              {
                  newChannel.send("A @T5 raid has been reported by @" + mainCoord + "!");
              }
          }
      }
    }
  }
  
  raidMon(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "raidMon ", "");
      if (msg.search(" ") != -1 || msg == "")
      {
          console.log("argError on raidMon command");
          message.channel.send("You have entered too many or too few arguments. Please try again with **.raidMon PokemonName**. If you are reporting a pokemon with a space in the name use a dash (-) instead.");
      }
      else
      {
          if (message.author == mainCoord)
          {
              //do something
              var newName = msg + "-raid";
              message.channel.send("The egg has hatched, new name set.");
              channel.setName(newName, "The egg has hatched");
              console.log("Egg channel renamed");
              
          }
          else if (mainCoord == "")
          {
              message.channel.send("This channel is not a raid room and should not be renamed. Shame on you " + `{$message.author}`);
          }
          else
          {
              message.channel.send("Only the raid coordinator @" + mainCoord + " can rename this channel.");
          }
      }
  }
  
  coming(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "coming", "");
      if (msg == "" || msg == " ")
      {
          message.channel.send(`{$message.author} is on the way!`);
          if (comingList == "")
          {
              comingList = "**" + message.author + "**";
              if (message.member.roles.find("name", "Mystic"))
              {
                  msytCount++;
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
              comingList = comingList + ", **" + message.author + "**";
              if (message.member.roles.find("name", "Mystic"))
              {
                  msytCount++;
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
      }
      else
      {
          console.log("argError in coming command");
          message.channel.send("You have entered too many arguments. Try again by just sending **.coming** with no space");
      }
  }
  
  here(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "here", "");
      if (msg == "" || msg == " ")
      {
          message.channel.send(`{$message.author} is at the raid!`);
          if (hereList == "")
          {
              if (comingList.search("**" + message.author + "**, ") != -1)
              {
                  comingList = comingList.replace("**" + message.author + "**, ", "");
                  hereList = "**" + message.author + "**";
              }
              else if (comingList.search("**" + message.author + "**") != -1)
              {
                  comingList = comingList.replace("**" + message.author + "**", "");
                  hereList = "**" + message.author + "**";
              }
              else
              {
                  hereList = "**" + message.author + "**";
              }
          }
          else
          {
              if (comingList.search("**" + message.author + "**, ") != -1)
              {
                  comingList = comingList.replace("**" + message.author + "**, ", "");
                  hereList = hereList + ", **" + message.author + "**";
              }
              else if (comingList.search("**" + message.author + "**") != -1)
              {
                  comingList = comingList.replace("**" + message.author + "**", "");
                  hereList = hereList + ", **" + message.author + "**";
              }
              else
              {
                  hereList = hereList + ", **" + message.author + "**";
              }
          }
      }
      else
      {
          console.log("argError in here command");
          message.channel.send("You have entered too many arguments. Try again by just sending **.here** with no space");
      }
  }
  
  cancel(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "cancel");
      if (msg == "" || msg == " ")
      {
          if (comingList.search("**" + message.author + "**, ") !=  -1)
          {
              comingList = comingList.replace("**" + message.author + "**, ", "");
          }
          else if (comingList.search("**" + message.author + "**") != -1)
          {
              comingList = comingList.replace("**" + message.author + "**", "");
          }
          else
          {
              if (hereList.search("**" + message.author + "**, ") != -1)
              {
                  hereList = hereList.replace("**" + message.author + "**, ", "");
              }
              else if (hereList.search("**" + message.author + "**") != -1)
              {
                  hereList = hereList.replace("**" + message.author + "**", "");
              }
          }
      }
      else
      {
          console.log("argError on cancel command");
          message.channel.send("You entered too manyy arguments. Please try again with just **.cancel**");
      }
  }
  
  list(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "list", "");
      if (msg == "" || msg == " ")
      {
          message.channel.send("There are " + mystCount + " mystic players.");
          message.channel.send("There are " + instCount + " instinct players.");
          message.channel.send("There are " + valCount + " valor players.");
          if (comingList != "")
          {
              message.channel.send(comingList + " are on their way.");
          }
          else
          {
              message.channel.send("No one is currently on the way.");
          }
          if (hereList != "")
          {
              message.channel.send(hereList + " are waiting at the raid.");
          }
          else
          {
              message.channel.send("No one is currently at the raid.");
          }
      }
      else
      {
          console.log("argError on list command");
          message.channel.send("You entered too many arguments. Please try again with just **.list**");
      }
  }
  
  newGroup(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "newGroup", "");
      if (msg == "" || msg == " ")
      {
          hereList = "";
          comingList = "";
          startTime = "";
          mystCount = 0;
          instCount = 0;
          valCount = 0;
          message.channel.send("A new group has been started! Make sure to post if you're here again if you are attneding this group too.");
      }
      else
      {
          console.log("argError on newGroup command");
          message.channel.send("You have entered too many arguements. Please try again with just **.newGroup**");
      }
  }
  
  startTime(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "startTime ", "");
      if (msg.search(" ") != -1)
      {
          console.log("argError on startTime command");
          message.channel.send("You have entered too many arguments. Please try again with **.startTime hours:minutes** with no space after the minutes");
      }
      else
      {
          raidStartTime = msg;
          message.channel.send("The start time has been set to " + msg);
      }
  }
  
  getStartTime(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "getStartTime", "");
      if (msg == "" || msg == " ")
      {
          message.channel.send("The start time of the raid is " + raidStartTime);
      }
      else
      {
          console.log("argError on getStartTime command");
          message.channel.send("You have entered too many arguments. Please try again with just **.getStartTime**");
      }
  }
  
  endRaid(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "endRaid", "");
      if (msg == "" || msg == " ")
      {
          if (mainCoord == message.author)
          {
              hereList = "";
              comingList = "";
              startTime = "";
              mainCoord = "";
              mystCount = 0;
              instCount = 0;
              valCount = 0;
              channel.delete();
              guild.channel.find("name", raids).send("The raid room was closed by @" + mainCoord + ". Just report the raid egg again to reopen a room for the raid.");
          }
          else if (mainCoord == "")
          {
              message.channel.send("This channel is not a raid room and should not be deleted. Shame on you " + `{$message.author}`);
          }
          else
          {
              message.channel.send("Only the raid coordinator @" + mainCoord + " can close this channel.");
          }
      }
      else
      {
          console.log("argError on endRaid command");
          message.channel.send("You have entered too many arguments. Please try again with just **.endRaid**");
      }
  }
}
