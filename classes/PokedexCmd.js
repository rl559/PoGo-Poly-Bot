pokedex = require('../pokedex.js');
module.exports = class PokedexCmd
{
display(prefix, message){
  var pattern = prefix + "pokedex";
  var query = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().toLowerCase();
  var pokemon = pokedex(query);
  var typeValue = '';
  var weaknessValue = '';
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
    Object.keys(pokemon.chargeMoves).forEach(function (key) {
      chargedMoves += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ": - " + pokemon.chargeMoves[key].power;
      if (pokemon.chargeMoves[key].dps !== null && typeof pokemon.chargeMoves[key].dps !== 'undefined') {
        chargedMoves += " | DPS " + pokemon.chargeMoves[key].dps + "\n";
      } else {
        chargedMoves += "\n";
      }
    });

    Object.keys(pokemon.quickMoves).forEach(function (key) {
      quickMoves += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ": - " + pokemon.quickMoves[key].power;
      if (pokemon.quickMoves[key].dps !== null && typeof pokemon.quickMoves[key].dps !== 'undefined') {
        quickMoves += " | DPS " + pokemon.quickMoves[key].dps + "\n";
      } else {
        quickMoves += "\n";
      }
    });

    Object.keys(pokemon.stats).forEach(function (key) {
      statsValue += key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ": " + pokemon.stats[key] + "\n";
    });
    var evolveTo = pokemon.evolveTo;
    var evolveFrom = pokemon.evolveFrom;
    if(evolveTo === undefined || evolveTo === "") evolveTo = "None"
    if(evolveFrom === undefined || evolveTo === "") evolveFrom = "None"
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
          "name": "Weaknesse(s)",
          "value": weaknessValue,
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
          "name": "Charged Move(s)",
          "value": chargedMoves,
          "inline": true
        }, {
          "name": "Quick Move(s)",
          "value": quickMoves,
          "inline": true
        },
        {
          "name": "Flee Rate",
          "value": pokemon.fleeRate.toString(),
          "inline": true
        },
        {
          "name": "Evolve To/From",
          "value": evolveTo.toString()+"/"+evolveFrom.toString(),
          "inline": true
        }
      ]
      }
    });
  }
}
}