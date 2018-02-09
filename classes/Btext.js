module.exports = class GymNotice
{
  process(message, prefix)
  {
    var mapping = {};
    /*mapping.a = " :regional_indicator_a: ";
    mapping.b = " :regional_indicator_b: ";
    mapping.c = " :regional_indicator_c: ";
    mapping.d = " :regional_indicator_d: ";
    mapping.e = " :regional_indicator_e: ";
    mapping.f = " :regional_indicator_f: ";
    mapping.g = " :regional_indicator_g: ";
    mapping.h = " :regional_indicator_h: ";
    mapping.i = " :regional_indicator_i: ";
    mapping.j = " :regional_indicator_j: ";
    mapping.k = " :regional_indicator_k: ";
    mapping.l = " :regional_indicator_l: ";
    mapping.m = " :regional_indicator_m: ";
    mapping.n = " :regional_indicator_n: ";
    mapping.o = " :regional_indicator_o: ";
    mapping.p = " :regional_indicator_p: ";
    mapping.q = " :regional_indicator_q: ";
    mapping.r = " :regional_indicator_r: ";
    mapping.s = " :regional_indicator_s: ";
    mapping.t = " :regional_indicator_t: ";
    mapping.u = " :regional_indicator_u: ";
    mapping.v = " :regional_indicator_v: ";
    mapping.w = " :regional_indicator_w: ";
    mapping.x = " :regional_indicator_x: ";
    mapping.y = " :regional_indicator_y: ";
    mapping.z = " :regional_indicator_z: ";*/
    
    mapping.a = " 🇦 ";
    mapping.b = " 🇧 ";
    mapping.c = " 🇨 ";
    mapping.d = " 🇩 ";
    mapping.e = " 🇪 ";
    mapping.f = " 🇫 ";
    mapping.g = " 🇬 ";
    mapping.h = " 🇭 ";
    mapping.i = " 🇮 ";
    mapping.j = " 🇯 ";
    mapping.k = " 🇰 ";
    mapping.l = " 🇱 ";
    mapping.m = " 🇲 ";
    mapping.n = " 🇳 ";
    mapping.o = " 🇴 ";
    mapping.p = " 🇵 ";
    mapping.q = " 🇶 ";
    mapping.r = " 🇷 ";
    mapping.s = " 🇸 ";
    mapping.t = " 🇹 ";
    mapping.u = " 🇺 ";
    mapping.v = " 🇻 ";
    mapping.w = " 🇼 ";
    mapping.x = " 🇽 ";
    mapping.y = " 🇾 ";
    mapping.z = " 🇿 ";
    
    
    var msgText = message.content.replace(".b ", "").toLowerCase();
    
    var newMsg = '';
    

    for(var i=0; i<msgText.length; i++)
    {
      var mappingVal = mapping[msgText.charAt(i)];
      if (mappingVal)
        newMsg = newMsg + mappingVal;
      else if (msgText[i] === "?")
        //newMsg = newMsg + " :question: ";
        newMsg = newMsg + " ❓ ";
      else if (msgText[i] === "!")
        //newMsg = newMsg + " :exclamation: ";
        newMsg = newMsg + " ❗ ";
      else if (msgText[i] === " ")
        newMsg = newMsg + "    ";
      else
        newMsg = newMsg + msgText[i];
    }
    if(newMsg.length < 2000)
    message.channel.send(`${message.author} said: ${newMsg}`).then(function (result){message.delete();});
    else
    message.channel.send(`${message.author} please try something shorter`).then(function (result){message.delete();});
  }
}