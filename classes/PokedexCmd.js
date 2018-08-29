pokedex = require('../pokedex.js');
rp = require('request-promise');
cheerio = require('cheerio');

async function getPower(asyncCallsToMake)
{
  const promises = asyncCallsToMake.map(async call => {
    options = {
      uri: `https://pokemongo.gamepress.gg/pokemon-move/`+call.replace(/ /g,"-"),
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    toReturn = ""
    toReturnObj = {}
    response = {}
    response = await rp(options).then($ => { toReturn = $('div.field--name-field-move-damage').text(); toReturnObj[call] = toReturn; return toReturnObj}).catch((err)=>{toReturn = "err"; toReturnObj[call] = toReturn; return toReturnObj})
    return response
  })
  
  results = await Promise.all(promises)
  console.log(results)
  
  
  
  /*.then(($) => {
    toReturn = $('div.field--name-field-move-damage').text()
    console.log(toReturn)
  return toReturn;
  })
  .catch((err) => {
    return "";
  });*/
}

function cap(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = class PokedexCmd
{  
display(prefix, message){
  var pattern = prefix + "pokedex";
  var query = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().toLowerCase();
  var pokemon = pokedex(query);
  var typeValue = '';
  var weaknessValue = '';
  var resistanceValue = '';
  var quickMoves = '';
  var chargedMoves = '';
  var statsValue = '';
  
  //console.log( pokemon );
  if (typeof pokemon === 'undefined' || pokemon === null ) {
    message.channel.send(`${message.author} I couldn't find a pokedex entry for ${query}`);
  } else {
    function getEmoji(name) {
      var emojiId = '';
      message.guild.emojis.forEach(function (item, index) {
        if (item.name === name) {
          emojiId = item.id;
        }
      });

      return emojiId;
    }

    pokemon.type.forEach(function (item, index) {
      var emojiId = getEmoji('type' + item);
      //console.log(emojiId);
      typeValue += '<:type' + item + ':' + emojiId + '> ';
    });
    Object.keys(pokemon.weaknesses).forEach(function (key) {
      var itemValue = key.toLocaleLowerCase();
      var amount = pokemon.weaknesses[key];
      var emojiId = getEmoji('type' + itemValue);
      //console.log(emojiId);
      weaknessValue += '<:type' + itemValue + ':' + emojiId + '> (' + amount + ')';
    });
    Object.keys(pokemon.resistances).forEach(function (key) {
      var itemValue = key.toLocaleLowerCase();
      var amount = pokemon.resistances[key];
      var emojiId = getEmoji('type' + itemValue);
      //console.log(emojiId);
      resistanceValue += '<:type' + itemValue + ':' + emojiId + '> (' + amount + ')';
    });
    
    var asyncCallsToMake = []
    
    Object.keys(pokemon.chargeMoves).forEach(function (key) {
      chargedMoves += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ((pokemon.chargeMoves[key].power != null) ? (": " + pokemon.chargeMoves[key].power) : ": "+(function(key){asyncCallsToMake.push(key); return key;})(String(key)));
      if (pokemon.chargeMoves[key].dps !== null && typeof pokemon.chargeMoves[key].dps !== 'undefined') {
        chargedMoves += " | DPS " + pokemon.chargeMoves[key].dps + "\n";
      } else {
        chargedMoves += "\n";
      }
    });

    Object.keys(pokemon.quickMoves).forEach(function (key) {
      quickMoves += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ((pokemon.quickMoves[key].power != null) ? (": " + pokemon.quickMoves[key].power) : ": "+(function(key){asyncCallsToMake.push(key); return key;})(String(key)));
      if (pokemon.quickMoves[key].dps !== null && typeof pokemon.quickMoves[key].dps !== 'undefined') {
        quickMoves += " | DPS " + pokemon.quickMoves[key].dps + "\n";
      } else {
        quickMoves += "\n";
      }
    });
    
    //if asyncCallsToMake not empty, do async stuff and call following, otherwise just call following
    getPower(asyncCallsToMake, chargedMoves, quickMoves)

    Object.keys(pokemon.stats).forEach(function (key) {
      statsValue += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ": " + pokemon.stats[key] + "\n";
    });
    var evolveTo = pokemon.evolveTo;
    var evolveFrom = pokemon.evolveFrom;
    if(evolveFrom && evolveFrom.constructor === Array)
    {
      for(var i=0; i<evolveFrom.length; i++)
      {
        evolveFrom[i] = cap(evolveFrom[i]);
      }
    }
    if(evolveTo && evolveTo.constructor === Array)
    {
      for(var i=0; i<evolveTo.length; i++)
      {
        evolveTo[i] = cap(evolveTo[i]);
      }
    }
    if(evolveTo === undefined || evolveTo === "") evolveTo = "None"
    if(evolveFrom === undefined || evolveFrom === "") evolveFrom = "None"
    message.channel.send(`${message.author} here is your pokedex result for ${query}`, {
      "embed": {
        "color": 3447003,
        "title": `**${pokemon.id}** ` + pokemon.name,
        "thumbnail": {
          "url": pokemon.img
        },
        "fields": [{
          "name": "Type(s)",
          "value": typeValue,
          "inline": true
        }, {
          "name": "Weakness(es)/Resistance(s)",
          "value": "W: "+weaknessValue+"\nR: "+resistanceValue,
          "inline": true
        }, {
          "name": "Stats",
          "value": statsValue,
          "inline": true
        }, {
          "name": "MaxCP",
          "value": pokemon.maxCP,
          "inline": true
        }, 
        {
          "name": "Quick Move(s)",
          "value": quickMoves,
          "inline": true
        },
        {
          "name": "Charged Move(s)",
          "value": chargedMoves,
          "inline": true
        }, 
        {
          "name": "Flee Rate",
          "value": (Math.round(pokemon.fleeRate*100)).toString()+"%",
          "inline": true
        },
        {
          "name": "Evolve To/From",
          "value": cap(evolveTo.toString())+"/"+cap(evolveFrom.toString()),
          "inline": true
        }
      ]
      }
    });
  }
}
}