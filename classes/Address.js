module.exports = class Address
{
display(message, prefix, GMapsObj)
{
  let pattern = prefix + "address";
  let query = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim();
  if( !(/broward/i).test(query) ){
    query = query + " Broward";
  }
  if( !(/fl|florida/i).test(query) ){
    query = query + ", Florida";	
  }
  let addressResult = GMapsObj.getAddress(query, function displayAddress(mapUrl, formatAddress, mapImage)
  {
          if(mapUrl !== '')
          {
          message.channel.send(`${message.author} here is your address ${formatAddress}`, {
            "embed": {
              "color": 3447003,
              "title": query,
              "url": mapUrl,
              "description": "click on the title to go to google maps.",
              "image": {
                "url": mapImage
              },
            }
          });
        }


      else {
        message.channel.send(`${message.author} couldn't find what you where looking for`);
      }
  });
}
}