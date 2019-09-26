../codemods/node_modules/.bin/jscodeshift --extensions=ts,tsx --transform=../codemods/src/$1.ts src

changed_files=`git diff --name-only | grep -E '\.tsx?$'`
yarn prettier-write $changed_files