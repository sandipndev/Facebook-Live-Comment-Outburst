var EventSource = require("eventsource");
var request = require('request');

var url = "http://127.0.0.1:5000/say/"

// ENTER VIDEO ID HERE
var live_video_id = ""

// ENTER USER ACCESS TOKEN HERE
var access_token = ""

var source = new EventSource(`https://streaming-graph.facebook.com/${live_video_id}/live_comments?access_token=${access_token}&comment_rate=one_per_two_seconds&fields=from{name,id},message`);
source.onmessage = function(event) {
	msg = JSON.parse(event.data);
    console.log(msg["message"]);
    request({url:url, qs:{'t': msg["message"]}}, () => {
        console.log("Done playing " + msg["message"]);
    });
};


// Just to keep the script running
const http = require('http');

let app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});

app.listen(3000);