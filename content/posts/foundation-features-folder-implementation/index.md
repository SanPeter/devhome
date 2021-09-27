---
type: posts
title: What’s Inside Foundation – Features Folder – Implementation
draft: false
date: 2020-02-19T12:00:59+00:00
previouslyPublished: true
authors: ['Eric St-Pierre']
categories:
  - "What's Inside Foundation"
tags:
  - episerver
  - foundation
---

&#8220;What&#8217;s Inside Foundation&#8221; series will explore the different aspects and patterns used in Episerver reference implementation, Foundation.

In the [previous article of this series][1], I discussed how the features folder organization can be configured into a new Episerver site, using the reference implementation from Foundation.  In this article, I&#8217;ll go into the detailed implementation and explain how your code can be structured using the features folder organization pattern.

To enable a project to use the features folder organization, we need to implement a few classes, the first one being an extension of the RazorViewEngine. We need to make our own RazorViewEngine implementation so that we can add the features folders into which the engine should look for our controllers and views.&nbsp; To achieve this, we need to append to the LocationFormats our own paths,&nbsp; matching a specific format.&nbsp; For those location format, there is two replacement token that we can use, and they would be:

```c#
{0} Action name (or Episerver ContentType)
{1} Controller name
```

So for an article page, we would create an Article feature folder, in which we would put the PageType, Controller and View.

```c#
"~/Features/Article/ArticlePage.cs"
"~/Features/Article/ArticlePageController.cs"
"~/Features/Article/Index.cshtml"
```

Let&#8217;s configure our feature folder organization by creating a class that will extend RazorViewEngine

```c#
public class FeaturesViewEngine : RazorViewEngine
{
    ...
}
```

Then, in this class, we would need to declare the following two properties

```c#
private static readonly string[] AdditionalPartialViewFormats =
{
    "~/Features/Blocks/{0}.cshtml",
    "~/Features/Blocks/Views/{0}.cshtml",
    "~/Features/Shared/{0}.cshtml"
};
private readonly ConcurrentDictionary&lt;string, bool> _cache = new ConcurrentDictionary&lt;string, bool>();

```

AdditionalPartialViewFormats will contains a list of the folders where the ViewEngine will look for partial views.&nbsp; The \_cache will be used to check if the file exists for a defined feature.

Then we need to define the constructor.

```c#
public FeaturesViewEngine()
{
    ViewLocationCache = new DefaultViewLocationCache();
    var featureFolders = new[]
    {
        "~/Features/%1/{1}/{0}.cshtml",
        "~/Features/%1/{0}.cshtml"
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

The featureFolders variable is used to hold the basic features folders, to which we had the PartialViews locations from the previously defined property.&nbsp; We then assign those locations to the ViewLocation, PartialViewLocation and MasterLocation.&nbsp;

In the feature folders path declaration, there is a new replacement token that appears.&nbsp; This %1 token will be replaced by the actual name of the feature, obtained from a call to the GetFeatureName method. Following is the declaration for this method that will return the feature name out of a received Controller.

```c#
private string GetFeatureName(TypeInfo controllerType)
{
    var tokens = controllerType.FullName?.Split('.');
    if (!tokens?.Any(t => t == "Features") ?? true)
    {
        return "";
    }
    return tokens
        .SkipWhile(t => !t.Equals("features",
            StringComparison.CurrentCultureIgnoreCase))
        .Skip(1)
        .Take(1)
        .FirstOrDefault();
}

```

The name&nbsp; of the feature will be extracted from the full name of a controller, which is the name of the class controller including the namespace.&nbsp; The method first split the full name into tokens separated by a &#8216;.&#8217;, and then return the first element it finds following the Features token.&nbsp; So for a controller that would have a full name of site.Features.Article.ArticlePageController, the feature name would be Article.&nbsp;

The next methods are methods that must be overridden.&nbsp;&nbsp; CreatePartialView and CreateView will call their base counterpart, passing in the location format strings in which the %1 feature token would have been replaced by the feature name.

```c#
protected override IView CreatePartialView(ControllerContext controllerContext, string partialPath)
{
    if (controllerContext.Controller != null)
        return base.CreatePartialView(controllerContext,
        partialPath.Replace("%1", GetFeatureName(controllerContext.Controller.GetType().GetTypeInfo())));
    return base.CreatePartialView(controllerContext, partialPath);
}

