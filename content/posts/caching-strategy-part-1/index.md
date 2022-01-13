---
type: posts
title: 'How to start a formula 1 engine - and improve our site visitor experience'
draft: false
new: true
date: 2022-01-05T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
ogImage: "images/social-caching-part-1.png"
categories:
  - caching
tags:
  - optimizely
  - caching
---

We all have an idea on how to start a car engine. Electric car and newer model have a start engine button, older people will remember starting a car with a key. And we might even have people old enough to have started their car engine with a crank. But on a Sunday, how do the engineers start the engine of one the fastest car on earth? How to start a formula 1 engine?

This is the first article in a series about using what we can learn from the formula 1 engineers and apply it to our Optimizely implementation to improve our visitor experience. In this series, I will discuss some techniques to enhance our visitor experience by improving the delivery time of your content.

## Formula 1 performance

So, we were lucky enough to get tickets to today's formula 1 race. We take our seats and beginning to hear the roaring of the race car engine. Engineers are at work around the cars to prepare for the start of the race. The lights are changing, Red, yellow, green, the formula 1 engines are on for a fast start to the race. But what happen before that when the cars were still in the paddock. What are all the engineers doing to get the engine to perform at full speed and power at the start of the race?

You are looking at your smartphone to check the first line pilots results from the last race to see who as the best chance to win. You get the results as soon as you click the link to the last race results. But wait, how could you get those results so fast? What happened from the time you opened you phone to getting the result page?

In today's world of fast racing cars, networks that can deliver 4K race coverage faster than we can consume them, computer processors that can crunch more data than we can feed them, we got to a point where website visitors are unwilling to wait more than the blink of an eye to get the content they are looking for.  If you don't deliver content in the expected time, visitors will start to look elsewhere to get what they are looking. for.

How can we leverage the formula 1 engineers research to produce the v6 engines of the fastest cars and apply this to an Optimizely website implementation running on DXP?

## Strategy

What is the strategy of starting a formula 1 engine?

Starting a formula 1 engine is not something that is taken lightly. It's a science that as been studied, measured, evaluated and that can be repeated. We should aim for the same for our websites. We don't need to reinvent the wheel every time we implement a new site.

So here is what you have been waiting for, the procedure to start a formula 1:

1. Heating the engine
2. Heating the engine oil
3. Lubricating the engine
4. Starting the engine
5. Maintaining the temperature and pressures of the engine

## Heating the engine

Now that we have the steps, let's see how we can apply them for a Optimizely implementation. So, let's heat the engine. On a formula 1 engine, the heat-up is used to prevent the abrasion of the moving parts. On a website, we are looking for the same thing. We want all the website components to act together with the less friction as we can. We want to prevent delay in components response as much as we can. By minimizing the component abrasion, we also minimize the visitor friction on the site. The site experience must be as smooth as it can be. On a new DXP hosted Optimizely site, our engine would be the app service and database servers. So, when deploying a solution live, we want those components to be warmed-up and ready to go. This is one of the steps perform when deploying a site to the production environment. Once our site is all warmed-up and serving our first visitors, one of the first thing we can do to maintain a minimum of performance is to set some Azure auto-scaling settings. But that can only be used as a basis to maintain a running site.

Server can scale in number, DTU can be added to give more power to the database servers, but they are limited to the Azure plan you pay for. And even if you can expand your resources, there is a performance cost to start a new App Service or database instance since they start cold. It's like trying to put multiple engines in a formula 1. For each new engine, you would need to perform all the steps to bring it to full power. And I think the FIA might consider adding a second engine illegal.

You would get way more results from the techniques we will discuss if they are applied to heavy traffic sites. If the site is a low traffic site, server processing impact won't be as much in-demand than on heavy traffic sites. And those processing requests are one of the things we want to target.

With caching techniques, we want to reduce the traffic to the DXP by reducing the number of requests that are handle by the App Service and database servers. We want highly specialized and optimized server to handle the request.

By having some servers handling the request to see what can be reused, we can reduce the server processing time to process what is really needed. If a page that doesn't change often is request a lot of time, why have our servers do the processing if we can have it stored on a request handling server that only have to send a pre-process page.

So, without applying any caching techniques, we get the following benchmark for starting fresh instance of a DXP hosted solution.

![benchmark](images/benchmark.png)

1:00 min to 1:30 min is the First Load Time of the HTML of the page, without dependencies load (JS, CSS) and API calls.

So now we have the basics of a running site, and some performance base marks.  In the next article, I will cover some ways to improve our site performance by applying some memory cache techniques.

