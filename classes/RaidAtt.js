let hereList = "";
let comingList = "";
let raidStartTime = "";
let channelName = "";
let raidMonName = "";
let startTimeName = "";
let mainCoord = "";
let mystCount = 0;
let valCount = 0;
let instCount = 0;
let raidRoom = "";
let comingListArray = [];
let hereListArray = [];

//This is the ID of the "Active Raids" category in each server and the server IDs. Use this to create/move the channel into this category
const LIVEparentCategoryID = '490253671763017739';
const TESTparentCategotyID = '494142635812978688';
const LIVEguildID = '348982315537661952';
const TESTguildID = '394131908516380674';


//The following is the beginning of me attempting to set up a dict for unique raids
let guild_dict = {};
let trainer_dict = {};




module.exports = class RaidAtt
{
    
  async egg(prefix, message)
  {
      this.guild_dict[guildID] = this.TESTguildID;
      console.log(this.guild_dict);
    this.mainCoord = message.author;
    this.hereList = "";
    this.comingList = "";
    this.raidStartTime = "";
    this.channelName = "";
    this.raidMonName = "";
    this.startTimeName = "";
    this.mystCount = 0;
    this.valCount = 0;
    this.instCount = 0;
    this.raidRoom = "";
    this.comingListArray = [];
    this.hereListArray = [];
    
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
              /* This is not currently being used but if we need to calculate the despawn time later this is how
              if (hatchHour > 12)
              {
                  hatchHour = hatchHour - 12;
              }
              hatchMinute = hatchMinute + 45;
              if (hatchMinute > 59)
              {
                  hatchMinute = hatchMinute - 60;
                  
                  //This was Casey Dixon's idea
                  if (hatchMinute < 10)
                  {
                      hatchMinute = "0" + hatchMinute;
                  }
                  
                  hatchHour = hatchHour + 1;
                  if (hatchHour > 12)
                  {
                      hatchHour = hatchHour - 12;
                  }
              }
              var raidEndTime = hatchHour + ":" + hatchMinute;
              */
              this.channelName = "level-" + eggLevel + "-raid-hatch-time-" + hatchClock[0] + hatchClock[1];
              var chnl = message.channel;
              
              if (chnl.guild.id == LIVEguildID)
              {
                  //Created the channel
                  this.raidRoom = await chnl.guild.createChannel(this.channelName, "text");
                  
                  //Live server parent category (comment out whichever you are not using)
                  this.raidRoom = await this.raidRoom.setParent(LIVEparentCategoryID);
              }
              if (chnl.guild.id == TESTguildID)
              {
                  //Created the channel
                  this.raidRoom = await chnl.guild.createChannel(this.channelName, "text");
                  
                  //Test server parent category (comment out whichever you are not using)
                  this.raidRoom = await this.raidRoom.setParent(TESTparentCategotyID);
              }
              
              if (eggLevel == 1)
              {
                  var callRole = chnl.guild.roles.find('name', 'T1');
                  chnl.send("A raid has been reported! Go to " + this.raidRoom + "to coordinate.");
                  this.raidRoom.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! Coordinate here using .coming and .here");
              }
              else if (eggLevel == 2)
              {
                  var callRole = chnl.guild.roles.find('name', 'T2');
                  chnl.send("A raid has been reported! Go to " + this.raidRoom + "to coordinate.");
                  this.raidRoom.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! Coordinate here using .coming and .here");
              }
              else if (eggLevel == 3)
              {
                  var callRole = chnl.guild.roles.find('name', 'T3');
                  chnl.send("A raid has been reported! Go to " + this.raidRoom + "to coordinate.");
                  this.raidRoom.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! Coordinate here using .coming and .here");
              }
              else if (eggLevel == 4)
              {
                  var callRole = chnl.guild.roles.find('name', 'T4');
                  chnl.send("A raid has been reported! Go to " + this.raidRoom + "to coordinate.");
                  this.raidRoom.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! Coordinate here using .coming and .here");
              }
              else if (eggLevel == 5)
              {
                  var callRole = chnl.guild.roles.find('name', 'T5');
                  chnl.send("A raid has been reported! Go to " + this.raidRoom + "to coordinate.");
                  this.raidRoom.send("A " + callRole + " raid has been reported by " + this.mainCoord + "! Coordinate here using .coming and .here");
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
              if (message.channel == this.raidRoom)
              {
                  this.raidMonName = msg + "-raid";
                  message.channel.send("The egg has hatched, new name set.");
                  message.channel.setName(this.raidMonName, "The egg has hatched into " + msg + "!");
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
              message.channel.send("Only the raid coordinator " + this.mainCoord + " can rename this channel.");
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
              this.comingList = "**" + message.member.displayName + "**";
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
                  this.comingList = this.comingList.replace("**" + message.member.displayName + "**", "");
              }
          }
          else
          {
              this.comingList = this.comingList + ", **" + message.member.displayName + "**";
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
                  this.comingList = this.comingList.replace(", **" + message.member.displayName + "**", "");
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
              if (this.comingList.indexOf("**" + message.member.displayName + "**, ") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.member.displayName + "**, ", "");
                  this.hereList = "**" + message.member.displayName + "**";
              }
              else if (this.comingList.indexOf(", **" + message.member.displayName + "**") != -1)
              {
                  this.comingList = this.comingList.replace(", **" + message.member.displayName + "**", "");
                  this.hereList = "**" + message.member.displayName + "**";
              }
              else if (this.comingList.indexOf("**" + message.member.displayName + "**") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.member.displayName + "**", "");
                  this.hereList = "**" + message.member.displayName + "**";
              }
              else
              {
                  this.hereList = "**" + message.member.displayName + "**";
              }
          }
          else
          {
              if (this.comingList.indexOf("**" + message.member.displayName + "**, ") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.member.displayName + "**, ", "");
                  this.hereList = this.hereList + ", **" + message.member.displayName + "**";
              }
              else if (this.comingList.indexOf(", **" + message.member.displayName + "**") != -1)
              {
                  this.comingList = this.comingList.replace(", **" + message.member.displayName + "**", "");
                  this.hereList = this.hereList + ", **" + message.member.displayName + "**";
              }
              else if (this.comingList.indexOf("**" + message.member.displayName + "**") != -1)
              {
                  this.comingList = this.comingList.replace("**" + message.member.displayName + "**", "");
                  this.hereList = this.hereList + ", **" + message.member.displayName + "**";
              }
              else
              {
                  this.hereList = this.hereList + ", **" + message.member.displayName + "**";
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
          
          if (this.comingList.indexOf("**" + message.member.displayName + "**, ") !=  -1)
          {
              this.comingList = this.comingList.replace("**" + message.member.displayName + "**, ", "");
          }
          else if (this.comingList.indexOf(", **" + message.member.displayName + "**") !=  -1)
          {
              this.comingList = this.comingList.replace(", **" + message.member.displayName + "**");
          }
          else if (this.comingList.indexOf("**" + message.member.displayName + "**") != -1)
          {
              this.comingList = this.comingList.replace("**" + message.member.displayName + "**", "");
          }
          else
          {
              if (this.hereList.indexOf("**" + message.member.displayName + "**, ") != -1)
              {
                  this.hereList = this.hereList.replace("**" + message.member.displayName + "**, ", "");
              }
              else if (this.hereList.indexOf(", **" + message.member.displayName + "**") !=  -1)
              {
                  this.hereList = this.hereList.replace(", **" + message.member.displayName + "**");
              }
              else if (this.hereList.indexOf("**" + message.member.displayName + "**") != -1)
              {
                  this.hereList = this.hereList.replace("**" + message.member.displayName + "**", "");
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
          message.channel.send("This raid starts at: " + this.raidStartTime + 
                               "\nThere are " + this.mystCount + " mystic players." + 
                               "\nThere are " + this.instCount + " instinct players." + 
                               "\nThere are " + this.valCount + " valor players.");
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
          message.channel.setName(this.raidMonName, "A new group has been started");
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
          if (message.channel == this.raidRoom)
          {
              message.channel.send("The start time has been set to " + msg);
              msg = msg.replace(":", "");
              this.raidStartTime = msg;
              this.startTimeName = this.raidMonName + "-start-time-" + this.raidStartTime;
              message.channel.setName(this.startTimeName, "The start time has been set to " + this.raidStartTime + "!");
          }
          else
          {
              message.channel.send("This is not a raid room and should not be renamed.");
          }
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
              if (message.channel == this.raidRoom)
              {
                  this.hereList = "";
                  this.comingList = "";
                  this.raidStartTime = "";
                  this.channelName = "";
                  this.raidMonName = "";
                  this.startTimeName = "";
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
              message.channel.send("Only the raid coordinator " + this.mainCoord + " can close this channel.");
          }
      }
      else
      {
          console.log("argError on endRaid command");
          message.channel.send("You have entered too many arguments. Please try again with just **.endRaid**");
      }
  }
  
}
