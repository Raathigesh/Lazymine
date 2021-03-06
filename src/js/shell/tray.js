/*global require*/
var gui = require('nw.gui');
var currentVersion = gui.App.manifest.version;
var updaterEnabled = true;

if(updaterEnabled)
{
    var updater = require('nw-updater')({'channel':'beta', 'currentVersion': currentVersion, 'endpoint':'https://raw.githubusercontent.com/Raathigesh/Lazymine/master/update.json'});
}

var newUpdateAvailabilityCallback;
var newUpdateInstalledCallback;

(function () {
    "use strict";
    // Reference to window and tray
    var win = gui.Window.get(),
        menu = new gui.Menu(),
        tray;

    // Show tray
    tray = new gui.Tray({
        icon: 'assets/icon_16.png'
    });

    tray.on('click', function () {
        win.show();
    });

    menu.append(new gui.MenuItem({
        label: "Show",
        click: function () {
            win.show();
        }
    }));

   menu.append(new gui.MenuItem({
        label: "Show Dev Console",
        click: function () {
          win.showDevTools();
        }
    }));

    if(updaterEnabled){
        updater.on("download", function(version) {
            newUpdateAvailabilityCallback(version);
        });

        updater.on("installed", function() {
            newUpdateInstalledCallback();
        });
    }


    menu.append(new gui.MenuItem({ type: 'separator' }));

    menu.append(new gui.MenuItem({
        label: "Exit",

        click: function () {
            gui.App.quit();
        }
    }));

    tray.menu = menu;
}());

var checkForUpdate = function (callback, installedCallback) {
    newUpdateAvailabilityCallback =  callback;
    newUpdateInstalledCallback = installedCallback;
    if(updaterEnabled){
        updater.check();
    }
}

var installUpdate = function () {
    if(updaterEnabled){
        updater.update();
    }
}
