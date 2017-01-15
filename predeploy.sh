#!/bin/bash

# based on https://gist.github.com/bewest/6100033
# travis encrypt --add -r user-org-name/repo-name 'GIT_NAME="Your Committer Name [via travis key]" GIT_EMAIL=committer@example.com GH_TOKEN=ahead0fxxxxxxxxxxxxxxxxxxx'


echo "Setting up $GH_REPO [via travis] for $GIT_NAME <${GIT_EMAIL}>"
export REPO_URL="https://$GH_TOKEN@github.com/$GH_REPO.git"
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
git config --global push.default simple
git branch -a
echo "STATUS"
git status
git remote rename origin old
echo "remotes pre pre-authorized remote url"
git remote -v
git remote add origin $REPO_URL
