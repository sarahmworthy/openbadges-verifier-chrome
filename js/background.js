/*global $, chrome, console, OpenBadges */

(function () {
	'use strict';

	chrome.browserAction.onClicked.addListener(function (tab) {
		chrome.tabs.sendMessage(tab.id, '');
	});

/*
	OpenBadges.Displayer.getAll('eldwin.liew@gmail.com',
		function (profile) {
			console.log(profile);
		},
		function (error) {
			console.log(error);
		}
	);
*/
}());