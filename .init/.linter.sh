#!/bin/bash
cd /home/kavia/workspace/code-generation/minimal-todo-list-292466-292475/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

