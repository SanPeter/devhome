---
type: posts
title: 'What will the .NET release cycle look like?'
draft: false
new: false
date: 2022-03-10T10:00:00+00:00
previouslyPublished: false
authors: ['Eric St-Pierre']
ogImage: "images/social-move-net5.png"
styleElements: true
categories:
 - net5
tags:
 - optimizely
 - net5
---

One thing that comes out of the Optimizely migration to the .NET5 framework process is when should you upgrade your solutions? To answer this question, we should be looking at what will be the lifecycle for the .NET. releases going forward.  .NET releases will be following the Long-Term Support (LTS) product lifecycle management policy.  One of the goals of this lifecycle management policy is to reduce the risk of regression.  This can be achieved by releasing major updates less frequently, and allowing users to test an alternate, updated version of the framework.  This means that one version out-of-two, which is the Long-term support version, will offer a longer support period from Microsoft than the Short-term support (STS) version, which main goal will be to introduce new features.

The Short-term support releases will be supported by Microsoft for 6 months following the release the next LTS version.  The Long-Term Support version, on their side, will be supported for 3 years following their releases.

Following is a table listing the planned availability for the future release.

| Version  | Type | Released       | Support Ends  |
|----------|------|----------------|---------------|
| .NET 5.0 | STS  | November  2020 | May 2022      |
| .NET 6.0 | LTS  | November 2021  | November 2024 |
| .NET 7.0 | STS  | November 2022  | May 2024      |
| .NET 8.0 | LTS  | November 2023  | November 2026 |
| .NET 9.0 | STS  | November 2024  | May 2026      |

This faster release cycle is a reason why we already talk about a migration to .NET6.  .NET5 is a Short-term support version, and its support will end in May 2022.  So, we already need to plan to the next version.  Lucky for us, going forward, migration will be a lot smoother, since the framework base will be the same.  Having a tight release cycle will help us plan the future migration since we already have an idea of when new releases will be available.  Being always at the latest version should be the way to go, but if your site code does not evolve much, you could go with only running on the LTS versions.  In that case, migrating now to be on the modern version of .NET, then updating to .NET6 and then waiting for version 8 of .NET would be a good migration plan.  It's the migration from the legacy .NET framework to the current framework that will involve the most work.  And waiting for future .NET release will make things harder to migrate and might involve more code compatibility issues. If you are implementing a new solution or your code evolves at a fast pace, then always being at the latest version of .NET and taking advantage of the latest features and upgrades would be the way to go.

Optimizely is already working on an upgrade to support .NET6 and there is already a version available for both the CMS.Core package.

If you want more details on using .NET6 now, you can check Magnus Rahl article on the subject.

https://world.optimizely.com/blogs/Magnus-Rahl/Dates/2022/2/rolling-out-support-for--net-6/

