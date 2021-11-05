---
type: posts
title: 'Solution Setup – .gitignore'
draft: false
date: 2020-02-26T11:00:00+00:00
previouslyPublished: true
authors: ['Eric St-Pierre']
categories:
  - solution-setup
tags:
  - episerver
  - setup
---

&#8220;How to setup a project&#8221; is a series about the basic tools and configurations that can be used into starting a new development project.

It&#8217;s crazy to think that Git has taken part in developers life for the past 15 years and that it&#8217;s still so obscure for most of us.&nbsp; Experienced developers take it for granted but it is still very intimidating for new developers who are on-boarded on a project that is using it.&nbsp; In this series, I&#8217;ll go into how we use git and Episerver together and the practices we use to help developers on-boarding.

In this article I will cover how we use the .gitignore on Episerver project to help us work with a leaner process.

From the [Github site][1], here is their definition for the .gitignore file:

> &#8220;You can create a <em>.gitignore</em> file in your repository&#8217;s root directory to tell Git which files and directories to ignore when you make a commit. To share the ignore rules with other users who clone the repository, commit the <em>.gitignore</em> file in to your repository.&#8221;

So, the .gitignore file is a file added to your project code base that specifies files that should not be taken into account by the source control manager.

When you start a project, there are a few ways that you can get a templated .gitignore file.&nbsp; When you create a new Visual Studio project, you have a choice to create the git repository, adding a templated .gitignore file for the project.&nbsp; If you omit this option, you always can add it back going to the following Github account to get a default Visual Studio ASP.NET project .gitignore

[https://github.com/github/gitignore/blob/master/VisualStudio.gitignore](https://github.com/github/gitignore/blob/master/VisualStudio.gitignore)

If you don&#8217;t want to use the Visual Studio default one, or you want to have a .gitignore customize to your programming stack, you can go to the following site:

[https://www.gitignore.io/](https://www.gitignore.io/)

On the site, you can choose your IDE, programming language or framework.&nbsp; So for an Episerver project, we could go for a visual studio .net .gitignore file. Going thru the file, we can see that most of the files we don&#8217;t want to include into the project code base.

When you create your initial commit on a new Episerver project, you would see a few files getting included in the code base, files that we don&#8217;t necessarily want into our project.&nbsp; Some examples of those files would be the App_Data folder, the packages folder, the license file and some configuration files.

Following Microsoft best practices, you should also put the \modules_protected folder into the .gitignore file since you can restore those nuget packages.

[https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore)

Looking at Episerver reference implementation, Foundation, we can see how they configured their .gitignore.

```bash
Build/Logs/*.log
src/appdata/*
src/Foundation/App_Data/GeoLiteCity.dat
src/Foundation/Assets/scss/main.min.css
src/Foundation/Assets/scss/main.min.css.map
src/Foundation/Assets/js/main.min.js
src/Foundation/Assets/js/main.min.js.map
src/Foundation/License.config
src/Foundation/connectionStrings.config
src/Foundation.CommerceManager/connectionStrings.config
src/Foundation.CommerceManager/App_Data/ImportExport/*
rebuild.cmd
resetup.cmd
```

So they added some site specific files and folders, configuration files, and they also took out some assets files.&nbsp; If you plan on having the css and js assets file processed&nbsp; at compile time (minification, &#8230;), then you should also add the &#8220;compiled&#8221; assets files to the .gitignore file.

A boilerplate .gitignore file could be to start with a standard .NET .gitgnore, to which the following rules would be added:

```bash
App_Data/Index
App_Data/blobs
modulesbin
Modules/_protected
License.config
```

An example of an Episerver .gitignore can be downloaded from the following Gist

[https://gist.github.com/espierre/752bf6e87ea33034565a118e019cee3a](https://gist.github.com/espierre/752bf6e87ea33034565a118e019cee3a)

By adding files that are user specific (.config) or that change a lot (App_Data) or that are part of the project build (.min.css), we can limit the noise that can appears in big project code review, and prevent a lot of useless merge conflicts.

In the next article in this series, I&#8217;ll go into configuration changes that helps a team working on the same project.

[1]: https://help.github.com/en/github/using-git/ignoring-files
