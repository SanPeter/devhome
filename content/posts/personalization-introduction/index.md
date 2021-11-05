---
type: posts
title: 'Personalization - An introduction'
draft: false
new: false
date: 2021-09-29T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
categories:
  - personalization
tags:
  - optimizely
  - personalization
---

This is the first article in a series about personalization. During this series, I will cover the different sides of personalization, from more general definitions of personalization, to Optimizely cloud-based products offering and how to implement them.

In this article, for the sake of simplicity, "**content**" could be anything from literal content, media assets or products on an e-commerce site.

Personalization is everywhere. We are exposed to it every day, being conscious of it or not. "You may also like", "People like you are also watching", "Recommended for you" are all signs of personalization at work. This personalization can be achieved at many levels, from selecting the look-and-feel of an application all to way to individualized product recommendations from an AI on an e-commerce site.

As Optimizely partners, customers we will encounter won't have the same level of personalization maturity. First there will be the customers who are not started yet on the personalization journey. Some other sites may already be using visitor groups to deliver different content to returning visitors or provide personalized content using Optimizely Personalization suite of products. So, how can we help our customers, as partners, understand and take better advantage of all that personalization as to offer.

## Some Definitions

To be able to help our customers, we first need to understand personalization, the processes that we need to put in place and the implementations required to deliver a great personalization experience.

Let's start with a few definitions.

> Personalization is a process that creates a relevant, individualized interaction between two parties designed to enhance the experience of the recipient.
> [Gartner][1]

> Personalization is the act of tailoring an experience or communication based on information a company has learned about an individual.
> [Salesforce][2]

> Personalization consists of tailoring a service or a product to accommodate specific individuals, sometimes tied to groups or segments of individuals. A wide variety of organizations use personalization to improve customer satisfaction, digital sales conversion, marketing results, branding, and improved website metrics as well as for advertising. Web pages can be personalized based on the characteristics (interests, social category, context, etc.), actions (click on button, open a link, etc.), intent (make a purchase, check status of an entity), or any other parameter that can be identified and associated with an individual, therefore providing them with a tailored user experience.
> [Wikipedia][3]

A common definition could be:

> Personalization is the process of offering an exclusive, one-on-one experience for each visitor of a site, based on previous behavior and engagement.

What we can take out of all of this is that it's all about the visitor's engagements with the site content. It's about creating a trust between the visitor and the service we can provide them.

To create this trust, we need to find the perfect balance between the visitor's need and our client business goals. Visitor will come to a site with a specific need, they will come to the site looking for something, be it some research articles or a product to buy. The business, on its side, will be looking to understand more about its audience. It will be looking to nurture and engage its customer base, by creating trust on the services they provide. The following would be more relevant to an e-commerce site, but business can also implement some personalization strategies to promote cross-selling and up-selling by using tracked information from the client and promote products that are more specific to the client needs.

Visitors will engage more if they are presented with content that is relevant to them, that helps them move forward into their visitor / customer journey.

Personalization must be seen as a process and not a project. It's not something we can estimate in a sprint, planned, implemented, and be done with it. It needs to be measured and evaluated. Then from the data that is gathered, we can iterate on what is observed, change what needs to be fixed and apply new ways to deliver relevant content.

## Classification

Personalization could be classified in 3 families, representing different levels of personalization maturity.

- **Active personalization**: user take in charge the delivered content and update it intuitively or logically to fit its utilization. An example of that could be to let the user choose between light / dark theme for a website.
- **Passive**: The content provider adjusts the delivered content based on parameters that define the visitors. An example of that would be to apply a visitor group based on a defined segment of visitor (ex: returning visitor).
- **Interactive**: The content is delivered by an artificial intelligence algorithm, who can deliverer content based on the behaviors of the visitor.

Moving forward on the maturity path, the implemented solution will reach some levels of personalized content sophistication.

- It would start from a **Reactive** personalization derived from user attributes and event data.
- To move to a more **Proactive** personalization combining user and event data with external managed data. Targeted to smaller segments. The more content tracked; the narrower will be the segments.
- And at some point, it would reach **Individualization**, formed from dynamic relationships between user attributes and detailed product data.

## High level steps to personalization

Following is a list of implementation steps that could be discussed with clients to help them along their personalization journey. Those steps will be covered in more details in the following articles, with use cases and implementation guidelines

1. Deliver content to user base on segments.
2. Track information about user's behaviors on the site.
3. Deliver content based on user behaviors.
4. Get more information about your content.
5. Let an AI algorithm deliver relevant content to your visitor, based on the algorithm knowledge of your content and the behavior patterns it modeled from the user's behaviors.

But along those steps, it important to keep in mind that personalization is a process. That each of those steps should be splitted up in smaller chunk, on which we could iterate, following measurement and evaluation.

## The place of AI in all of this

With all the gathered data about visitors, it would be a herculean job to process and analyze this data to provide relevant content to visitors. This is where we can leverage the artificial intelligence progress.

Artificial intelligence can be defined as

> any system that perceives its environment and takes actions that maximize its chance of achieving its goals
> [Wikipedia][4]

In the case of personalization, the environment would be the data we collect about the visitors, and any information we could gather about the content we want to present to those visitors. The goal would be to deliver relevant content that would engage those visitors.

Machine Learning (ML), Artificial Intelligence (AI) and the Statistical Analysis (SA) can be used to create some mathematical models based on the observed visitor behavior. Then those statistical models can be used to recommend content. The more data we gather, the more we learn about the visitors, the more precise and relevant the recommendations will be.

## Conclusion

In this article, I went over the more academic side of personalization, from definitions to classification and level of personalization. In the following articles, I will cover the more technical side of personalization, and some implementation ideas and guidelines using Optimizely cloud-based products.

[1]: https://www.gartner.com/smarterwithgartner/3-ways-personalization-can-improve-the-employee-experience
[2]: https://www.salesforce.com/resources/articles/personalization-definition/
[3]: https://en.wikipedia.org/wiki/Personalization
[4]: https://en.wikipedia.org/wiki/Artificial_intelligence
