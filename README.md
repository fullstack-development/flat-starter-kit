# flat-starter-kit
Starter Kit for PSD-to-HTML projects with Webpack, Jade and Stylus

## Features
We use Pug and Stylus to create static layout page for our clients who desires qualified "PSD to HTML" work. 
### File structure
```
conf
```
Contains all webpack configs, they are imported in the webpack.config.js from the root directory

```
src
|  entry.js
└─── pages
└─── theme
```
`entry.js` is a main file that import every `.js` file in the `src` directory. So when you create new `.js` file it will be automatically added to the bundle.

`pages` is a folder with all possible pages of the project, the structure of the directory is:

```
pages
|  home.pug
|  profile.pug
|  profiles-list.pug
└─── components
```
`home.pug`, `profile.pug`, `profiles-list.pug` are independent separated pages, they have its own `<html>`, `<head>`, `<body>` tags and include root components. Page ideally should NOT contain any element except of imports of different components. Page should declare variable `data` at the top of the file and contain all fake data there (including all lists, parameters, links to social media etc). See src/pages/home.pug and src/pages/profile.pug for examples.

`components` is a folder with all possible components shared between all pages, the structure of the directory is:
```
components
└─── toggle
| |  toggle.pug
| |  toggle.js
| |  toggle.styl
| └─-- img
| | |  on.png
| | |  off.png
└─── user-profile
| |  user-profile.pug
| |  user-profile.js
| |  user-profile.styl
| └─-- img
| | |  default-avatar.png
```
`components` contains only directories per component. Each component contains `toggle.pug` with the template, `toggle.js` that is dynamically loaded in the `entry.js` and contains all scripts for the component (and only the component). `toggle.styl` should be imported in the `toggle.js` and contains one BEM block in the root of the files and all possible elements and modificators inside this block's definition.

## How to work
#### Install dependencies
```
npm install
```

#### Start dev server
```
npm run dev
```

Visit http://localhost:8080/ to see all possible pages of the project, click any page and start working.

#### On the production server create the bundle files
```
npm run build
```