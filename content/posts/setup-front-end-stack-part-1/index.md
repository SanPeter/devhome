---
type: posts
title: 'Solution Setup – Front-End stack – Part 1'
draft: false
date: 2020-03-18T10:00:00+00:00
previouslyPublished: true
authors: ['Eric St-Pierre']
categories:
  - solution-setup
tags:
  - episerver
  - frontend
  - setup
---

&#8220;How to setup a project&#8221; is a series about the basic tools and configurations that can be used into starting a new development project.&nbsp;

This is the first part of a discussion about CSS frameworks, their uses and how to integrate them in an Episerver solution.

One thing that people just getting in the world of CMS have an hard time to get is the fact that most CMS solution you choose will offer you a content editing interface, but you are on your own when it&#8217;s time to render a site to a web channel.&nbsp; When people get into Episerver, they think that it comes with Bootstrap built-in.&nbsp; That&#8217;s half the truth.&nbsp; Yes it does include bootstrap for the content editing interface, but for the web channel, you have to bring your own toolbox. If you work at a company with a lot of experienced front-end developers who created libraries and ways of working, then you can go with that.&nbsp; But what if you need to create your front-end tooling from scratch?&nbsp; This Is where CSS framework get handy to help speed-up development.&nbsp;

## What is a Framework

So what actually is a framework? taken from A List Apart, a framework is:

> a set of tools, libraries, conventions, and best practices that attempt to abstract routine tasks into generic modules that can be reused. The goal here is to allow the designer or developer to focus on tasks that are unique to a given project, rather than reinventing the wheel each time around.
> [https://alistapart.com/article/frameworksfordesigners/](https://alistapart.com/article/frameworksfordesigners/)

Going thru the web for a definition of a CSS framework, I stumble on the following article, dating back to 2008.&nbsp; Yeah it might outdated but the core of the reasons to use one of those framework is the same.&nbsp; This article goes thru the good and bad about CSS frameworks.

[https://css-tricks.com/what-are-the-benefits-of-using-a-css-framework/](https://css-tricks.com/what-are-the-benefits-of-using-a-css-framework/)

The Good about CSS Framework

- They can help you learn CSS
- They provide code that you just don&#8217;t need to write from scratch every time, like resets
- They relieve cross-browser concerns
- It helps you build good habits
- They encourage grid based design
- They come with documentation
- They lay groundwork

One thing to consider when choosing a CSS framework would be how easily it can be used in the context of blocks or components.  Since most of the content would come in the form of blocks or partial views, having  framework that align with a component philosophy would greatly help development.

So now, which CSS framework should you choose?  Do you go for the flavor of the month or do you go for a more mature solution with a proven record. If your not following any front-end, css or javascript news feed, you might find yourself lost in front of all the options. Luckily for us, there is the folks at [https://stateofjs.com/](https://stateofjs.com/) that are doing a fabulous job of surveying the actual people who are working with those tools. Since, they have posted some stats that can help us make sense of all of this.  And since last year, they surveyed the world of CSS and the results can be seen on [https://stateofcss.com/](https://stateofcss.com/).

Going through this year survey results ([https://2019.stateofcss.com/technologies/css-frameworks/](https://2019.stateofcss.com/technologies/css-frameworks/)), we can see.

> That Bootstrap has kept up with the times and generated a huge ecosystem of various themes and plugins. And while the utility-class-focused approach of new frameworks like Tailwind CSS make you question everything you know about writing “proper” semantic CSS, its 81% satisfaction ratio means that it might be time to reconsider our old preconceived notions…

## Going with the proven solution

[Bootstrap][1]

Build responsive, mobile-first projects on the web with the world’s most popular front-end component library.

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

If you want to go with a proven solution, which is already used by Episerver content editor user interface, then you could go with Bootstrap.&nbsp; There is already a few Episerver add-on available in the Marketplace which help using Bootstrap into your project.&nbsp; One example would be EpiBootstrapArea, which adds Bootstrap column declaration as display options in ContentArea.

## Going the Utility-Class path

[TailwindCSS][2]

Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

Taken from [https://css-tricks.com/need-css-utility-library/](https://css-tricks.com/need-css-utility-library/), a definition of an utility-class library could be:

> &#8220;Let&#8217;s define a CSS utility library as a stylesheet with many classes available to do small little one-off things. Like classes to adjust margin or padding. Classes to set colors. Classes to set specific layout properties. Classes for sizing. Utility libraries may approach these things in different ways, but seem to share that idea. Which, in essence, brings styling to the HTML level rather than the CSS level. The stylesheet becomes a dev dependency that you don&#8217;t really touch.

Being able to have a standard way to apply styling to components can be very helpful when working with Episerver page and block views and rendering.&nbsp; It could allow us to give more control to the content editor by providing them some ways to include the styling in their content.

## Episerver integration

So, which of those framework should you use on an Episerver project?&nbsp; If you want to go with a proven solution, for which you will find a lot of documentation, tutorials and support, then Bootstrap might be the way to go.&nbsp; If you feel that you would like a framework that would be easier to plug in your project, and that might align more with a component / block approach, then why not give an utility-class framework like TailwindCSS a try.&nbsp;

In this article I went thru some pros and cons of different CSS framework styles. In the next article, I&#8217;ll go thru the steps required to include a framework such as TailwindCSS into an Episerver project.

[1]: https://getbootstrap.com/
[2]: https://tailwindcss.com/
