// Generated by CoffeeScript 1.12.5
var child, client, command, exec, log, mpdclient, str, work;

mpdclient = require('mpdclient.js');

child = require('child_process');

exec = child.exec;

client = new mpdclient.MPDClient('localhost', 6600);

command = new mpdclient.MPDCommand('status');

log = console.log;

str = '';

work = 0;

exec('mpc status', function(err, stdout, stderr) {
  var track;
  if (stdout.match('playing')) {
    str += ' %{A:mpc toggle:}%{A} ';
    work = 1;
  }
  if (stdout.match('paused')) {
    str += ' %{A:mpc toggle:}%{A} ';
    work = 1;
  }
  if (work) {
    track = stdout.split('\n')[0];
    str = track + str;
  }
  if (stdout.match('single: on')) {
    str += '  ';
  }
  return log(str);
});
