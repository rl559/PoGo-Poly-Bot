module.exports = class GymNotice
{
  process(message, prefix)
  {
    var mapping = {};
    mapping.a = " :regional_indicator_a: ";
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
    mapping.z = " :regional_indicator_z: ";
    
    var msgText = message.content.replace(".b ", "");
    
    var newMsg = '';
    
    for(var i=0; i<msgText.length; i++)
    {
      mappingVal = mapping[msgText.charAt(i)];
      if (mappingVal)
        newMsg = newMsg + mappingVal;
      else if (msgText[i] === "?")
        newMsg = newMsg + " :question: ";
      else if (msgText[i] === "!")
        newMsg = newMsg + " :exclamation: ";
      else if (msgText[i] === " ")
        newMsg = newMsg + "    ";
      else
        newMsg = newMsg + msgText[i];
    }
    console.log(newMsg);
  }
}