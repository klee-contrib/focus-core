#!/bin/bash
gulp build
git add -f dist
git add -f example
git add lib/infos.js
git commit -m 'Add the new version distribution'
npm version patch
git push origin master
git push origin --tags