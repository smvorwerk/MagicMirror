#!/bin/bash

# with or without electron-rebuild ?

p0=$0
rebuild=true
# if not 'bash', and some parm specified
if [ $0 != 'bash' -a "$1." != "." ]; then
        # then executed locally
        # get the parm
        p0=$1
fi

if [ $p0 = without-rebuild ]; then
  rebuild=false
fi

node-pre-gyp clean configure install --build-from-source 2>/dev/null

echo

if $rebuild; then
  electron-rebuild
fi
