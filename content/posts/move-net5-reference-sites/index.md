---
type: posts
title: 'What are the Optimizely implementation references for .NET5 sites?'
draft: false
new: true
date: 2022-03-01T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
ogImage: "images/social-move-net5.png"
categories:
  - net5
tags:
  - optimizely
  - net5
---

You heard about the newest version of the Optimizely Cloud and Commerce platforms, and you would like to experiment with them before planning a full site migration?  You want to evaluate what the migration efforts of your custom functionalities would be?  This is where example and references sites might help.

Over the years, as Optimizely developers, we got in the habit of spinning-of an Alloy demos site or cloning a Foundation site to try things out.  How did those implementations evolve with the Optimizely .NET framework migration?

A first thing to note is that the "Episerver" Visual Studio extension was not migrated to the new .NET version. So, you can't use the extension to generate a new Alloy site as a .NET5 reference site.  The site creation is now handled by the dotnet cli tool.  The dotnet cli is the tool provided by Microsoft to help developer you create a new site.

So, what are your options to generate a reference site to help you test the new implementation and be able to quickly try things out.

First, you have some options for example sites.  Alloy (CMS) and Quicksilver (Commerce), sites we used to work with in the .NET framework era, were sites used to demo the preview version of the .NET5 migrated solution.  Since the availability of official releases, those projects were deprecated and were replaced by new projects based on the Foundation project.

Foundation is the official reference site from Optimizely and is maintained by Optimizely Solution Architects.  Foundation was first introduced in 2019 and evolved since then up to the point where it was ported to the .NET5 framework.

> Foundation offers a starting point that is intuitive, well-structured and modular allowing developers to explore CMS, Commerce, Personalization, Search and Navigation, Data Platform and Experimentation.

Foundation is mainly used to demo a Commerce site implementation, and its code is available on the following GitHub repository.

[https://github.com/episerver/Foundation/tree/main](https://github.com/episerver/Foundation/tree/main)

The install procedure is available on the [README.md](https://github.com/episerver/Foundation/tree/main#readme) of the project, for all supported operating system (Windows, macOS, Linux).

The project that was created to replace the legacy Alloy example sites is Frontline Services (CMS) and you can it 's code on the following GitHub repository.

[https://github.com/episerver/foundation-mvc-cms/tree/net5](https://github.com/episerver/foundation-mvc-cms/tree/net5)

So, with those code repository, you are now equipped to test the newest version  of the Optimizely platform.