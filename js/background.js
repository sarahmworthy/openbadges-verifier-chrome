/*global $, chrome, console, OpenBadges */

(function () {
	'use strict';

	chrome.browserAction.onClicked.addListener(function (tab) {
		chrome.tabs.sendMessage(tab.id, '');
	});
}());