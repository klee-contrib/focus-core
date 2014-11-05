gulp build
git add dist
git add example
git commit -m 'Add the new version distribution'
npm version patch
git push origin master
git push origin --tags