var wellnessSummary = "";
var istSummary = "";
var farstopSummary = "";

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
        wellnessSummary = '**Wellness:**\n' + date + '\n' + challenge + '\n' + reward;
        console.log("Wellness research updated");
        message.channel.send("Wellness Research Updated!");
      }
      else if (stopName == 'ist')
      {
        istSummary = '**IST:**\n' + date + '\n' + challenge + '\n' + reward;
        console.log("IST research updated");
        message.channel.send("IST Research Updated!");
      }
      else if (stopName == 'far stop')
      {
        farstopSummary = '**Far Stop:**\n' + date + '\n' + challenge + '\n' + reward;
        console.log("Far Stop research updated");
        message.channel.send("Far Stop Research Updated!");
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
     message.channel.send({
        "embed": {
          "color": 3447003,
          "title": "Field Research",
          "description": wellnessSummary + '\n' + istSummary + '\n' + farstopSummary
          }
       });
  }
}
