var wellnessSummary = '**Wellness:**\n' + 'None' + '\n' + 'None' + '\n' + 'None';
var istSummary = '**IST:**\n' + 'None' + '\n' + 'None' + '\n' + 'None';
var farstopSummary = '**Far Stop:**\n' + 'None' + '\n' + 'None' + '\n' + 'None';
var sdcSummary = '**SDC:**\n' + 'None' + '\n' + 'None' + '\n' + 'None';

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
        else if (challenge.toLowerCase() == "catch 10 pokemon")
        {
          reward = "Magikarp/Houndour Encounter";
        }
        else if (challenge.toLowerCase() == "catch 5 electric, normal, or poison type pokemon")
        {
          reward = "Starmie Encounter";
        }
        else if (challenge.toLowerCase() == "catch 5 fighting type pokemon")
        {
          reward = "Magnimite Encounter";
        }
        else if (challenge.toLowerCase() == "catch 7 flying, pyschic, or dark type pokemon")
        {
          reward = "Anorith Encounter";
        }
        else if (challenge.toLowerCase() == "catch 10 ground type pokemon")
        {
          reward = "Sandshrew Encounter";
        }
        else if (challenge.toLowerCase() == "catch 10 ice type pokemon")
        {
          reward = "Kabuto Encounter";
        }
        else if (challenge.toLowerCase() == "use 5 berries to help catch pokemon")
        {
          reward = "Growlithe Encounter";
        }
        else if (challenge.toLowerCase() == "use 5 razz berries to help catch pokemon")
        {
          reward = "Cubone Encounter";
        }
        else if (challenge.toLowerCase() == "use 10 pinap berries while catching pokemon")
        {
          reward = "Magikarp Encounter";
        }
        /*else if (challenge.toLowerCase() == "Catch 5 bug type pokemon")
        {
          reward = "Nincada Encounter"
        }*/
        /*else if (challenge.toLowerCase() == "use 10 berries to help catch pokemon")
        {
          reward = "Growlithe Encounter";
        }
        else if (challenge.toLowerCase() == "catch a rattata or pikachu")
        {
          reward = "Phanpy Encounter";
        }*/
        /*else if (challenge.toLowerCase() == "catch 5 water type pokemon")
        {
          reward = "Krabby Encounter";
        }*/
        else if (challenge.toLowerCase() == "catch 5 pokemon with weather boost")
        {
          reward = "Vulpix/Poliwag Encounter";
        }
        
        
        //Throw challenge encounters
        else if (challenge.toLowerCase() == "make 5 nice throws")
        {
          reward = "Voltorb/Bidoof Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 great throws")
        {
          reward = "Ghastly/Anorith/Lileep Encounter";
        }
        /*else if (challenge.toLowerCase() == "make a great curveball throw")
        {
          reward = "Spinda #3 Encounter";
        }*/
        /*else if (challenge.toLowerCase() == "make 2 nice curveball throws")
        {
          reward = "Spinda #1 Encounter";
        }*/
        /*else if (challenge.toLowerCase() == "make 3 nice curveball throws")
        {
          reward = "Spinda #7 Encounter";
        }*/
        else if (challenge.toLowerCase() == "make 5 great curveball throws in a row")
        {
          reward = "Spinda #5 Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 great throws in a row")
        {
          reward = "Onyx Encounter";
        }
        else if (challenge.toLowerCase() == "make 3 excellent throws in a row")
        {
          reward = "Larvitar Encounter";
        }
        /*else if (challenge.toLowerCase() == "make 5 great throws in a row")
        {
          reward = "Wigglytuff Encounter";
        }*/
        
        //Evolve and Power Uo challenge encounters
        else if (challenge.toLowerCase() == "evolve a pokemon")
        {
          reward = "Eevee/Sunkern Encounter";
        }
        else if (challenge.toLowerCase() == "evolve a pokemon using an item")
        {
          reward = "Aerodactyl Encounter";
        }
        /*else if (challenge.toLowerCase() == "evolve 2 pidgey")
        {
          reward = "Caterpie Encounter";
        }*/
        /*else if (challenge.toLowerCase() == "evolve 5 fire type pokemon")
        {
          reward = "Ninetales Encounter";
        }*/
        /*else if (challenge.toLowerCase() == "evolve 10 water type pokemon")
        {
          reward = "Dratini Encounter";
        }*/
        /*else if (challenge.toLowerCase() == "power up pokemon 3 times")
        {
          reward = "Koffing Encounter";
        }*/
        else if (challenge.toLowerCase() == "power up pokemon 5 times")
        {
          reward = "Squirtle/Charmander/Bulbasaur Encounter";
        }
        
        //Hatch challenge encounters
        else if (challenge.toLowerCase() == "hatch an egg")
        {
          reward = "Exeggcute/Snubbull Encounter";
        }
        /*else if (challenge.toLowerCase() == "hatch 2 eggs")
        {
          reward = "Wailmer Encounter";
        }*/
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
          reward = "Mankey/Machop Encounter";
        }
        else if (challenge.toLowerCase() == "battle in a gym 5 times")
        {
          reward = "Machop Encounter";
        }
        else if (challenge.toLowerCase() == "win 5 gym battles")
        {
          reward = "Lapras Encounter";
        }
        else if (challenge.toLowerCase() == "win 3 gym battles")
        {
          reward = "Jynx Encounter";
        }
        else if (challenge.toLowerCase() == "win a gym battle")
        {
          reward = "Squirtle/Charmander/Bulbasaur Encounter";
        }
        else if (challenge.toLowerCase() == "use a suppereffective charge attack in 7 gym battles")
        {
          reward = "Electabuzz Encounter";
        }
        else if (challenge.toLowerCase() == "battle in a raid")
        {
          reward = "Drowzee Encounter";
        }
        else if (challenge.toLowerCase() == "win a level 3 raid or higher")
        {
          reward = "Omnimite Encounter";
        }
        else if (challenge.toLowerCase() == "win 5 raids")
        {
          reward = "Aerodactyl Encounter";
        }
        
        //Misc
        else if (challenge.toLowerCase() == "send 2 gifts to friends")
        {
          reward = "Gastley Encounter";
        }
        else if (challenge.toLowerCase() == "earn 5 candies walking with your buddy")
        {
          reward = "Tentacruel Encounter";
        }
        else if (challenge.toLowerCase() == "trade a pokemon")
        {
          reward = "Manectric Encounter";
        }
        else if (challenge.toLowerCase() == "transfer 3 pokemon")
        {
          reward = "Vulpix Encounter";
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
          "description": wellnessSummary + '\n' + istSummary + '\n' + sdcSummary + '\n' + farstopSummary
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
          "description": wellnessSummary + '\n' + istSummary + '\n' + sdcSummary + '\n' + farstopSummary
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
          "description": wellnessSummary + '\n' + istSummary + '\n' + sdcSummary + '\n' + farstopSummary
          }
        });
      }
      else if (stopName == 'sdc')
      {
        sdcSummary = '**SDC:**\n' + date + '\n' + challenge + '\n' + reward;
        console.log("SDC research updated");
        message.channel.send("SDC Research Updated!");
        message.channel.send
        ({
        "embed":
          {
          "color": 3447003,
          "title": "Field Research",
          "description": wellnessSummary + '\n' + istSummary + '\n' + sdcSummary + '\n' + farstopSummary
          }
        });
      }
      else
      {
        console.log("stopError on field command");
        message.channel.send("Please try again. You have mispelled the Pokestop name. Please try \'wellness\', \'ist\', \'sdc\', or \'far stop\'");
      }
    }
  }

  rsummary(prefix, message)
  {
     message.channel.send({
        "embed": {
          "color": 3447003,
          "title": "Field Research",
          "description": wellnessSummary + '\n' + istSummary + '\n' + sdcSummary + '\n' + farstopSummary
          }
       });
  }
}
