---
type: posts
title: 'What’s Inside Foundation – Razor ViewEngine and Blocks'
draft: false
date: 2020-03-11T10:00:00+00:00
authors: ['Eric St-Pierre']
categories:
  - "What's Inside Foundation"
tags:
  - episerver
  - foundation
---

&#8220;What&#8217;s Inside Foundation&#8221; series will explore the different aspects and patterns used in Episerver reference implementation, Foundation.

In the previous article of the series [What&#8217;s Inside Foundation &#8211; Features Folder &#8211; Implementation][1], I covered how to implement the Features folder organization.&nbsp; That implementation left an opened question,

> &#8220;How do we handle the blocks that would be feature related?&#8221;&nbsp;

In this article I&#8217;ll cover the changes that needs to be applied to this Features folder organization to handle those kind of blocks.

## PROPOSED STRATEGY

Using the default Foundation implementation, the blocks and partial view would be included in the following folders:

```bash
~/Features/Blocks/{0}.cshtml
~/Features/Blocks/Views/{0}.cshtml
~/Features/Shared/{0}.cshtml</code></pre>
```

This path structure doesn&#8217;t allow to put blocks in separated feature folders.

A strategy to overcome this situation could be to:

1. Add blocks into feature folders, and group those folders into a Block folder.
2. Add Partials into feature folders, and group those folders into a Partial folder.

Following this strategy, all content block should be created in the /Features/Blocks folder and all Partials that are not page type partials should be included in the /Features/Partials folder.

To have this organization, we would keep the same FeaturesViewEngine constructor. What would change is the AdditionalPartialViewFormats initialization in which we would declare the Blocks and Partials paths. In those, we would have a folder with the Partial name and the razor view file would have the same name. So the file path would be:

```c#
~/Features/[TYPE]/{0}/{0}.cshtml
```

## Code implementation

```c#
private static readonly string[] AdditionalPartialViewFormats =
{
    "~/Features/Blocks/{0}/{0}.cshtml",
    "~/Features/Partials/{0}/_{0}.cshtml"
};


public FeaturesViewEngine()
{
    ViewLocationCache = new DefaultViewLocationCache();

    var featureFolders = new[]
    {
        "~/Features/%1/{1}/{0}.cshtml",
        "~/Features/%1/{0}.cshtml",
        "~/Features/Partials/%1/_{0}.cshtml"
    };

    featureFolders = featureFolders.Union(AdditionalPartialViewFormats).ToArray();

    ViewLocationFormats = ViewLocationFormats
        .Union(featureFolders)
        .ToArray();

    PartialViewLocationFormats = PartialViewLocationFormats
        .Union(featureFolders)
        .ToArray();

    MasterLocationFormats = MasterLocationFormats
        .Union(featureFolders)
        .ToArray();
}
```

If we want to deconstruct a partial view into a bunch of components, for example having the site logo inside a header partial, we would add those 2 components into the same feature folder. Having one partial rendered into another, living in the same file structure cause some path resolving issues. To manage this, we can add a new partial views location path, having a replacement token in it. The replacement feature name would be passed as a parameter in the ViewData when rendering the partial.

An example of that would be to include a Navigation partial inside a Header feature partial. To include the Navigation in the Header feature, we would use the following code:  
Header.cshtml

```c#
@{ Html.RenderPartial("Navigation", Model, new ViewDataDictionary { { "Feature", "Header" } }); }
```

The ViewData Feature property would be handle in the FileExists and CreateViewPartal in the location path replacement token.

In the FileExists, we would add a new condition that checks for the Feature property in the VewData.

```c#
protected override bool FileExists(ControllerContext controllerContext, string virtualPath)
{
    if (controllerContext.HttpContext != null && !controllerContext.HttpContext.IsDebuggingEnabled)
    {
        return _cache.GetOrAdd(virtualPath,
            _ => HostingEnvironment.VirtualPathProvider.FileExists(virtualPath));
    }

    if (controllerContext.Controller == null)
    {
        return base.FileExists(controllerContext, virtualPath);
    }

    /*-- BEGIN - New Condition --*/
    if(controllerContext is System.Web.Mvc.ViewContext && ((System.Web.Mvc.ViewContext)controllerContext).ViewData.ContainsKey("Feature")) {
        return base.FileExists(controllerContext,
            virtualPath.Replace("%1", ((System.Web.Mvc.ViewContext)controllerContext).ViewData["Feature"].ToString()));
    }
    /*-- END - New Condition --*/

    return base.FileExists(controllerContext,
        virtualPath.Replace("%1", GetFeatureName(controllerContext.Controller.GetType().GetTypeInfo())));
}
```

And the CreatePartialView would also have a similar condition that check for the Feature property.

```c#
protected override IView CreatePartialView(ControllerContext controllerContext, string partialPath)
{
    /* --- BEGIN - New Condition --- */
    if (controllerContext is System.Web.Mvc.ViewContext && ((System.Web.Mvc.ViewContext)controllerContext).ViewData.ContainsKey("Feature"))
    {
        return base.CreatePartialView(controllerContext,
            partialPath.Replace("%1", ((System.Web.Mvc.ViewContext)controllerContext).ViewData["Feature"].ToString()));
    }
    /* --- END - New Condition --- */

    if (controllerContext.Controller != null)
        return base.CreatePartialView(controllerContext,
        partialPath.Replace("%1", GetFeatureName(controllerContext.Controller.GetType().GetTypeInfo())));

    return base.CreatePartialView(controllerContext, partialPath);
}
```

Then both the Header and Navigation partials would be created into the Header feature.

## Block and Partials filename

One last thing to note about this configuration is the name of the razor view files. When rendering the blocks and partials inside the razor view, the name would always be the Feature name, without any special characters. But when creating the .cshtml partials razor view files, the name for Partials would begin with an underscore (\_).

```c#
{ Html.RenderPartial("Header", Model); }
```

## LAYOUTS

With this path configuration, Layouts would be handle as a feature inside the Layouts feature folder.

## FOLDER STRUCTURE

So, with all those configuration, if we want to implement the following requirements:

- An Episerver block for content editor named TextBlock
- A general layout named \_Layout which would include the page main component
- A Header, including a navigation, which would be included in the general layout

the folder structure would look like:

```bash
site/
|
|- Features/
|  |- Blocks/
|     |- TextBlock/
|       |- TextBlock.cs
|       |- TextBlock.cshtml
|
|  |- Layouts/
|     |- _Layout.cshtml
|
|  |- Partials/
|     |- Header/
|       |- _Header.cshtml
|       |- _Navigation.cshtml
```

So with those ViewEngine customization, we can now handle all main Episerver component inside their own feature folders, allowing us to store together the files that should change together.

[1]: /posts/foundation-features-folder-implementation/
