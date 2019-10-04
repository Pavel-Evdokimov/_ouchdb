var evtSource = new EventSource('http://z14-0774-opndfb.vesta.ru:5984/couch/_changes?filter=country/level&level=Elementary&feed=eventsource&since=now');

evtSource.onmessage = function(e) {
  console.log(e);
}