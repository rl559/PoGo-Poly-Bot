const Moment = require('moment-timezone'),
	moment = require('moment');

module.exports = class Rraid
{
  display(prefix, message, raidBosses)
  {
    const timePattern = new RegExp(/^\d?\d$/g);
    var msg = message.content;
    msg = msg.replace(prefix+"rraid ", "");
    var msgArgs = msg.split(" ");
    if(msgArgs.length != 2)
    {
      console.log("argError on rraid command");
      message.channel.send("Please try again.  You entered in too many or few arguments.  Try .rraid **bossname** **minuteRemaining**");
    }
    else {
       console.log(msgArgs);
       var raidName = msgArgs[0];
       raidName = raidName.toLowerCase();
       var minsLeft = msgArgs[1];
       if(timePattern.test(minsLeft) && Object.keys(raidBosses).includes(raidName))
       {
         console.log("raidTimepass");
         var time = moment();
         time.add(minsLeft, "m");
         console.log(time.toString());
         
         message.guild.channels.find('name', 'raids').send({
          "embed": {
            "color": 3447003,
            "title": 'Level '+raidBosses[raidName].level.replace("Level ", "")+' Raid has started!',
            "url": 'https://GymHuntr.com/#28.144546148580186,-81.84874534606935',
            "thumbnail": {
              "url": raidBosses[raidName].image,
            },
            description: '**Poly Gym**\n'+raidName+'\n**CP:** '+raidBosses[raidName].cp+' - **Moves:** Unknown\n*Raid Ending: 0 hours '+minsLeft+' min 00 sec*'
          }
        });
      }
      else {
        console.log("raidTimefail");
        message.channel.send("Please try again.  You either misspelled the raid boss or did not enter in a valid minute time.  Try .rraid **bossname** **minuteRemaining**");
      }
       }
  }
}