protected override IView CreateView(ControllerContext controllerContext, string viewPath, string masterPath)
{
    return base.CreateView(controllerContext,
        viewPath.Replace("%1", GetFeatureName(controllerContext.Controller.GetType().GetTypeInfo())),
        masterPath.Replace("%1", GetFeatureName(controllerContext.Controller.GetType().GetTypeInfo())));
}

```

And&nbsp;the&nbsp;last&nbsp;method&nbsp;that&nbsp;needs&nbsp;to&nbsp;be&nbsp;overridden is&nbsp;the&nbsp;FileExists&nbsp;method&nbsp;that&nbsp;checks&nbsp;if&nbsp;the&nbsp;requested&nbsp;files&nbsp;exist&nbsp;for&nbsp;a&nbsp;feature.

```c#
protected override bool FileExists(ControllerContext controllerContext, string virtualPath)
{
    if (controllerContext.HttpContext != null && !controllerContext.HttpContext.IsDebuggingEnabled)
    {
        if (controllerContext.Controller == null)
        {
            return _cache.GetOrAdd(virtualPath, _ => base.FileExists(controllerContext, virtualPath));
        }
        return _cache.GetOrAdd(virtualPath,
            _ => base.FileExists(controllerContext, virtualPath.Replace("%1", GetFeatureName(controllerContext.Controller.GetType().GetTypeInfo()))));
    }
    if (controllerContext.Controller == null)
    {
        return base.FileExists(controllerContext, virtualPath);
    }
    return base.FileExists(controllerContext,
        virtualPath.Replace("%1", GetFeatureName(controllerContext.Controller.GetType().GetTypeInfo())));
}

```

The last thing that is needed is to register the ViewEngine. To do so, we need to add an InitializationEngine class extension to add our ViewEngine inthe ViewEngines. Then we would create an InitializableModule that will call the InitializeView extended method. Those new classes could be placed into an Initialization feature.

```c#
using EPiServer.Framework.Initialization;
using System.Web.Mvc;

namespace site.Features.ViewEngine
{
    public static class InitializationEngineExtensions
    {
        public static void InitializeView(this InitializationEngine context)
        {
              ViewEngines.Engines.Insert(0, new FeaturesViewEngine());
        }
    }
}
```

```c#

using System;
using System.Linq;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;

namespace site.Features.ViewEngine
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class Initialize : IInitializableModule
    {
        void IInitializableModule.Initialize(InitializationEngine context)
        {
            context.InitializeView();
        }

        void IInitializableModule.Uninitialize(InitializationEngine context)
        {

        }
    }
}
```

The complete example of this implementation can be found in the Foundation GitHub repository ([Foundation.Cms.Display.FeaturesViewEngine][2] ).

With&nbsp;this&nbsp;code&nbsp;in&nbsp;place,&nbsp;you&nbsp;would&nbsp;now&nbsp;have&nbsp;a&nbsp;working&nbsp;features&nbsp;folder&nbsp;structure,&nbsp;and&nbsp;you&nbsp;can&nbsp;add&nbsp;features&nbsp;to&nbsp;your&nbsp;project.

The general blocks&nbsp;and&nbsp;partial&nbsp;views would&nbsp;be&nbsp;included&nbsp;in&nbsp;the&nbsp;following folders:

- ~/Features/Blocks/
- ~/Features/Blocks/Views/
- ~/Features/Shared/

Everything&nbsp;that&nbsp;would&nbsp;be&nbsp;page&nbsp;or&nbsp;technical&nbsp;features&nbsp;would&nbsp;be&nbsp;placed&nbsp;in&nbsp;their&nbsp;~/Features/%[Feature]&nbsp;folder.

One thing to note about this implementation is that controller-less blocks would work as is if they are added to the Features/Blocks or Features/Blocks/Views folders. But if you try to add a controller-less block to a feature folder, the GetFeatureName method used when trying to search in every feature folder would then return nothing, since there is no controller linked to the block to identify the feature name. In that case the blocks would not be founded.

Now we know how to implement the feature folder organization for model, pages, controllers and general purpose blocks. I&#8217;ll cover some ways to be able to add controller-less blocks into the feature folders into the next article of this series.

### REFERENCES

- <https://marisks.net/2017/02/03/razor-view-engine-for-feature-folders/>

[1]: /posts/foundation-features-folder-introduction/
[2]: https://github.com/episerver/Foundation/blob/develop/src/Foundation/Infrastructure/Display/FeaturesViewEngine.cs
