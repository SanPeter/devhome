---
type: posts
title: 'Solution Setup – Front-End stack – Part 2'
draft: false
new: true
date: 2020-03-25T10:00:00+00:00
previouslyPublished: true
authors: ['Eric St-Pierre']
categories:
  - 'Solution Setup'
tags:
  - episerver
  - frontend
  - setup
---

&#8220;How to setup a project&#8221; is a series about the basic tools and configurations that can be used into starting a new development project.&nbsp;

This is the second article on a discussion about CSS frameworks.&nbsp; In the [first article of this series][1], I discussed what is a CSS framework and how to use it to speed-up an Episerver site development.&nbsp; In this article, I&#8217;ll cover how to implement TailwindCSS in an Episerver solution.

I have chosen to go with an utility-class CSS framework because I wanted to see how this kind of framework pattern could help change the editor experience, and how we can give editors more freedom in building their website.

## covering the bases

To be able to use a CSS framework, we need to include the bases of the framework in the project and have some ways to customize it to meet our project requirements.

If you are doing a small proof of concept or a demo that don&#8217;t require style customization, you could include TailwindCSS directly from a CDN, as documented on the [TailwindCSS site][2]. This would prevent you from having to include front-end file processing into your project.

To include the CDN version of TailwindCSS, you would need to add the following link into the <head> tag of your pages.

```html
<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet"
/>
```

If you need to customize the styles provided by the framework and you would want to include TailwindCSS in an actual project, then you are better off including TailwindCSS as a project dependency, and develop a packaging pipeline. To do so, we need to know how to include TailwindCSS in a project and how to make it production ready.

## LET&#8217;S INSTALL TAILWINDCSS

There is a great [video on how to include TailwindCSS into a project][3] available on their site.

Following are the steps covered into the video to install TailwindCSS into an empty project.

Since TailwindCSS is an npm package, we will need nodejs and NPM installed in the development environment. Once nodejs and npm are installed, we need to install the TailwindCSS package and dependencies in the package.json configuration file.

The dependencies we would like to install would be:

- Postcss-cli, which is a client interface to [PostCSS][4], which is &#8220;a tool for transforming CSS with JavaScript&#8221;
- Autoprefixer, which is &#8221; a PostCSS plugin to add vendor prefixes to CSS rules using values from Can I Use.&#8221;

Adding TailwindCSS and it&#8217;s dependencies can be done with the following command

```bash
npm install tailwindcss postcss-cli autoprefixer
```

Then, we need to create an empty tailwindcss configuration file.&nbsp; This can be done with the following command.

```bash
npx tailwind init
```

Next, let&#8217;s create a PostCSS config file.&nbsp; Create an empty postcss.config.js at the root of your project to specifies which PostCSS plugins we are going to include in the processing pipeline.

```javascript
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')]
};
```

We then create a css/tainwindcss.css file, in which we tell tailwind which tailwindcss base classes we want to use in our project

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- **Base** is the base tailwind styles.&nbsp;
- **Components** is the Tailwind components.&nbsp;
- **Utilities** are the tailwind utilities classes.

Then we need to create a script to actually process all of this with PostCSS.&nbsp; Let&#8217;s use the package.config to add a build script command

```javascript
"scripts": {
    "build": "postcss css/tailwind.css -o public/build/tailwind.css"
  },
```

Once this is done, we can run it using the npm command run

```bash
Npm run build
```

Running this script will generated a PostCSS processed file in the public/build folder

## ADD FRONT-END STACK TO PROJECT

So this was more of a manual approach.&nbsp; To add it into an Episerver solution, we would like to include the processing of the file in our build process. To do that, we could use the npm script and include it as a build step.&nbsp; Other options would be to use a task-runner or a packaging tool.

One of the most used task runner would be gulp.&nbsp; From [Gulp official site][5]

> &#8220;Gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.&#8221;

To use Gulp, we would need to create a Gulp task, in which we would add tailwindcss to the list of plugins passed to [gulp-postcss][6]:

```javascript
gulp.task('css', function () {
  const postcss = require('gulp-postcss');
  return (
    gulp
      .src('src/styles.css')
      // ...
      .pipe(
        postcss([
          // ...
          require('tailwindcss'),
          require('autoprefixer')
          // ...
        ])
      )
      // ...
      .pipe(gulp.dest('build/'))
  );
});
```

For the packaging tool, webpack could be a good option.

From their documentation site, [webpack][7] is

> &#8220;At its core, <strong>webpack</strong> is a <em>static module bundler</em> for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more <em>bundles</em>.&#8221; > [webpack - dependency graph](https://webpack.js.org/concepts/dependency-graph/)

PostCSS is already included with webpack, so you would need to add tailwindcss as a plugin in your postcss.config.js file:

```javascript
module.exports = {
  plugins: [
    // ...
    require('tailwindcss'),
    require('autoprefixer')
    // ...
  ]
};
```

&#8230;or include it directly in your [postcss-loader][8] configuration in your webpack.config.js file:

```javascript
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        // ...
        use: [
          // ...
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('tailwindcss'), require('autoprefixer')]
            }
          }
        ]
      }
    ]
  }
};
```

The choice would depend on the front-end stack you already have in place.

## ADD TO PROJECT BUILD

To add a build task to your Episerver project, you need to have the &#8220;Task Runner Explorer&#8221; plugin installed.&nbsp;

You can also install specific [task runner for Webpack][9] or for [NPM][10]. Once those extensions are installed, you can specify which action to perform when you build the project. As an example, you could specify to run an NPM build task, on the BeforeBuild event. On the task runner explorer, you would add the command `run build:dev` to the BeforeBuild event.

## PRODUCTION READY CODE

Whatever path you choose to take, one last thing to think about would be to optimize you framework code so that you include into your production the smallest foot-print.&nbsp;

From the [PurgeCSS site][11]

> &#8220;PurgeCSS is a tool to remove unused CSS. It can be part of your development workflow.

When you are building a website, you might decide to use a CSS framework like TailwindCSS, Bootstrap, MaterializeCSS, Foundation, etc&#8230; But you will only use a small set of the framework, and a lot of unused CSS styles will be included.

This is where PurgeCSS comes into play. PurgeCSS analyzes your content and your css files. Then it matches the selectors used in your files with the one in your content files. It removes unused selectors from your css, resulting in smaller css files.&#8221;

Depending on the packaging tool you use, the configuration would be the following, [PostCSS][12], [Webpack][13] or [Gulp][14].

There is a great [screencast][15] on the TailwindCSS site that can help you to setup PurgeCSS for TailwindCSS

In this article, I went discussed the benefits of using a CSS framework and went thru the steps to include one such framework into an Episerver project.&nbsp; In the next article of this series, I&#8217;ll go into how we can use TailwindCSS to improve the content editor experience.

[1]: /posts/setup-front-end-stack-part-1/
[2]: https://tailwindcss.com/docs/installation/#using-tailwind-via-cdn
[3]: https://tailwindcss.com/course/setting-up-tailwind-and-postcss
[4]: https://postcss.org/
[5]: https://gulpjs.com/
[6]: https://github.com/postcss/gulp-postcss
[7]: https://webpack.js.org
[8]: https://github.com/postcss/postcss-loader
[9]: http://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebPackTaskRunner
[10]: http://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner
[11]: https://purgecss.com/
[12]: https://purgecss.com/plugins/postcss.html
[13]: https://purgecss.com/plugins/webpack.html
[14]: https://purgecss.com/plugins/gulp.html
[15]: https://tailwindcss.com/course/optimizing-for-production
