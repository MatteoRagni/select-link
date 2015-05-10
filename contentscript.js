function requestLinks(input) {
  var re = new RegExp(input);
  var link_re = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);
  var container = range.commonAncestorContainer;
  var text = container.innerHTML.toString();
  var matches, links = [];
  while (matches = link_re.exec(text)) {
    if (re.test(matches[1])) { links.push(matches[1]); }
  }
  console.log("Collected links:")
  console.log(links);
  return links;
}

function response(input) {
  console.log("Creating response...");
  var links = requestLinks(input);
  var res = ""
  for (var i = 0; i < links.length; i++) {
    res += (links[i] + "\n");
  }
  console.log("Response:");
  console.log(res)
  return {"clip":res};
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Incoming message...");
    console.log(request);
    console.log("Searching for keyword: " + request.search)
    if (request.search)
      sendResponse( response(request.search) );
  }
);


console.log("\n*****************************\n  CONTENT SCRIPT WAS LOADED \n *****************************\n");