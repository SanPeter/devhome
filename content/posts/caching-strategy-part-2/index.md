---
type: posts
title: 'How to start a formula 1 engine - and improve our site visitor experience (part 2)'
draft: false
new: false
date: 2022-01-18T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
ogImage: "images/social-caching-part-2.png"
categories:
  - caching
tags:
  - optimizely
  - caching
---

This is the second article in a [series](https://eric.st-pierre.xyz/categories/caching/) about using what we can learn from the formula 1 engineers and apply it to our Optimizely implementation to improve our visitor experience. In this series, I will discuss some techniques to enhance our visitor experience by improving the delivery time of your content.

In the [previous article](https://eric.st-pierre.xyz/posts/caching-strategy-part-1/), I discussed the base of a strategy and some basics metrics that can be used to measure a site performance.  In this article, I will discuss some memory, object, and server output caching techniques.

So, let's continue with formula 1 engine analogy and see how we could apply some similar techniques to our website.

## Liquid and Engine Oil - Memory Cache


The formula 1 needs liquid to flow through its part to have the engine running. If the liquid is not at an ideal temperature, the engine won't perform at its optimal performance. And if the liquid is not flowing with ease in the engine parts, some parts won't perform as they should or would worn out prematurely, causing some issues that could put the full engine at an alt.  To prevent those issues,  the liquid will start cold in a container, be warmed up externally to the engine and be injected fully ready to be used in the engine.

On our website, the liquid that makes the site alive and fully functional is our data. Like the liquid in a formula 1 engine, our data is stored cold, flow through content API requests to finally be delivered to our site visitor. If this data is reprocessed at each step for every visitor, it will create friction and our application will suffer... and could eventually come to a stop. Another side-effect of this would be the impact on the wait time of the visitor. If visitors must wait to get what they are looking for, they will probably leave the site to get their information elsewhere.  To provide a better user experience and prevent our user from leaving, we can apply the most common type of cache available in an Optimizely implementation, which is the memory cache. Memory cache comes primarily in two forms, object cache and server output cache.

## Heating the engine oil - Object Cache


On a formula 1, the first thing to do to prepare the oil is to get it from its cold storage and warm-it up. Once it's warmed-up, we want to keep it warm and ready to be used by the engine.

On our site, it's the cold data stored into the database that we want to warm-up.  This is where a memory cache implementation can help us.  Memory cache are data items that are stored in the RAM of the server instance and that are delivered to the client instead of going all the way to the database to get this piece of data.  It's important to note that in a multi-server environment, each server maintain its own cache.  The main goal of the memory cache is to prevent the reprocessing of every data request for every visitor. When a request is made to the site, the web server check if the required information is available in its cache. If it is, we are done, and this is what gets return to the visitor. If the data is not available in the cache, requests to the content API and database are done to gather the information. Then, this data is stored in the cache for future request, and it is returned to the client. 

Lucky for us, by default, Optimizely provides an implementation of memory cache that automatically caches objects that are requested from the API, such as content instances.  The object cache implemented is an in-memory cache that stores only read-only objects for better performance.  This cache will bring us a performance gain when displaying a page for content that is requested often, when rendering a menu, the same cache instance is used. 

When you have site requirements for heavy CPU load process or, heavy transformation done to data, you can apply your own custom object cache.  This implementation would store the result of the process data and store it in memory for reuse.  A custom implementation could also be useful if you often do some calls to external API for data that does not change often.  This could be good for external API calls to a product price list service who would be updated daily.

By applying this cache technique, we now get the following performance metrics.

![benchmark](images/benchmark-1.png)

## Lubricating the engine - Output cache


Now that we have our engine oil all warmed-up, let's keep it flowing to keep the moving parts lubricated. Hot spot can break down the chemical composition of the oil in which they occur which which in turn can cause some engine problems.

Even if we get our data at a blazing speed from the database by using database server scaling or by applying the object cache strategy, if we get to reprocess the rendered HTML at every client request, we will get into performance problems. This is where an output caching strategy can help us. Like the process of object caching, we would cache the HTML content generated by page and block rendering and deliver the cached version to the visitor if it's available.  By default, Optimizely Content Cloud won't provide us with an output caching strategy.  So, this time, we need to apply some .NET techniques to implement it.

The first thing to do would be to add some configuration that will activate the output cache.

```
<system.web>
    <caching>
      <outputCacheSettings> 
        <outputCacheProfiles>
          <add name="ClientResourceCache" enabled="true" duration="3600" varyByParam="*" varyByContentEncoding="gzip;deflate" />
        </outputCacheProfiles>
      </outputCacheSettings>
    </caching>
</system.web>
```
From this configuration, all Optimizely pages would return the same content until cache expires

Using an OutputCache directive applied to a page, we can Vary the cache with PageId and Language, which would made Optimizely content page unique.

```csharp
<%@ OutputCache Duration="60" VaryByParam="id,epslanguage" %>
```

To avoid putting this in view code for every page, we can use the OutputCacheAttribute on a base PageController for all our Optimizely content rendering  

```csharp
[OutputCache(Location = System.Web.UI.OutputCacheLocation.Server, VaryByParam = "id,epslanguage")]
public abstract class PageControllerBase : PageController, IModifyLayout where T : SitePageData
{
}
```

Applying those configurations could cause some issues to the content editors.  They would get returned the cache version of a page instead of the content are editing or have just published.  To fix those issues, we extended the OutputCacheAttribute to prevent caching when a logged user is viewing site  

```csharp
[EditorsContentOutputCache(Location = System.Web.UI.OutputCacheLocation.Server,
VaryByParam = "id,epslanguage",
VaryByCustom = "VisitorGroup,PriceGroup,Authenticated,Uri")]
public abstract class PageControllerBase : PageController, IModifyLayout where T : SitePageData
{
}
```

Another configuration that could be applied is to override the VaryByCustom in Global.ascx to allow option for some language, authentication, and Commerce specific needs  

```csharp
public override string GetVaryByCustomString(HttpContext context, string custom)
{
  string customString = base.GetVaryByCustomString(context, custom);
  var varybyList = custom.Split(',');
  foreach (string varyBy in varybyList)
  {
    switch (varyBy.ToLower())
    {
      case "uri":
        customString += "uri=" + context.Request.Url.AbsoluteUri.ToLower();
        break;
      case "pricegroup":
        customString += "pricegroup=" + CustomerContext.Current.GetApplicablePriceCode();
        break;
      case "visitorgroup":
        customString += "visitorgroup=" + "TODO";
        break;
      case "authenticated":
        customString += "auth=" + context.User.Identity.IsAuthenticated.ToString().ToLower();
        break;
      case "languagecookie":
        string lcv = "empty";
        HttpCookie languageCookie = context.Request.Cookies["Language"];
        if (languageCookie != null)
          lcv = languageCookie.Value?.ToLower();

        customString += "lc=" + lcv;
        break;
      default:
        break;
    }
  }
  return customString;
}
```

Those server output cache techniques are best used for the rendering of a full HTML page, with little variations.  If you have some more personalized content, like a greeting message for your site visitors, then you should consider applying the server output cache, and manage the greeting part of your page as a front-end component.  Then you would get the performance of a quick first load, and the personalization you need.

  
By using the server output cache, we now get under the 500ms to the first load of a page.

![benchmark](images/benchmark-2.png)

## Synchronized Cache - A warning on scaling


The memory cache is unique to each AppService instance of DXP resources that we use. Since each of those virtual environments are unique, each one as its own memory cache. If we scale our environment to double the instances of the virtual environment, we will also double the memory cache. If we have an item in the memory cache that is removed from one instance, this item won't get removed from the other cache and we would out of sync. We would get different results depending on which instance we hit.

To fix this issue, Optimizely is providing us another type of cache. By implementing the ISynchronizedObjectInstanceCache, we would implement a cache that attempts to synchronized cached item between instances. This synchronization library prevent instance of having invalid data by sending notification of cache removing events on the Azure Message Bus for all running instances so that they can also remove that item from their respective cache. One thing to note is that this notification process is only for removal. It only prevents cache to keep invalidated item. Building the memory cache is the responsibility of each instance, and it get cleared every time an instance is started or recycled.

In this article, I discussed some memory cache techniques that can help us achieve a faster first load time on our page delivery.  With those techniques, we now get a 200ms to 1 sec first load time without having to up-scale or tax our DXP hosted instances.
