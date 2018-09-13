//These are not setting correctly but they hold things if set
var hereList = "";
var comingList = "";
var raidStartTime = "";
var channelName = "";
var newName = "";
var mainCoord = "";
var mystCount = 0;
var valCount = 0;
var instCount = 0;

module.exports = class RaidAtt
{
  
  egg(prefix, message)
  {
    this.mainCoord = message.author;
    this.hereList = "";
    this.comingList = "";
    this.raidStartTime = "";
    this.mystCount = 0;
    this.valCount = 0;
    this.instCount = 0;
    
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
      var eggLevel = msgArgs[0];
      var hatchTime = msgArgs[1];
      if (eggLevel != 1 && eggLevel != 2 && eggLevel != 3 && eggLevel != 4 && eggLevel != 5)
      {
          console.log("Egg level error");
          message.channel.send("Please try again. You entered an incorrect egg level. Egg levels must be between 1-5.");
      }
      else
      {
          var hatchClock = hatchTime.split(":");
          var hatchHour = hatchClock[0];
          var hatchMinute = hatchClock[1];
          hatchHour = parseInt(hatchHour);
          hatchMinute = parseInt(hatchMinute);
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
                  if (hatchMinute == 0)
                  {
                      hatchMinute = "00";
                  }
                  hatchHour = hatchHour + 1;
                  if (hatchHour > 12)
                  {
                      hatchHour = hatchHour - 12;
                  }
              }
              var raidEndTime = hatchHour + ":" + hatchMinute;
              this.channelName = "level-" + eggLevel + "-egg-raid";
              var chnl = message.channel;
              //If we put the creation in a seperate function and call it here it SHOULD create at the end of the extra function and then allow calls to the channel
              chnl.guild.createChannel(this.channelName, "text");
              if (eggLevel == 1)
              {
                  var callRole = chnl.guild.roles.find('name', 'T1');
                  chnl.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! It will end at " + raidEndTime + ". Go to #" + this.channelName);
              }
              else if (eggLevel == 2)
              {
                  var callRole = chnl.guild.roles.find('name', 'T2');
                  chnl.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! It will end at " + raidEndTime + ". Go to #" + this.channelName);
              }
              else if (eggLevel == 3)
              {
                  var callRole = chnl.guild.roles.find('name', 'T3');
                  chnl.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! It will end at " + raidEndTime + ". Go to #" + this.channelName);
              }
              else if (eggLevel == 4)
              {
                  var callRole = chnl.guild.roles.find('name', 'T4');
                  chnl.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! It will end at " + raidEndTime + ". Go to #" + this.channelName);
              }
              else if (eggLevel == 5)
              {
                  var callRole = chnl.guild.roles.find('name', 'T5');
                  chnl.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! It will end at " + raidEndTime + ". Go to #" + this.channelName);
              }
              else
              {
                  console.log("Failed to send message to new channel");
              }
          }
      }
    }
  }
  
  raidMon(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "raidMon ", "");
      if (msg.indexOf(" ") != -1 || msg == "")
      {
          console.log("argError on raidMon command");
          message.channel.send("You have entered too many or too few arguments. Please try again with **.raidMon PokemonName**. If you are reporting a pokemon with a space in the name use a dash (-) instead.");
      }
      else
      {
          if (message.author == this.mainCoord)
          {
            console.log("message.channel: " + message.channel);
            console.log("this.channelName: " + this.channelName);
              if (message.channel == this.channelName)
              {
                  this.newName = msg + "-raid";
                  message.channel.send("The egg has hatched, new name set.");
                  message.channel.setName(this.newName, "The egg has hatched into " + msg + "!");
                  console.log("Egg channel renamed");
              }
              else
              {
                  message.channel.send("This channel is not a raid room and should not be renamed. Shame on you " + message.author);
              }
          }
          else if (this.mainCoord == "")
          {
              message.channel.send("You are not the coordinator, shame on you " + message.author);
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
          message.channel.send(message.author + " is on the way!");
          if (this.comingList == "")
          {
              this.comingList = "**" + message.author + "**";
              if (message.member.roles.find("name", "Mystic"))
              {
                  this.mystCount = parseInt(this.mystCount);
                  this.mystCount = this.mystCount + 1;
              }
              else if (message.member.roles.find("name", "Instinct"))
              {
                  this.instCount = parseInt(this.instCount);
                  this.instCount = this.instCount + 1;
              }
              else if (message.member.roles.find("name", "Valor"))
              {
                  this.valCount = parseInt(this.valCount);
                  this.valCount = this.valCount + 1;
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
                  this.mystCount = parseInt(this.mystCount);
                  this.mystCount = this.mystCount + 1;
              }
              else if (message.member.roles.find("name", "Instinct"))
              {
                  this.instCount = parseInt(this.instCount);
                  this.instCount = this.instCount + 1;
              }
              else if (message.member.roles.find("name", "Valor"))
              {
                  this.valCount = parseInt(this.valCount);
                  this.valCount = this.valCount + 1;
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
          message.channel.send(message.author + " is at the raid!");
          if (this.hereList == "")
          {
              if (this.comingList.indexOf("**" + message.author + "**, ") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.author + "**, ", "");
                  this.hereList = "**" + message.author + "**";
              }
              else if (this.comingList.indexOf("**" + message.author + "**") != -1)
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
              if (this.comingList.indexOf("**" + message.author + "**, ") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.author + "**, ", "");
                  this.hereList = this.hereList + ", **" + message.author + "**";
              }
              else if (this.comingList.indexOf("**" + message.author + "**") != -1)
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
      msg = msg.replace(prefix + "cancel", "");
      if (msg == "" || msg == " ")
      {
          message.channel.send(message.author + " has canceled.");
          
          if (message.member.roles.find("name", "Mystic"))
          {
              this.mystCount = parseInt(this.mystCount);
              this.mystCount = this.mystCount - 1;
          }
          else if (message.member.roles.find("name", "Instinct"))
          {
              this.instCount = parseInt(this.instCount);
              this.instCount = this.instCount - 1;
          }
          else if (message.member.roles.find("name", "Valor"))
          {
              this.valCount = parseInt(this.valCount);
              this.valCount = this.valCount - 1;
          }
          else
          {
              console.log("Team count error");
              message.channel.send("It appears you don't have a team. Please message a moderator to have one assigned.");
          }
          
          if (this.comingList.indexOf("**" + message.author + "**, ") !=  -1)
          {
              this.comingList = this.comingList.replace("**" + message.author + "**, ", "");
          }
          else if (this.comingList.indexOf("**" + message.author + "**") != -1)
          {
              this.comingList = this.comingList.replace("**" + message.author + "**", "");
          }
          else
          {
              if (this.hereList.indexOf("**" + message.author + "**, ") != -1)
              {
                  this.hereList = this.hereList.replace("**" + message.author + "**, ", "");
              }
              else if (this.hereList.indexOf("**" + message.author + "**") != -1)
              {
                  this.hereList = this.hereList.replace("**" + message.author + "**", "");
              }
          }
      }
      else
      {
          console.log("argError on cancel command");
          message.channel.send("You entered too many arguments. Please try again with just **.cancel**");
      }
  }
  
  list(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "list", "");
      if (msg == "" || msg == " ")
      {
          message.channel.send("This raid starts at: " + this.raidStartTime);
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
          this.raidStartTime = "";
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
  
  setStartTime(prefix, message)
  {
      var msg = message.content;
      msg = msg.replace(prefix + "setStartTime ", "");
      if (msg.indexOf(" ") != -1)
      {
          console.log("argError on setStartTime command");
          message.channel.send("You have entered too many arguments. Please try again with **.setStartTime hours:minutes** with no space after the minutes");
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
              if (message.channel == this.newName || message.channel == this.channelName)
              {
                  this.hereList = "";
                  this.comingList = "";
                  this.raidStartTime = "";
                  this.channelName = "";
                  this.newName = "";
                  this.mainCoord = "";
                  this.mystCount = 0;
                  this.instCount = 0;
                  this.valCount = 0;
                  message.channel.delete();
              }
              else
              {
                  message.channel.send("This channel is not a raid room and should not be deleted. Shame on you " + message.author);
              }
          }
          else if (this.mainCoord == "")
          {
              message.channel.send("You are not the raid coordinator, shame on you " + message.author);
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
