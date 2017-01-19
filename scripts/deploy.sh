#!/bin/bash

# Runs the build command, commits everything in the out dir to the out branch, pushes to github.

# based on http://benlimmer.com/2013/12/26/automatically-publish-javadoc-to-gh-pages-with-travis-ci/
# and https://github.com/watson-developer-cloud/node-sdk/blob/master/jsdoc/publish.sh
# and a little bit on https://gist.github.com/bewest/6100033


# get a token from https://github.com/settings/tokens and encrypt it like so:
# travis encrypt --add -r user-org-name/repo-name 'GH_TOKEN=xxxxxxxxxxxxxxxxxxx'

export GH_REPO="nfriedly/nfriedly.com"
export IN_BRANCH="master"
export OUT_BRANCH="gh-pages"
export OUT_DIR="out/"
export BUILD_COMMAND="docpad generate --env static --out $OUT_DIR" # don't clean, it will nuke the .git folder



if [ "$TRAVIS_REPO_SLUG" == "$GH_REPO" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "$IN_BRANCH" ]; then

  echo "Setting up $GH_REPO $OUT_BRANCH in $OUT_DIR"

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git config --global push.default simple

  export REPO_URL="https://$GH_TOKEN@github.com/$GH_REPO.git"

  git clone --quiet --branch=$OUT_BRANCH $REPO_URL $OUT_DIR

  echo "Running $BUILD_COMMAND"

  $BUILD_COMMAND || { echo "\nBuild failed, stopping deploy.\n" ; exit 1; }

  echo "Done! Entering $OUT_DIR and committing changes to $OUT_BRANCH."

  pushd $OUT_DIR

    # add all changes to git, including deleted files
    git add -f -A .
    git commit -m "Updating $OUT_BRANCH for commit $TRAVIS_COMMIT on $IN_BRANCH"
    git push -f -q origin $OUT_BRANCH || { echo "\nPush failed\n" ; exit 1; }

  popd

  echo -e "Updated $OUT_BRANCH!\n"

else

  echo -e "Not publishing $OUT_BRANCH for build $TRAVIS_BUILD_NUMBER on branch $TRAVIS_BRANCH of repo $TRAVIS_REPO_SLUG"

fi
