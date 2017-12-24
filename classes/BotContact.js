const helloPattern = new RegExp(/\bhi\b|\bhello\b|\bgreetings\b|\bhey\b/i),
holaPattern = new RegExp(/\bhola\b/i),
thanksPattern = new RegExp(/\bthanks\b|\bthank\b|\bthank\b \byou\b|\bthank\b \bu\b|\bthx\b|\bthxs\b/i),
graciasPattern = new RegExp(/\bgracias\b/i);

module.exports = class BotContact
{
  display(message)
  {
    let response = '';
    if( helloPattern.test(message.content) ){
     response = `Hi! ${message.author} if you are having trouble try using the \`.help\` command or contacting an admin while I learn how to do more helpful things.`;
   }else if( holaPattern.test(message.content) ){
     response = `Hola ${message.author} un gusto ayudarte, si estas teniendo algun problema usa el \`.help\` command o contacta a un admin mientras yo aprendo como hacer mas cosas para ayudarte.`;
   }else if( thanksPattern.test(message.content) ){
     response = `You're Welcome! ${message.author} glad to help, if you are having trouble try using the \`.help\` command or contacting an admin while I learn how to do more helpful things.`;
   }else if( graciasPattern.test(message.content) ){
     response = `De nada! ${message.author} un gusto ayudarte, si estas teniendo algun problema usa el \`.help\` command o contacta a un admin mientras yo aprendo como hacer mas cosas para ayudarte.`;
   }else{
     response = `Wattup? ${message.author} if you are having trouble try using the \`.help\` command or contacting an admin while I learn how to do more helpful things.`;
   }
 
   if( response ){
     message.channel.send(response);
   }
  }
}