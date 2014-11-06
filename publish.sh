#!/bin/bash
gulp build
npm version patch
git add package.json
git add -f dist
git add -f example
git commit -m 'Add the new version distribution'
git push origin master
git push origin --tags