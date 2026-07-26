#!/bin/bash

set -euo pipefail

# Only commit and push if there are changes
cd _site

if [[ `git status --porcelain` ]]; then
    git config --global user.email "actions_bot@github.com"
    git config --global user.name "GH Actions Bot"
    git add -f -A .
    git commit -m "Updating gh-pages: ${{ github.event.head_commit.message }}"
    git push origin gh-pages
else
    echo "No changes to deploy"
fi