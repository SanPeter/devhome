---
type: posts
title: 'The move to .NET5'
draft: false
new: true
date: 2022-02-15T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
ogImage: "images/social-move-net5.png"
categories:
  - net5
tags:
  - optimizely
  - net5
---

At the end of last year, Optimizely announced the latest version of their Content (version 12) and Commerce (version 14) cloud platform. This announcement had a special flavour to it. Other than being product updates, those new releases had a major change at their core. The underlying technology stack on which those products are built, which is the .NET framework, was also upgraded from version 4.8 to 5.0. For people outside of the Microsoft world, this would only involve a major version release, with probably a few breaking changes. But this release had a much bigger impact. Prior to .NET5, the .NET platform was a mix of overlapping technologies, in the form of the .NET framework, .NET Core, Mono and Xamarin platforms.  NET 5, which is the successor of both .NET Core 3.1 and .NET Framework 4.8, aims to provide .NET developers and users with a new cross-platform experience. It takes all the capabilities of .NET Core, .NET framework, Mono and Xamarin and unifies them into one framework. This more modern .NET is less monolithic and more modularized. Decoupling the framework from Windows allowed for a leaner framework with improved performances. This single .NET SDK and runtime can target Windows, Linux, macOS, iOS, Android and more, delivering a uniform runtime behaviour and developer experience.

This change now allows the Optimizely platform to be hosted on Windows or Linux app services in Azure.  It also allows developers to implement functionalities on their environment of choice, be it Windows, macOS or Linux, using a wider range of IDE.

This new series will cover what is involved in the Move to .NET5.  It will take the form of a Q&A, because this move can trigger a lot of questions.  Why .NET5?    As a developer, what is changing?  As a client, what would be the benefits to upgrade to the .NET5 platform? It will also cover some questions that arise when thinking about migrating an Optimizely implementation to the .NET5 version.