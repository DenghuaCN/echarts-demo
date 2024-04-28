#!/usr/bin/env sh

yarn build &&
cd dist &&
git add . &&
git commit -m deploy &&
git remote add origin https://gitee.com/denghuaGitee/echart-demo.git &&
git push -uf origin main:gh-pages &&
cd -;
