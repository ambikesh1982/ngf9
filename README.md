# Ngf9 [Angular CLI version 1.6.8.]
ng new ngf9 --routing --style scss

## Packages
- npm install --save @angular/material @angular/cdk
- npm install --save @angular/animations
- npm install --save hammerjs
- npm install --save @angular/flex-layout
- npm install firebase angularfire2 --save

## Angular Material Setup
- ng g module material --flat

## Code scaffolding

### Product module setup
- ng g module product
- ng g class product/fooditem
- ng g component product/fooditem-list
- ng g component product/fooditem-detail
- ng g component product/fooditem-new
- ng g component product/fooditem-modify
- ng g service product/fooditem -m product

### Core module setup
- ng g module core
- ng g service core/auth -m core
- ng g guard core/auth -m core



