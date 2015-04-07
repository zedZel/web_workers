var xhr = new XMLHttpRequest();
var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=fuzzy%20monkey";
xhr.open("GET", url, true );
xhr.send();
if(xhr.onreadystatechange === 4) {
	var resp = xhr.responseText;
	console.log(resp);
}

self.addEventListener('message', function(e) {
  var data = e.data;
  console.log(data);
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      self.postMessage(JSON.stringify(data));
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg +
                       '. (buttons will no longer work)');
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
      self.postMessage(JSON.stringify(data));
  };
}, false);