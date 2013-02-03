# Open Badges Verifier (Chrome Extension)

## Overview

A Chrome Extension to verify Open Badges Infrastructure compliant digital badges.


## Setup

In Google Chrome...

1. Navigate to the extensions page.
2. Make sure 'Developer mode' is checked.
3. Click on 'Load unpacked extension...' and select the project directory.


## Using

1. Navigate to web page containing badges.
2. Click on Open Badges Verifier extension icon on the upper right-hand corner.
3. When a prompt pops up, type the email to be verified for ownership of the badges.
4. Verified badges will have green ticks over them and failed ones have red crosses instead.

Suggestions for more natural ways to perform the verification required.
Currently, the extension only detects badges in \<img> tags.


## Lint

Install [jshint](http://www.jshint.com), an easy way is to use npm.

    sudo npm install -g jshint
    make lint


## Run tests

After loading extension,

1. Navigate to the [extensions page](chrome://extensions).
2. Make sure 'Developer mode' is checked.
3. Copy the ID under the extension name and navigate to...

###
    chrome-extension://<extension-id>/test/index.html

## Package for release

A zip archive will be created in build directory ready for submission. Tests are excluded from package.

    make

## Libraries used
* https://github.com/jquery/qunit -- Unit testing
* https://github.com/jquery/jquery -- AJAX wrapper
* https://github.com/caolan/async -- Async utlities
* https://code.google.com/p/crypto-js -- SHA256 hash
* https://github.com/devongovett/png.js -- Reading tEXt chunk in PNG