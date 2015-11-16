# how to contribute



## Fix or improve focus


### How to contribute ?

#### Declare an issue

You have question about FOCUS-CORE ? About how to use it ?
You have detected an problem in the framework. A component don't behave as expected ?

Please read this [document](https://github.com/KleeGroup/focus-docs/tree/master/contribute/DECLARE_ISSUE.md)

#### Contribute to DEVS

You want to contribute to FOCUS-CORE, propose new features, fix an issue ?

Please read this [document](https://github.com/KleeGroup/focus-docs/tree/master/contribute/CONTRIBUTE_TO_DEV.md)

#### Create a pull request to push a new feature

You have develop new feature on your FOCUS-CORE local branch. You want to contribute to the project and push it to main branch for the benefit of the community FOCUS ?

Please read this [document](https://github.com/KleeGroup/focus-docs/tree/master/contribute/PR_FEATURE_TEMPLATE.md)

#### Create a pull request to fix an issue

You fixed an issue on your FOCUS-CORE local branch. You want to push it to main branch for the benefit of the community FOCUS ?

Please read this [document](https://github.com/KleeGroup/focus-docs/tree/master/contribute/PR_FIX_TEMPLATE.md)


## Fork focus to create your own focus project
- Fork the project
- ![fork](https://cloud.githubusercontent.com/assets/286966/9465819/2e2fda74-4b30-11e5-9311-3838cbdc07db.png)
- Add focus as a [remote origin](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
- `git remote add upstream https://github.com/KleeGroup/{sourceProjectToReplace}.git` <br />
  - **Focus**, `git remote add upstream https://github.com/KleeGroup/focus.git`
  - **FocusComponents** `git remote add upstream https://github.com/KleeGroup/focus-components.git`

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
