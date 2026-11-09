#!/bin/sh
# Cài dependency cho bản standalone (chỉ chạm node_modules trong thư mục này)
cd "$(dirname "$0")" || exit 1
npm install --no-audit --no-fund
