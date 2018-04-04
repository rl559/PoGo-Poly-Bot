var wellnessSummary;
var istSummary;
var farstopSummary;

module.exports = class Field
{
  field(prefix, message)
  {
    var msg = message.content;
    msg = msg.replace(prefix+"field ", "");
    var msgArgs = msg.split(" - ");
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
        wellnessSummary = '**Wellness:**\n' + challenge + '\n' + reward;
      }
      else if (stopName == 'ist')
      {
        istSummary = '**IST:**\n' + challenge + '\n' + reward;
      }
      else if (stopName == 'far sign')
      {
        farstopSummary = date + ' **Far Stop:**\n' + challenge + '\n' + reward;
      }
      else
      {
        console.log("stopError on field command");
        message.channel.send("Please try again. You have mispelled the Pokestop name. Please try \'wellness\', \'ist\', or \'far stop\'");
      }
    }
  }
  
  rsummary(prefix, message)
  {
   if(message == 'rsummary')
   {
     message.guide.channels.find('name', 'research').send({
        "embed": {
          "color": 3447003,
          "title": "Field Research",
          "description": wellnessSummary + '\n' + istSummary + '\n' + farstopSummary
          }
       });
   }
  }
}
