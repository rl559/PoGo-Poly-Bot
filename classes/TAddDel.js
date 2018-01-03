const raid1Pattern = new RegExp(/L1|level 1|L1|T1|tier 1|Tier 1/i),
raid2Pattern = new RegExp(/L2|level 2|L2|tier 2|Tier 2|T2/i),
raid3Pattern = new RegExp(/L3|level 3|L3|tier 3|Tier 3|T3/i),
raid4Pattern = new RegExp(/L4|level 4|L4|tier 4|Tier 4|T4/i),
raid5Pattern = new RegExp(/L5|level 5|L5|tier 5|Tier 5|T5/i),
adminPattern = new RegExp(/admin|bot|mod/i);

module.exports = class TAddDel
{
tadd(prefix, message)
{
  let pattern = prefix + "tadd";
  let roles = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().split(",");
  let rolesFound = [];
  let rolesFoundNames = [];
  roles.forEach(function (item, index) {
    let theRole = item.trim();
      if(raid1Pattern.test(theRole))
      {
        theRole = "T1";
      }
      else if(raid2Pattern.test(theRole))
      {
        theRole = "T2";
      }
      else if(raid3Pattern.test(theRole))
      {
        theRole = "T3";
      }
      else if(raid4Pattern.test(theRole))
      {
        theRole = "T4";
      }
      else if(raid5Pattern.test(theRole))
      {
        theRole = "T5";
      }
      else {
        if(theRole !=="all") theRole = 'undefined';
      }
    let role = ( typeof message.guild.roles !== 'undefined' ) ? message.guild.roles.find("name", theRole) : 'undefined';
    let isAdmin = adminPattern.test(theRole);
    if (role !== null && role !== 'undefined' && isAdmin === false) {
      rolesFound.push(role);
      rolesFoundNames.push(theRole);
    }
    if(theRole === "all")
    {
      let tier1 = message.guild.roles.find("name", "T1");
      let tier2 = message.guild.roles.find("name", "T2");
      let tier3 = message.guild.roles.find("name", "T3");
      let tier4 = message.guild.roles.find("name", "T4");
      let tier5 = message.guild.roles.find("name", "T5");
      rolesFound.push(tier1);
      rolesFoundNames.push("T1");
      rolesFound.push(tier2);
      rolesFoundNames.push("T2");
      rolesFound.push(tier3);
      rolesFoundNames.push("T3");
      rolesFound.push(tier4);
      rolesFoundNames.push("T4");
      rolesFound.push(tier5);
      rolesFoundNames.push("T5");
    }
  });
  message.member.addRoles(rolesFound).then(member => {
    let rolesAdded = rolesFoundNames.join();
    if (rolesAdded.length > 0) {
      message.channel.send(`${message.author} I added this role(s) for you ${rolesAdded}`);
    } else {
      message.channel.send(`${message.author} I could't add any role(s) for you, either you are already part of them or you enter the wrong role name.`);
    }
  }).catch(error => {
    if (error) {
      message.channel.send(`${message.author} oops I'm having hiccups please try again in a few seconds.`);
    }
  });
}
tdel(prefix, message)
{
  let pattern = prefix + "tdel";
  let roles = message.content.substr(message.content.indexOf(pattern) + pattern.length).trim().split(",");
  let rolesFound = [];
  let rolesFoundNames = [];
  roles.forEach(function (item, index) {
    let theRole = item.trim();
    if(raid1Pattern.test(theRole))
    {
      theRole = "T1";
    }
    else if(raid2Pattern.test(theRole))
    {
      theRole = "T2";
    }
    else if(raid3Pattern.test(theRole))
    {
      theRole = "T3";
    }
    else if(raid4Pattern.test(theRole))
    {
      theRole = "T4";
    }
    else if(raid5Pattern.test(theRole))
    {
      theRole = "T5";
    }
    else{
      if(theRole !=="all")
      {
        theRole = 'undefined';
      }
    }
    let role = ( typeof message.guild.roles !== 'undefined' ) ? message.guild.roles.find("name", theRole) : 'undefined';
    let isAdmin = adminPattern.test(theRole);
    if (role !== null && role !== 'undefined' && isAdmin === false) {
      rolesFound.push(role);
      rolesFoundNames.push(theRole);
    }
    if(theRole === "all")
    {
      let tier1 = message.guild.roles.find("name", "T1");
      let tier2 = message.guild.roles.find("name", "T2");
      let tier3 = message.guild.roles.find("name", "T3");
      let tier4 = message.guild.roles.find("name", "T4");
      let tier5 = message.guild.roles.find("name", "T5");
      rolesFound.push(tier1);
      rolesFoundNames.push("T1");
      rolesFound.push(tier2);
      rolesFoundNames.push("T2");
      rolesFound.push(tier3);
      rolesFoundNames.push("T3");
      rolesFound.push(tier4);
      rolesFoundNames.push("T4");
      rolesFound.push(tier5);
      rolesFoundNames.push("T5");
    }
  });
  message.member.removeRoles(rolesFound).then(member => {
    let rolesAdded = rolesFoundNames.join();
    if (rolesAdded.length > 0) {
      message.channel.send(`${message.author} I removed this role(s) for you ${rolesAdded}`);
    } else {
      message.channel.send(`${message.author} I could't remove any role(s) for you, either you've already remove it or you enter the wrong role name.`);
    }
  }).catch(error => {
    if (error) {
      message.channel.send(`${message.author} oops I'm having hiccups please try again in a few seconds.`);
    }
  });
}
}