const TwitterStream = require('twitter-stream-api');
var twitterKeys = {
	consumer_key : process.env.tconsumer,
	consumer_secret : process.env.tcsecret,
	token : process.env.ttoken,
	token_secret : process.env.ttokensec
},
	Twitter = new TwitterStream(twitterKeys, false),
	//2839430431 = https://twitter.com/PokemonGoApp
	//849344094681870336 = https://twitter.com/NianticHelp REMOVED, SPAM
	//575930104 = https://twitter.com/metaphorminute  REMOVED, FOR TESTING
	
	twitterUsers = [ '2839430431']; //
module.exports = class TwitterMsgs
{
  display(client)
  {
    Twitter.stream('statuses/filter', {
    	follow: twitterUsers
    });

    Twitter.on('connection success', function (uri) {
        console.log('connection success', uri);
    });

    Twitter.on('data', function (obj) {
    	console.log('message received');
        let tweet = JSON.parse(obj.toString()),
    		messageContent = '';
    		console.log(tweet);
    	if(typeof tweet.user !== 'undefined' && tweet.user !== null && tweet.in_reply_to_status_id === null && tweet.in_reply_to_user_id === null){
    		console.log(tweet.user.id_str);
    		if( twitterUsers.includes( tweet.user.id_str ) ){
    			console.log("User matches followed users");
    			messageContent = `@everyone BREAKING NEWS from ${tweet.user.screen_name} https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    			client.guilds.forEach((item, index)=>{
    				let announcements = '';
    				announcements = item.channels.find('name', 'announcements');
    				if ( announcements ) {
    					announcements.send( messageContent );
    				}
    			});
    		}
    	}
    });
  }
}