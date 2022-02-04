//loop over all html links
function unmangleAllLinks(){
  var links = document.body.getElementsByTagName("a");
  for(var i = 0; i < links.length; i++) {
    unmangleLink(links[i]);
  }
}

//fix a link
function unmangleLink(a){
  if(a.hostname.endsWith('safelinks.protection.outlook.com') == false){
    return;
  }
  //remember original url
  var orgUrl = a.href;

  // whether to unmangle active links (set 'false' if you want links to remain mangled)
  var prefUnmangle = false
  
  // whether to include original link as mouseover title (if false, title will simply say 'UNMANGLED')
  var prefAmendTitle = true
  var prefTitleOrigLink = false
  var defaultTitle = "SAFE LINK" // what to show if AmendTitle and link is untouched

  // Test to see if we should replace the content of the link with a demangled URL
  // JP: updated this to check textContent instead of innerHTML to avoid messing up eg Twitter notification emails
  var doInner = false;
  if(a.textContent.includes('safelinks.protection.outlook.com')) {
    defaultTitle = "SAFE LINK, TEXT IS UNMANGLED"
    doInner = true;
  }

  // query string, with leading '?' removed, is split by '&' delimiter to give separate terms
  var terms = a.search.replace(/^\?/, '').split('&');

  // iterate through the terms
  for(var i = 0; i < terms.length; i++) {
    var s = terms[i].split('='); // split terms by '=' to give field name and value
    if(s[0] == 'url') { // when we get to 'url', we're ready to unmangle the link
      if(prefUnmangle){
        a.href = decodeURIComponent(s[1])
        console.log("Rewrote "+orgUrl+" to "+a.href);
        defaultTitle = "UNMANGLED LINK"
      }
      
      if(prefAmendTitle){
        title = defaultTitle
        if(prefTitleOrigLink){
          title = title + ". Original Safe Link:\n" + orgUrl;
        }
        a.title = title
      }

      if(doInner){
        //a.textContent = a.href;
        a.textContent = unmangleContent(a.textContent);
      }
      return;
    }
  }
}

function decodeURI(match, p1, offset, string){
  return decodeURIComponent(p1);
}

function unmangleContent(text){
  // in contrast to unmangleLink above, this assumes that the URL is in the first term of the URL query string
  text = text.replace(/https:\/\/[^\.]+\.safelinks\.protection\.outlook\.com\/\?url=([^&]*)&[^>\s]*/g, decodeURI);
  return text;
}

console.log("Start unmangle links")
//First, unmangle the links
unmangleAllLinks()
//Then unmangle any texts :
//document.body.innerHTML = unmangleContent(document.body.innerHTML);

// vim: ts=2:sw=2:et
