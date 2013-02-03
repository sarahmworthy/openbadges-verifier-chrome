all: package

package:
	@mkdir -p build
	@zip -FSr ./build/openbadges-verifier.zip _locales css img js manifest.json

clean:
	@rm -fr build

lint:
	@jshint js/displayer.js js/verifier.js js/background.js js/content.js
