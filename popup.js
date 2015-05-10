function requestLinks() {
  var regexpInput = document.getElementById("regexp-input").value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {search: regexpInput}, 
    function(response) {
      console.log(response);
      var div = document.getElementById("cnt");
      var pre = document.createElement("PRE");
      pre.innerHTML = response.clip
      div.appendChild(pre);
    });
  });
}


console.log("Adding callbacks...")
document.getElementById("search-input").addEventListener("click", function() {
  console.log("clicked!")
  requestLinks();
});


