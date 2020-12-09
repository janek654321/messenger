function getSource() {
  try {
return new XMLHttpRequest();
  } catch (error) {}
  try {
return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (error) {}
  try {
return new ActiveXObject("Microsoft.XMLHTTP");
  } catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

document.write("<html><title>Messenger Statistics</title><head><script></script></head><body>");
var data = "";
var accountID = "";
var otherUserIDs;
var otherUserIDsCnt;
var messagesCount;
var messagesCountCnt;
var i;
var workOn;

var request = getSource();
request.open("GET", "https://www.messenger.com/", true);
request.send(null);
request.onreadystatechange = function() {
  if (request.readyState == 4) {
data = request.responseText;
var accountIDRaw = String(data.match(/ACCOUNT_ID":"[0-9]+/));
accountID = String(accountIDRaw.match(/\d+/));
document.title = "Messenger Statistics";
document.write('Your account ID is ' + accountID + '. ');
document.write('Open this link in a new tab to verify.'.link("https://www.facebook.com/" + accountID));
document.write('<br><br>');
otherUserIDs = data.match(/other_user_id":(null|"[0-9]+)/g);
otherUserIDsCnt = data.match(/other_user_id":(null|"[0-9]+)/g).length;
messagesCount = data.match(/messages_count":[0-9]+/g);
messagesCountCnt = data.match(/messages_count":[0-9]+/g).length;
if (messagesCountCnt === otherUserIDsCnt) {
  var loopUntil = messagesCountCnt;
  for (i = 0; i < loopUntil; i++) {
if (otherUserIDs[i] != null) {
  workOn = (String)(otherUserIDs[i].match(/\d+/));
  document.write(workOn.link("https://www.facebook.com/" + workOn));
}
else {
  document.write("Unknown group");
}
document.write(" - ");
document.write(messagesCount[i].match(/\d+/));
document.write("<br>");
  }
}
else alert("Count of messages and count of other users does not match!");
  }
}
document.write("</body></html>");
