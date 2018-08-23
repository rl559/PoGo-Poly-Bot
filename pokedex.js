// JavaScript Document
/* jshint esversion: 6 */
/* jshint node: true */
/** pokemon.js | list of pokemon data **/
var pokemonData = require('./data/pokemon.json'),
	pokedex = function( search, messageInfo = null ) {
	if (typeof search === "object")
	{
		if (JSON.stringify(pokemonData) !== JSON.stringify(search)) {
			pokemonData = search;
			if (messageInfo !== null) {
				messageInfo.channel.send("`Pokedex updated!``");
			}
		}  else if (messageInfo !== null) {
				messageInfo.channel.send("`No pokedex updates`");
		}
	}
	//console.log(pokemonData[search]);
	else if( pokemonData[search] !== undefined ){
		return pokemonData[search];
	}
	else if( pokemonData[search.replace(/ /g,"-")] !== undefined ){
		return pokemonData[search.replace(/ /g,"-")];
	}
	else{
		for(var pokemon in pokemonData)
		{
			if(pokemonData[pokemon].id === parseInt(search))
			{
				return pokemonData[pokemon];
			}
		}
		return null;
	}
};

// Attach ourselves to wherever we go!
(function(pokedex){
  // Export to node or the browser, whichever is being used!
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = pokedex;
  } else {
    window.pokedex = pokedex;
  }
})(pokedex);

//var pokemon = pokedex("bulbasaur");
//console.log(pokemon);