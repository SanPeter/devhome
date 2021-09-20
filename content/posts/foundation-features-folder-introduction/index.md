---
type: posts
title: 'What’s Inside Foundation – Features Folder – Introduction'
draft: false
---

&#8220;What&#8217;s Inside Foundation&#8221; series will explore the different aspects and patterns used in Episerver reference implementation, Foundation.

This is the first article in the &#8220;What&#8217;s Inside Foundation&#8221; series.&nbsp; Foundation has been launched at Ascend 2019 in Miami.&nbsp; The goal of the Foundation project is to &#8220;offer a starting point that is intuitive, well-structured and modular allowing developer to select Episerver products as projects to include or exclude from their solution.&#8221;&nbsp; Ever since I got my hand on it, I started to dig into it to see what pieces could be used to start implementing new projects.&nbsp;

Foundation code can be found on GitHub ([https://github.com/episerver/Foundation](https://github.com/episerver/Foundation)).&nbsp; The project page has all the system requirements, configurations and set-up instructions to help you spin-off a site using Foundation. This project comes with an handful of implementation patterns that can be demoed from the site that you can create from one of the provided starter set of data.

One of the first thing I noted was the structure that is used to organize the Models, Views and Controllers files.&nbsp; Instead of going to the classic (default) MVC structure which split files by technical concerns, Foundation went with a more business oriented structure.&nbsp; They implemented the features folder structure which split the files by business features, grouping the Models, Views and Controllers related to the feature.&nbsp; Going to this file organization helps implement the practice of “files that change together should be stored together.”&nbsp;

Some of the key benefits of this file feature folders structure are:

- Align with a more Agile way of working on projects.
- Helps preventing merge conflicts.
- Each feature can be scale and updated on it&#8217;s own, even allowing for different front-end technology stack (ex: a feature could be developed in a SPA framework).
- Feature could be more easily reused since you only have to copy a folder between projects.

To illustrate this organization, let&#8217;s use an Episerver use case.&nbsp; You have a requirement that states that a content editor should be able to add an article page, which will be rendered as part of the site.&nbsp; In that case, you would first create a PageType class into the Models folder.&nbsp; Then, you would add the ArticleController into the Controllers folder.&nbsp; And finally, you would implement some views and partial views into the Views and Shared views folders.

```bash
site/
|
|- Models/
| |- Pages
| |- ArticlePage.cs
|
|- Controllers/
| |- ArticleController.ascx
|
|- Views/
| |- Article/
| |- Index.cshtml
|
| |- Shared/
| |- Article
| |- _ArticlePartial.cshtm
```

If you would implement the same page type in a project using the feature folders structure, you would create all the same files (Model, Views and Controller), but you would have created all of them in a single feature folder called Article.

```bash
site/
|
|- Features
| |- Article
| |- ArticlePage.cs
| |- ArticleController.ascx
| |- Index.cshtml
| |- _ArticlePartial.cshtml
```

Following is a way to start implementing the feature folders structure on a new Episerver site.

- reate a MVC Web Application using the Episerver template.
- Update the Nuget packages to the highest minor version and update the EpiDatabase if needed.
- Create a Features folder.
- Move web.config from the folder Views to the Features folder to enable Razor support.
- Remove the Controllers folder.
- Remove the Models folder and all it&#8217;s sub-folder (Blocks, Media, Pages, Properties).

### References

- [https://haselt.com/blog/feature-folders-structure-in-asp-net-mvc"](https://haselt.com/blog/feature-folders-structure-in-asp-net-mvc)
- [https://timgthomas.com/2013/10/feature-folders-in-asp-net-mvc/"](https://timgthomas.com/2013/10/feature-folders-in-asp-net-mvc/)
- [https://timgthomas.com/2013/10/feature-folders-and-javascript/"](https://timgthomas.com/2013/10/feature-folders-and-javascript/)
