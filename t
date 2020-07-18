#!/bin/bash
clear
echo "Creating tag" $1
git add .
git commit -m $1
git tag -a $1 -m $2

