// Generated by CoffeeScript 1.12.5
var childProcess, cmd, exec, fs, i3, log, mpd, out, reload, write;

log = console.log;

childProcess = require('child_process');

exec = childProcess.exec;

fs = require('fs');

write = fs.writeFile;

i3 = require('i3').createClient();

mpd = require('mpd');

cmd = mpd.cmd;

setInterval(function() {
  exec("node ~/.config/i3/mpd/mpd.js", [], function(err, stdout, stderr) {
    out.p.mpd = stdout.replace("\n", "");
    return out.draw();
  });
}, 5000);

setInterval(function() {
  exec("~/.config/i3/scripts/lemonbar", [], function(err, stdout, stderr) {
    out.p.info = stdout.replace("\n", "");
    return out.draw();
  });
}, 6234);

out = {
  p: {
    left: "",
    center: "",
    right: "",
    workspaces: "",
    mpd: "",
    info: ""
  },
  draw: function() {
    this.p.left = "%{l}  " + this.p.mpd;
    this.p.center = "%{c}%{B#11CCCCCC} " + this.p.workspaces + " %{B-}";
    this.p.right = "%{r}" + this.p.info;
    this.p.out = this.p.left + this.p.center + this.p.right;
    return log(this.p.out);
  }
};

reload = function() {
  return exec('i3-msg -t get_workspaces', [], function(err, stdout, stderr) {
    var center, i, left, len, mas, work;
    mas = JSON.parse(stdout);
    left = '';
    center = '';
    out.p.workspaces = "";
    for (i = 0, len = mas.length; i < len; i++) {
      work = mas[i];
      if (!work.focused) {
        out.p.workspaces += " " + work.name + " ";
      } else {
        out.p.workspaces += "%{F#F78C06} " + work.name + " %{F-}";
      }
    }
    return out.draw();
  });
};

reload();

i3.on('workspace', function() {
  return reload();
});
