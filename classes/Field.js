var wellnessSummary = '**Wellness:**\n' + 'None' + '\n' + 'None' + '\n' + 'None';
var istSummary = '**IST:**\n' + 'None' + '\n' + 'None' + '\n' + 'None';
var farstopSummary = '**Far Stop:**\n' + 'None' + '\n' + 'None' + '\n' + 'None';

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

      if(reward.toLowerCase() == "encounter")
      {
        //Catch challenge encounters
        if(challenge.toLowerCase() == "catch a dragon type pokemon")
        {
          reward = "Dratini Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 grass, water, or fire type pokemon")
        {
          reward = "Pikachu Encounter";
        }
        else if (challenge.toLowerCase() == "catch 5 weather boosted pokemon")
        {
          reward = "Vulpix/Poliwag Encounter";
        }
        else if (challenge.toLowerCase() == "catch 10 pokemon")
        {
          reward = "Magikarp Encounter";
        }
        else if (challenge.toLowerCase() == "use 5 berries to help catch pokemon")
        {
          reward = "Lickitung Encounter";
        }
        //Throw challenge encounters
        else if (challenge.toLowerCase() == "make 5 nice throws")
        {
          reward = "Voltorb Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 great throws")
        {
          reward = "Ghastly Encounter";
        }
        else if (challenge.toLowerCase() == "land a nice curveball throw")
        {
          reward = "Ghastly Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 great throws in a row")
        {
          reward = "Onyx Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 excellent throws in a row")
        {
          reward = "Larvitar Encounter";
        }
        //Evolve challenge encounters
        else if (challenge.toLowerCase() == "evolve a pokemon")
        {
          reward = "Eevee Encounter";
        }
        else if (challenge.toLowerCase() == "evolve a fire type pokemon")
        {
          reward = "Charmander Encounter";
        }
        else if (challenge.toLowerCase() == "evolve a water type pokemon")
        {
          reward = "Squirtle Encounter"
        }
        else if (challenge.toLowerCase() == "evolve a grass type pokemon")
        {
          reward = "Bulbasaur Encounter"
        }
        else if (challenge.toLowerCase() == "evolve 1 electric, water, or fire type pokemon")
        {
          reward = "Eevee Encounter"
        //Hatch challenge encounters
        else if (challenge.toLowerCase() == "hatch an egg")
        {
          reward = "Exeggcute Encounter";
        }
        else if (challenge.toLowerCase() == "hatch 3 eggs")
        {
          reward = "Magmar Encounter";
        }
        else if (challenge.toLowerCase() == "hatch 5 eggs")
        {
          reward = "Chansey Encounter";
        }
        //Combat challenge encounters
        else if (challenge.toLowerCase() == "battle in a gym")
        {
          reward = "Mankey Encounter";
        }
        else if (challenge.toLowerCase() == "battle in a gym 5 times")
        {
          reward = "Machop Encounter";
        }
        else if (challenge.toLowerCase() == "win a gym battle")
        {
          reward = "Bulbasaur/Squirtle/Charmander Encounter";
        }
        else if (challenge.toLowerCase() == "win 3 gym battles")
        {
          reward = "Jynx Encounter";
        }
        else if (challenge.toLowerCase() == "win a level 3 or higher raid")
        {
          reward = "Dratini Encounter";
        }
        else if (challenge.toLowerCase() == "power up pokemon 5 times")
        {
          reward = "Bulbasaur/Squirtle/Charmander Encounter";
        }
        else if (challenge.toLowerCase() == "use a suppereffective charge attack in 7 gym battles")
        {
          reward = "Electabuzz Encounter";
        }
      }

      if(stopName == 'wellness')
      {
        wellnessSummary = '**Wellness:**\n' + date + '\n' + challenge + '\n' + reward;
        console.log("Wellness research updated");
        message.channel.send("Wellness Research Updated!");
        message.channel.send
        ({
        "embed":
          {
          "color": 3447003,
          "title": "Field Research",
          "description": wellnessSummary + '\n' + istSummary + '\n' + farstopSummary
          }
        });
      }
      else if (stopName == 'ist')
      {
        istSummary = '**IST:**\n' + date + '\n' + challenge + '\n' + reward;
        console.log("IST research updated");
        message.channel.send("IST Research Updated!");
        message.channel.send
        ({
        "embed":
          {
          "color": 3447003,
          "title": "Field Research",
          "description": wellnessSummary + '\n' + istSummary + '\n' + farstopSummary
          }
        });
      }
      else if (stopName == 'far stop')
      {
        farstopSummary = '**Far Stop:**\n' + date + '\n' + challenge + '\n' + reward;
        console.log("Far Stop research updated");
        message.channel.send("Far Stop Research Updated!");
        message.channel.send
        ({
        "embed":
          {
          "color": 3447003,
          "title": "Field Research",
          "description": wellnessSummary + '\n' + istSummary + '\n' + farstopSummary
          }
        });
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
