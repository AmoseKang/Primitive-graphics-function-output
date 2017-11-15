# Basic graphics output primitive function illustrator
## Introduction

This program provides simple illustration for four basic primitive functions.  
Including:  
1. DDA draw line  
2. Bresenham draw line  
3. Circle-Generating Algorithms
4. Ellipse-Generating Algorithms

## Features 
This program uses a rendering queue to draw pixels in sequences. A delay could be set to show an actual drawing sequence.   
The program provides controllable axies and grid.   
*The program rendered pixel as rectangle instead of actual pixel. With the support of scaling, each pixel can be more clear.

## Examples  
axies and grid
![example](/exp.png)

draw each pixel with delay
![example](/exp1.png)

results of pixels
![example](/exp2.png)

## Executing and packaging
First, make sure you have nodejs isntalled.  
Pull from github or download zip package.  
Run command `npm install` to install dependence.  
Run `webpack` to packaging js files.  
Run `electron .` to open with electron.  
Use [electron packager](https://github.com/electron-userland/electron-packager "electron packager") to generate executable files.


## License
The MIT License