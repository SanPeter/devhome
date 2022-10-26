---
type: posts
title: 'Create some Optimizely sites on .NET5'
draft: false
new: true
date: 2022-10-26T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
ogImage: "images/social-move-net5.png"
categories:
  - net5
tags:
  - optimizely
  - net5
---

This is the third article in a 3-part series on how to create an Optimizely based on the .NET5 framework. In the [previous article](https://eric.st-pierre.xyz/posts/move-net5-cli-templates/) of this series, I went into installing the tools and scaffolding templates that will help us create some new Optimizely projects. In this article, I will go over the required steps to create some new CMS, Commerce and Alloy sites.

### Create Empty CMS

Those would be the basic steps that you could use to create a new site

1. Create the project from the template
2. Create the database(s)
3. Create the admin user
4. Restore the NuGet packages
5. Build the solution
6. Run your site

The actual command would be

```bash
> dotnet new epi-cms-empty --name DemoEmptySite --output ./DemoEmptySite
> cd DemoEmptySite
> dotnet-episerver create-cms-database "./DemoEmptySite.csproj" -S localhost -U sa -P Episerver123! --database-name "DemoEmptySite.Cms"  --database-user DemoEmptySite.User --database-password Episerver123!create-cms-database "./DemoEmptySite/DemoEmptySite.csproj" -S localhost -U sa -P Episerver123! --database-name "DemoEmptySite.Cms"  --database-user DemoEmptySite.User --database-password Episerver123!
> dotnet-episerver add-admin-user -u admin -p Episerver123! -e admin@example.com -c EPiServerDB ./DemoEmptySite.csproj
> dotnet restore
> dotnet build
> dotnet run
```

By using the create database command, you could get in a situation where you will have 2 databases configured. The create-cms-database CLI command updates the appsettings.config configuration file, but by default, the dotnet new command will have configured the database in the appsettings.Development.json file. So, to access the newly create database, you can either remove the connection string from appsettings.Development.json or update it with the information from the appsettings.json file.

 One thing to note when creating an empty site is that the https://localhot:5000 , which is default URL created, will not return any site since none is configured in the admin interface.

To install Alloy, you would use the same steps but use the epi-alloy-mvc project template when running the dotnet new command instead of epi-cms-empty.

### Create Empty Commerce

Commerce would be similar, but you need to create 2 databases.  You need one database (create-cms-database) for the site content and one database (create-commerce-database) for the product catalog and commerce database.  For a commerce site, the project template will be  epi-commerce-empty

```bash
> dotnet new  epi-commerce-empty --name DemoCommerceEmptySite --output ./DemoCommerceEmptySite
> cd DemoCommerceEmptySite
> dotnet-episerver create-cms-database "./DemoCommerceEmptySite.csproj" -S localhost -U sa -P Episerver123! --database-name "DemoCommerceEmptySite.Cms" --database-user DemoCommerceEmptySite.User --database-password Episerver123!
> dotnet-episerver create-commerce-database "./DemoCommerceEmptySite.csproj" -S localhost -U sa -P Episerver123! --database-name "DemoCommerceEmptySite.Commerce" --reuse-cms-user
> dotnet-episerver add-admin-user -u admin -p Episerver123! -e admin@example.com -c EPiServerDB ./DemoEmptySite.csproj
> dotnet restore
> dotnet build
> dotnet run
```

After creating the site, you will need to verify your connection strings to make sure you access the newly created database, as you need to do for a CMS site.

**Commerce Error - Can't load Catalog**

When loading the Commerce site and going to the Commerce Admin interface, you might get the following error

_Failed loading content with the url/uri: epi.cms.contentdata:///-1073741823\_\_CatalogContent_

Looking for this error, I found the following blog post on how this error was fixed in previous version of an Optimizely commerce site

[https://world.optimizely.com/forum/developer-forum/Commerce/Thread-Container/2018/7/getting-error-when-loading-commerce-catalog/](https://world.optimizely.com/forum/developer-forum/Commerce/Thread-Container/2018/7/getting-error-when-loading-commerce-catalog/)

After creating the group "Administrators" and adding myself to that group, I was able to run the pending migrations by accessing the URL **[https://localhost](https://localhost/):xxxxx/EPiServer/Commerce/Migrate/index?autoMigrate=true.**

So, with the steps and commands presented in this blog post, you can get some sites running both to start some new projects or to test or demo some functionalities.