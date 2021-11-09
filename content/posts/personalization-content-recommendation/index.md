---
type: posts
title: 'Personalization - Content recommendation'
draft: false
new: true
date: 2021-11-08T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
categories:
  - personalization
tags:
  - optimizely
  - personalization
---

In the previous articles on the personalization series, I covered the basics of content personalization and how it can be achieved by using Optimizely visitor groups to implement a segmentation strategy. In the next articles of the series, I'll discuss the next step on the personalization roadmap, which is create a one-on-one experience, using Optimizely Content Recommendation.

Content recommendation, be it recommendation of marketing content or recommendation of products in an e-commerce solution, is not an easy thing to achieve. You can be thinking about implementing a one-on-one personalization strategy by delivering recommended content that would be chosen by you. With segmentation and Optimizely visitor groups, we saw that you could target a group of visitors by segmenting your visitor on predefined criteria. That could be a good strategy, but in that case, you would not provide a one-on-one experience but rather more of a group personalization, based on human decided rules. And the question that arise is: "Do you really know which piece of content would be relevant to a specific user". That is open to discussion, and you might know your content, but what you know about your visitors is open to interpretation. If you sit your sales, marketing, and operation teams at a table, they will all have different opinions on your visitor base. What if instead of letting human decide, we would use tracked data to make the recommendation decisions. What if this harvested data could help us deliver content to a visitor on a one-on-one basis.

## The one-on-one experience

As a reminder, one-on-one personalization can be seen as the process of offering an exclusive, one-on-one experience for each of our site visitor based on previous behavior and engagement. Segmentation with visitor groups allowed us to target content to a pre-determine group of visitors, segmented on some common characteristics. What we want to achieve with one-on-one personalization is to go one step further and deliver content that is closer to the needs and interest of the visitors.

The one-on-one experience is based on previously recorded behaviours of the visitor. With some tracking and analytics, we can create some models and patterns about how the visitor is interacting with our site. What if we collect that information for all the visitors of the site, and look for similar pattern? Then we could use all this information to have a good picture of what a specific visitor is looking for, what his interests are and how he interact with content that is presented to him.

As it was discussed in the [first article of the series](https://eric.st-pierre.xyz/posts/personalization-introduction/), personalization must be seen as a strategic process, not a project. With content recommendation it's even truer. Its a process that needs to me measured, evaluated, and iterated on. Content recommendation must be taken one step at a time, check for the impact on user engagement and iterate the strategy based on the observed metrics.

To develop a content recommendation strategy, we need to understand the visitor needs and align them with the business goals. Most of our client sites are either a communication and marketing tool or an online storefront. Our goal with personalization is to help the company grow by providing relevant content to their visitors. Content that will engage the visitors with the business, consume and share our content or buy our products.

Business goals that we would want to achieve with a one-on-one personalization strategy could be:

- Better understand visitor needs
- Nurture and engage visitors
- Build brand loyalty
- Up-sell and cross-sell products

To achieve those goals, we need a tool that will help us understand two things:

- What is the nature content of the site
- What are the site visitors interested in

## Optimizely offering

Optimizely offers a product that can help us understand both of those things. This product is Content Recommendation. Content Recommendation is part of Optimizely Personalization, a suite of cloud-based products, which also includes Visitor Intelligence and Product Recommendation. Content recommendation was integrated into the Optimizely platform by the acquisition of Idio back in 2019.

So how can we leverage Content Recommendation to helps us with delivering relevant content to our visitors. Content recommendation can help us delivering relevant content to visitor by combining machine learning, artificial intelligence, and statistical analysis, and helping us understanding our content and visitors needs. All those machine learning, artificial intelligence and statistical analysis systems and algorithms are great, but they need to be fed data to provide us results.

The first part would be to feed the Machine Learning beast. We need to provide it the content of the site, so that it can gather data about our content. To get this modelling of content, a script that is part of a Content Recommendation implementation is added to your page and triggers a content ingestion when a visitor navigates to a page. The script first check if the page is already ingested, and if not, it queues the page to be indexed. The indexation process creates a content profile, with the title of the page and some metadata about the page. Then, the content of the page is analysed by the machine learning algorithms to find the topics that are in the content. Those topics will help the recommendation module find content that should be delivered to visitors. Relevant content to your visitor is content that match their interest and bring them value.

Once we have a good picture of our content, we want to help visitors find what they are looking for in our content and engage with them. By tracking visitors' behavior, we gather data about the visitors' and about their interactions with our content. With all this data, we can create mathematical models, which are a representation of our visitor behaviors, based on their observed interaction with the site.

Then from the content analysis and representation of the visitor's behaviors, we can apply statistical models that will deliver recommended content to our visitor, based on metrics and not on human intuition of what the visitors are looking for.

The more data we gather on our content and our visitor, the more we learn about the visitor interaction wit our site, the more relevant will be the recommendations.

So, with Content recommendation we get some scripts that we can integrate in our pages to track both content and visitor behaviors. We also get some dashboards that gives us some insights on our content, like the topics and their distribution on the site, the visitors interaction with the topics. We also get some delivery mechanism that we can take advantage of both in an Optimizely implementation or in another site.

In the next articles, I will go in more details on how to setup Content Recommendation, configure content indexing and organization, present the available dashboards and how to implement personalized content delivery to visitors.