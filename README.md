# flat-starter-kit
Starter Kit for PSD-to-HTML projects with Webpack, Jade and Stylus

## Features
We use Pug and Stylus to create static layout page for our clients who desires qualified "PSD to HTML" work. 
### File structure
```
conf
```
Contains all webpack configs, they are imported in the webpack.config.js from the root directory

#### `src`
```
src
|  entry.js
└─── pages
└─── components
└─── theme
```
`entry.js` is a main file that import every `.js` file in the `src` directory. So when you create new `.js` file it will be automatically added to the bundle.

`pages` is a folder with all possible pages of the project.

`components` is a folder with all possible components shared between all pages.

#### `pages`
`pages` has the following structure:

```
pages
└─── activity
| |  activity.js
| |  activity.pug
| |  activity-data.pug
| |  activity.scss
└─── base
| |  base.pug
| |  base-data.pug
| |  base-guest.pug
└─── home
| |  home.pug
| |  home-data.pug
└─── signup
| |  signup.js
| |  signup.pug
| |  signup.scss

```
* `activity.pug`, `home.pug`, `signup.pug` are independent separated pages, extended from `pages/base/base.pug`, so they have `<html>`, `<head>`, `<body>` tags. 
* Page ideally should NOT contain any element except of imports of different components. 
* Usually page get some data from external sources (your backend written in PHP, Python, Ruby, whatever), we imitate this with special variable `locals` in the separate file (`activity-data.pug` or `home-data.pug` for example) and contain all fake data there (including all lists, parameters, links to social media etc).

#### `components`
`components` has the following structure:
```
components
└─── arrow-button
| |  arrow-button.pug
| |  arrow-button.js
| |  arrow-button.scss
| └─── img
| | |  top.png
| | |  left.png
| └─── __tests__
| | |  index.pug
| | |  makeup-data.js
└─── calendar
| |  calendar.pug
| |  calendar.js
| |  calendar.scss
| └─── img
| | |  left.svg
| | |  right.svg
| └─── __tests__
| | |  index.pug
| | |  makeup-data.js
```
* `components` contains only directories per component. 
* Each component contains main `.pug` file with the template, `.js` that is dynamically loaded in the `entry.js` and contains all scripts for the component (and only the component) and `.scss` file.
* `.scss` should be imported in the `.js` and contains **one BEM block** in the root of the files and all possible elements and modificators inside this block's definition.
* `__tests__` is a special directory that contain all info regarding auto-testing, `makeup-data.js` is intended for Makeup visual declaration (see below), `index.pug` just to create samples of the component.

## How to work
#### Install dependencies
```commandline
npm install
```

#### Start dev server
```commandline
npm run dev
```

Visit http://localhost:8080/ to see all possible pages of the project, click any page and start working.

#### On the production server create the bundle files
```commandline
npm run build
```

## How to test
Now we use Makeup from 2GIS. From the docs (https://github.com/2gis/makeup):
```
Makeup is a tool for development and comfortable quality assurance of markup on web projects. 
You'll certainly find it useful if your design is based on independent blocks 
and you prioritize stability and reliability.
```
 
```
Makeup lets you:

- Compare page design with the sample layout,
- Monitor blocks for modifications and mismatching content,
- Develop isolated blocks with ease.
```

To check design of each component separately in all possible states, run 
```commandline
npm run test
```
and go to `http://localhost:8090/`
