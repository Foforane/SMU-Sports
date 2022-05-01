/*function Copy() {
    var Url = document.getElementById("url");
    Url.innerHTML = window.location.href;
    console.log(Url.innerHTML)
    Url.select();
    document.execCommand("copy");
  }*/
  function Copy(){
  var inputc = document.body.appendChild(document.createElement("input"));
  inputc.value = window.location.href;
  inputc.focus();
  inputc.select();
  document.execCommand('copy');
  inputc.parentNode.removeChild(inputc);
 
  swal("Link Copied", "URL Copied You can now share the link with your friends", "success");

  }
  function feedback(){
    swal("Thanks for feedback", "T", "success");
  }