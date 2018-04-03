const Moment = require('moment-timezone'),
        moment = require('moment');
        
module.exports = class Field
{
  display(prefix, message)
  {
    var msg = message.content;
    msg = msg.replace(prefix+"field ", "");
    var msgArgs = msg.splt(" - ");
    if(msgArgs.length != 4)
    {
      console.log("argError on field command");
      message.channel.send("Please try again. You entered in too many or too few arguments. Try .field **Date** - **StopName** - **challenge** - **reward**");
    }
    else
    {
      console.log(msgArgs);
      var date = msgArgs[0];
      var stopName = msgArgs[1];
      stopName = stopName.toLowerCase();
      var challenge = msgArgs[2];
      var reward = msgArgs[3];
      if(stopName == 'wellness')
      {
        var challengeDateW = date;
        var challengeW = challenge;
        var rewardW = reward;
        var wellnessSummary = '**Wellness:**\n' + challengeW + '\n' + rewardW;
      }
      else if (stopName == ist)
      {
        var challengeDateIST = date;
        var challengeIST = challenge;
        var rewardIST = reward;
        var istSummary = '**IST:**\n' + challengeIST + '\n' + rewardIST;
      }
      else if (stopName == 'far sign')
      {
        var challengeDateFS = date;
        var challengeFS = challenge
        var rewardFS = reward;
        var farstopSummary = '**Far Stop:**\n' + challengeFS + '\n' + rewardFS;
      }
      else
      {
        console.log("stopError on field command");
        message.channel.send("Please try again. You have mispelled the Pokestop name. Please try \'wellness\', \'ist\', or \'far stop\'");
      }
    }
  }
}
