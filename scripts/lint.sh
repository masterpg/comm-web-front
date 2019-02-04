#!/bin/sh -e

if [ -z $1 ]; then
  prettier --write "**/*.{ts,vue,html,js}"
  eslint --fix ./ --ext .js --ext .ts
else
  if [ -d $1 ]; then
    prettier --write "$1/**/*.{ts,html,vue,js}"
    eslint --fix "$1"
  elif [ -e $1 ]; then
    prettier --write "$1"
    eslint --fix "$1"
  else
    echo "Directory or File \"$1\" not exists."
    exit 1
  fi
fi
