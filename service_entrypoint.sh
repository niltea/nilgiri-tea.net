#!/usr/bin/bash

# yarn
export NODE_OPTIONS='--openssl-legacy-provider'
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

# nvm
if [[ -s ~/.nvm/nvm.sh ]] ; then
        source ~/.nvm/nvm.sh ;
fi

yarn run start

