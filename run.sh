#!/bin/zsh

cd generated
node ../../../../auto-code2/packages/auto-code-cli/dist/index.js code -i ../prompt.txt -m ${MODEL} --exclude-from .llmignore -m haiku

