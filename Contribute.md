# how to contribute

## Fork focus to create your own focus project
- Fork the project
- ![fork](https://cloud.githubusercontent.com/assets/286966/9465819/2e2fda74-4b30-11e5-9311-3838cbdc07db.png)
- Add focus as a [remote origin](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
`git remote add upstream https://github.com/KleeGroup/focus.git`

- Stay up to date with focus , read this [article](https://help.github.com/articles/syncing-a-fork/)
```
# Get the changes informations
git fetch upstream
# Go back on your local master branch
git checkout  master
# merge changes from original repository
git merge upstream/master
```

## Build focus
- perform `npm install`
- `npm run build:browser` to launch the build for the browser, copied in `dist/focus.js`

## Fix or improve focus
- Create a local branch for your contribution `git checkout -b feature-fix` where `feature-fix` is the name of your feature
-  Realize your changes
-  Add with `git add path/file.js` Commit `git commit -m '[feature] Commit messgae.'`
-  Push your changes `git push origin feature-fix`
-  Create a pull request
![contribute](https://cloud.githubusercontent.com/assets/286966/9466383/c3e98ff2-4b34-11e5-985e-ad6425619bc0.gif)
- Wait for your pull request to be review
- Go back on your local master branch `git checkout master`
- Don't hesitate to come chat with us in case of any problem
