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
        else if (challenge.toLowerCase() == "catch 3 oddish or belsprout")
        {
          reward = "Tangela Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 pidgey or murkrow")
        {
          reward = "Ekans Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 meowth or skitty")
        {
          reward = "Growlithe Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 poison type pokemon")
        {
          reward = "Bulbasaur/Grimer/Ghastly Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 bug type pokemon")
        {
          reward = "Pinsir Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 dark type pokemon")
        {
          reward = "Houndour Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 electric type pokemon")
        {
          reward = "Pikachu Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 flying type pokemon")
        {
          reward = "Doduo Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 fire type pokemon")
        {
          reward = "Ponyta/Magcargo Encounter";
        }
        else if (challenge.toLowerCase() == "catch 3 grass, fire, or ground type pokemon")
        {
          reward = "Numel Encounter";
        }
        else if (challenge.toLowerCase() == "catch 5 fire type pokemon")
        {
          reward = "Flareon Encounter";
        }
        else if (challenge.toLowerCase() == "catch 5 weather boosted pokemon")
        {
          reward = "Vulpix/Poliwag Encounter";
        }
        else if (challenge.toLowerCase() == "catch 10 pokemon")
        {
          reward = "Voltorb/Exeggutor/Magikarp Encounter";
        }
        else if (challenge.toLowerCase() == "catch 10 weather boosted pokemon")
        {
          reward = "Poliwag Encounter";
        }
        else if (challenge.toLowerCase() == "catch 20 weather boosted pokemon")
        {
          reward = "Ninetales Encounter";
        }
        //Throw challenge encounters
        else if (challenge.toLowerCase() == "make 3 nice throws")
        {
          reward = "Voltorb Encounter";
        }
        else if (challenge.toLowerCase() == "make 5 nice throws")
        {
          reward = "Voltorb Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 great throws")
        {
          reward = "Onyx/Ghastly Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 great throws in a row")
        {
          reward = "Onyx Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 great curve throws in a row")
        {
          reward = "Charmeleon Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 excellent throws")
        {
          reward = "Larvitar Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 excellent throws in a row")
        {
          reward = "Onyx/Larvitar Encounter";
        }
        //Evolve challenge encounters
        else if (challenge.toLowerCase() == "evolve a pokemon")
        {
          reward = "Vulpix/Eevee Encounter";
        }
        else if (challenge.toLowerCase() == "evolve 5 fire pokemon")
        {
          reward = "Flareon Encounter";
        }
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
        //Spin challenge encounters
        else if (challenge.toLowerCase() == "spin 3 pokestops you haven't visited before")
        {
          reward = "Ponyta Encounter";
        }
        //Powerup challenge ecnounters
        else if (challenge.toLowerCase() == "power up pokemon 5 times")
        {
          reward = "Bulbasaur/Squirtle/Charmander Encounter";
        }
        //Gym/Raid challenge encounters
        else if (challenge.toLowerCase() == "battle in a gym")
        {
          reward = "Bulbasaur/Squirtle/Charmander/Mankey/Numel/Houndour/Poliwag Encounter";
        }
        else if (challenge.toLowerCase() == "battle in a gym 5 times")
        {
          reward = "Bulbasaur/Machop Encounter";
        }
        else if (challenge.toLowerCase() == "win a gym battle")
        {
          reward = "Bulbasaur/Squirtle/Charmander Encounter";
        }
        else if (challenge.toLowerCase() == "win 3 gym battles")
        {
          reward = "Jynx Encounter";
        }
        else if (challenge.toLowerCase() == "win 2 raids")
        {
          reward = "Quilava Encounter";
        }
        else if (challenge.toLowerCase() == "win 5 raids")
        {
          reward = "Typhlosion Encounter";
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
