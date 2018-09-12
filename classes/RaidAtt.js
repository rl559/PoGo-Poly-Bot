var hereList = "";
var comingList = '';
var raidStartTime = "";
var mainCoord = "";
var mystCount = '0';
var valCount = "0";
var instCount = "0";

module.exports = class RaidAtt
{
  
  egg(prefix, message)
  {
    this.mainCoord = message.author;
    var msg = message.content;
    msg = msg.replace(prefix + "egg ", "");
    var msgArgs = msg.split(" ");
    if (msgArgs[1] == undefined || msgArgs[2] != undefined)
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
              var chnl = message.channel;
              chnl.guild.createChannel(channelName, "text");
              console.log(channelName);
              var newChannel = chnl.guild.channels.find("name", channelName);
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
          if (message.author == this.mainCoord)
          {
              //do something
              var newName = msg + "-raid";
              message.channel.send("The egg has hatched, new name set.");
              channel.setName(newName, "The egg has hatched");
              console.log("Egg channel renamed");
              
          }
          else if (this.mainCoord == "")
          {
              message.channel.send("This channel is not a raid room and should not be renamed. Shame on you " + `{$message.author}`);
          }
          else
          {
              message.channel.send("Only the raid coordinator @" + this.mainCoord + " can rename this channel.");
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
          if (this.comingList == "")
          {
              this.comingList = "**" + message.author + "**";
              if (message.member.roles.find("name", "Mystic"))
              {
                  this.msytCount++;
              }
              else if (message.member.roles.find("name", "Instinct"))
              {
                  this.instCount++;
              }
              else if (message.member.roles.find("name", "Valor"))
              {
                  this.valCount++;
              }
              else
              {
                  console.log("Team count error");
                  message.channel.send("It appears you don't have a team. Please message a moderator to have one assigned.");
              }
          }
          else
          {
              this.comingList = this.comingList + ", **" + message.author + "**";
              if (message.member.roles.find("name", "Mystic"))
              {
                  this.msytCount++;
              }
              else if (message.member.roles.find("name", "Instinct"))
              {
                  this.instCount++;
              }
              else if (message.member.roles.find("name", "Valor"))
              {
                  this.valCount++;
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
          if (this.hereList == "")
          {
              if (this.comingList.search("**" + message.author + "**, ") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.author + "**, ", "");
                  this.hereList = "**" + message.author + "**";
              }
              else if (this.comingList.search("**" + message.author + "**") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.author + "**", "");
                  this.hereList = "**" + message.author + "**";
              }
              else
              {
                  this.hereList = "**" + message.author + "**";
              }
          }
          else
          {
              if (this.comingList.search("**" + message.author + "**, ") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.author + "**, ", "");
                  this.hereList = this.hereList + ", **" + message.author + "**";
              }
              else if (this.comingList.search("**" + message.author + "**") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.author + "**", "");
                  this.hereList = this.hereList + ", **" + message.author + "**";
              }
              else
              {
                  this.hereList = this.hereList + ", **" + message.author + "**";
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
          if (this.comingList.search("**" + message.author + "**, ") !=  -1)
          {
              this.comingList = this.comingList.replace("**" + message.author + "**, ", "");
          }
          else if (this.comingList.search("**" + message.author + "**") != -1)
          {
              this.comingList = this.comingList.replace("**" + message.author + "**", "");
          }
          else
          {
              if (this.hereList.search("**" + message.author + "**, ") != -1)
              {
                  this.hereList = this.hereList.replace("**" + message.author + "**, ", "");
              }
              else if (this.hereList.search("**" + message.author + "**") != -1)
              {
                  this.hereList = this.hereList.replace("**" + message.author + "**", "");
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
          message.channel.send("There are " + this.mystCount + " mystic players.");
          message.channel.send("There are " + this.instCount + " instinct players.");
          message.channel.send("There are " + this.valCount + " valor players.");
          if (this.comingList != "")
          {
              message.channel.send(this.comingList + " are on their way.");
          }
          else
          {
              message.channel.send("No one is currently on the way.");
          }
          if (this.hereList != "")
          {
              message.channel.send(this.hereList + " are waiting at the raid.");
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
          this.hereList = "";
          this.comingList = "";
          this.startTime = "";
          this.mystCount = 0;
          this.instCount = 0;
          this.valCount = 0;
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
          this.raidStartTime = msg;
          message.channel.send("The start time has been set to " + msg);
      }
  }
  
  getStartTime(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "getStartTime", "");
      if (msg == "" || msg == " ")
      {
          message.channel.send("The start time of the raid is " + this.raidStartTime);
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
          if (this.mainCoord == message.author)
          {
              this.hereList = "";
              this.comingList = "";
              this.startTime = "";
              this.mainCoord = "";
              this.mystCount = 0;
              this.instCount = 0;
              this.valCount = 0;
              this.channel.delete();
              guild.channel.find("name", "raids").send("The raid room was closed by @" + this.mainCoord + ". Just report the raid egg again to reopen a room for the raid.");
          }
          else if (this.mainCoord == "")
          {
              message.channel.send("This channel is not a raid room and should not be deleted. Shame on you " + `{$message.author}`);
          }
          else
          {
              message.channel.send("Only the raid coordinator @" + this.mainCoord + " can close this channel.");
          }
      }
      else
      {
          console.log("argError on endRaid command");
          message.channel.send("You have entered too many arguments. Please try again with just **.endRaid**");
      }
  }
}
