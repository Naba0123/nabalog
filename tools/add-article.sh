#!/bin/bash

echo -n "identity word? "
read title

BLOG_DIR="$(cd $(dirname $0); pwd)/../content/blog"
YEAR=$(date "+%Y")
DATE=$(date "+%m%d")

TARGET_DIR="$BLOG_DIR/$YEAR/$DATE-$title"

mkdir -p "$BLOG_DIR/$YEAR"
mkdir $TARGET_DIR
if [ $? -ne 0 ]
then
  exit 1
fi

DATETIME=$(date "+%FT%T")

str="---
title: $title
date: \"$DATETIME\"
---

body"

echo "$str" > "$TARGET_DIR/index.md"

# Open Visual Studio Code
code "$TARGET_DIR/index.md"