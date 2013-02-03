asyncTest('Successful assertion request', function () {
	async.forEachSeries([
			'https://badges.webmaker.org/badge/assertion/c5da4a92da939cc3342786a3164a8a50ee38c454ef44db35dc524da52226a01d',
			'https://badges.webmaker.org/badge/assertion/227ab06150d6053d42eeaa37cc4e18b55431df122630cb8e72563de89c97d74e'
		],
		function (item, callback) {
			OpenBadges.Verifier.getAssertion(item,
				function (assertion) {
					ok(true, JSON.stringify(assertion));
					callback();
				},
				function (error) {
					ok(false, 'Should not have failed.');
					callback();
				}
			);
		},
		function (err, results) {
			start();
		}
	);
});

asyncTest('Failed assertion request: Assertion not JSON', function () {
	async.forEachSeries(['http://www.google.com', 'img/sunny-mozfesticipant.png'],
		function (item, callback) {
			OpenBadges.Verifier.getAssertion(item,
				function (assertionUrl) {
					ok(false, 'Should not have succeeded.');
					callback();
				},
				function (error) {
					ok(true, error);
					callback();
				}
			);
		},
		function (err, results) {
			start();
		}
	);
});