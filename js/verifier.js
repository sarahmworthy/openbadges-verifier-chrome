/*global $, PNG, CryptoJS */

var OpenBadges = (function (openBadges) {
	'use strict';

	function callback(c) {
		if (typeof c === 'function') {
			c.apply(undefined, Array.prototype.slice.call(arguments, 1));
		}
	}

	openBadges.Verifier = {

		/**
		 * Extracts a badge assertionUrl from PNG image
		 *
		 * @param {String} url of the hosted assertion
		 * @param {Function} callback when verification succeeds (assertionUrl)
		 * @param {Function} callback when verification does not succeed (errorString)
		 */
		getAssertionUrl: function (imageUrl, successCallback, errorCallback) {
			if (typeof imageUrl !== 'string' || imageUrl.substr(imageUrl.length - 4) !== '.png') {
				callback(errorCallback, 'Invalid image link.');
				return;
			}

			PNG.load(imageUrl,
				function (png) {
					if (!png.text.openbadges) {
						callback(errorCallback, 'Not a badge.');
					} else {
						callback(successCallback, png.text.openbadges);
					}
				},
				function (error) {
					callback(errorCallback, error);
				}
			);
		},

		/**
		 * Fetches a badge assertion from assertionUrl
		 *
		 * @param {String} url of the hosted assertion
		 * @param {Function} callback when verification succeeds (assertion)
		 * @param {Function} callback when verification does not succeed  (errorString)
		 */
		getAssertion: function (assertionUrl, successCallback, errorCallback) {
			$.ajax({
				dataType: 'json',
				url: assertionUrl,
				success: function (assertion) {
					// what is valid response but no assertion text?!
					//console.log(assertion);
					//if (!assertion.badge) {
					//	callback(errorCallback, 'Invalid assertion.');
					//} else {
						callback(successCallback, assertion);
					//}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					if (errorThrown.name === 'SyntaxError') {
						callback(errorCallback, 'Assertion is not valid JSON string.');
					}
				}
			});
		},

		/**
		 * Verifies a badge against an email
		 *
		 * @param {String} recipient email
		 * @param {String} url of badge PNG image
		 * @param {Function} callback when verification succeeds (assertion)
		 * @param {Function} callback when verification does not succeed (errorString)
		 */
		verify: function (email, badgeUrl, successCallback, errorCallback) {
			openBadges.Verifier.getAssertionUrl(badgeUrl,
				function (assertionUrl) {
					openBadges.Verifier.getAssertion(assertionUrl,
						function (assertion) {
							var hash = assertion.recipient.split('$');
							// some badges do not use hash
							if (email === assertion.recipient) {
								callback(successCallback, assertion);
							} else if (hash.length !== 2) {
								callback(errorCallback, 'Invalid receipient.');
							} else {
								// TODO: detect and use appropirate hash algorithm

								assertion.salt = assertion.salt || '';

								if (hash[1] === CryptoJS.SHA256(email + assertion.salt).toString()) {
									callback(successCallback, assertion);
								} else {
									callback(errorCallback, 'Badge does not belong to ' + email + '.');
								}
							}
						},
						function (error) {
							callback(errorCallback, error);
						}
					);
				},
				function (error) {
					callback(errorCallback, error);
				}
			);
		}

	};

	return openBadges;

}(OpenBadges || {}));