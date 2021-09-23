---
type: posts
title: 'Solution setup – Config files'
draft: false
date: 2020-03-04T11:15:00+00:00
authors: ['Eric St-Pierre']
categories:
  - 'Solution Setup'
tags:
  - episerver
  - setup
---

&#8220;How to setup a project&#8221; is a series about the basic tools and configurations that can be used into starting a new development project.

Have you ever worked on a project where you had to jumble around configuration to be able to run an Episerver site locally for development purpose?&nbsp; On an Agile project, have you ever switch between feature branches and found out that your local configurations did not followed. In this article, I&#8217;ll go over some configurations we use to get over this.

## ConnectionStrings

Databases connection strings are one of the first thing that will change from one environment to the other. One thing that is allowed in the web.config is to configure an external file to fill a section.&nbsp; So a way to enable each developer to get their own files would be to change the web.config to use an external file.&nbsp;

In the Web.config, connection string would be configured as:

`<connectionStrings configSource="connectionStrings.config" />`

And the connectionStrings.config would be

```XML
<connectionStrings>
<add name="EPiServerDB" 
       connectionString="[CONNECIONSTRING]" providerName="System.Data.SqlClient" />
<add name="EPiServerAzureBlobs" 
       connectionString="DefaultEndpointsProtocol=https;AccountName=ChangeThis;AccountKey=ChangeThis" />

<add name="EPiServerAzureEvents" 
       connectionString="Endpoint=sb://ChangeThis.servicebus.windows.net/;SharedAccessKeyName=ChangeThis;SharedAccessKey=ChangeThis" />
</connectionStrings>
```

Each developer would have their local copy with specific configuration. This file would be added to the .gitignore so that it&#8217;s not shared between developers, and it would sit in the project folder without being affected by feature branch switches.

## APPSETTINGS

Another configuration that could change would be the appsettings.&nbsp; For this one, you can specified an overriding file. In this file, a developer could override any values by specifying in this file only is local values. This overriding file would also be placed into the .gitignore also.

Web.config

```XML
<appSettings file="AppSettings.config">
   <add key="ApplicationSettingKey" value="sourceControlApplicationSettingValue"/>
</appSettings>
```

AppSettings.config

```XML
<appSettings>
  <add key="ApplicationSettingKey" value="localApplicationSettingValue"/>
</appSettings>
```

## EPISERVER LOG

Another place you could look for to take the full advantage of the Episerver platform would be the logging configuration in the EPiServerLog.config configuration file. The first thing you should look for would be the path into which the .log files are created.&nbsp; In a default logging configuration, the log files would go in App_Data.&nbsp; If you did not put the App_Data folder in your .gitignore file, you could end-up sharing your log files with other members of your project team.

```XML
<log4net>
    <appender name="errorFileLogAppender" type="log4net.Appender.RollingFileAppender" >
        <!-- Consider moving the log files to a location outside the web application -->
        <file value="App_Data\EPiServerErrors.log" />
```

Then you should check if the logging level provides you with log information pertinent to the project your working on. Logging at a level too verbose could end up slowing down your solution.&nbsp; By default, the logging levels would be setup to Error.

```XML
<logger name="EPiServer.Core.OptimisticCache" additivity="false">
        <level value="Error" />
    </logger>
    <logger name="EPiServer.Core.ContentProvider" additivity="false">
        <level value="Error" />
    </logger>
    <logger name="EPiServer.Data.Dynamic.Providers.DbDataStoreProvider" additivity="false">
        <level value="Error" />
    </logger>
    <logger name="EPiServer.Data.Providers.SqlDatabaseHandler" additivity="false">
        <level value="Error" />
    </logger>
    <logger name="EPiServer.Data.Providers.ConnectionContext" additivity="false">
        <level value="Error" />
    </logger>
```

## EDITOR CONFIG

One way to ensure you minimize merging conflicts due to file formatting changes, is to apply consistent formatting rules through all developers.&nbsp; File formatting rules can be set into Visual Studio.&nbsp; But one of the issues with setting file format rules into Visual Studio is that you need every developer to apply those setting or export and share one developer settings.&nbsp; Another issues is when developers are using a different IDE, like a front-end developer using Vim, Sublime or Visual Code, back-end developer opting for Rider instead of Visual Studio, they would not be sharing any of the formatting styles.

Lucky for us, EditorConfig can help us go over those issues.

EditorConfig is, according to their website:

[https://editorconfig.org/](https://editorconfig.org/)

> &#8220;EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. The EditorConfig project consists of <strong>a file format</strong> for defining coding styles and a collection of <strong>text editor plugins</strong> that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.&#8221;

So, to enable EditorConfig to your project, you need to add a rule definition file into your project. Then every developer would install the plugin in their IDE of choice.

Following are a few articles from Microsoft site to help configure .editconfig tool.&nbsp; In those, you can get an example file and a mapping between the Visual Studio settings and .editconfig configuration.

Create portable, custom editor settings with EditorConfig

[https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2019](https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2019)

Example EditorConfig file

[https://docs.microsoft.com/en-us/visualstudio/ide/editorconfig-code-style-settings-reference?view=vs-2019](https://docs.microsoft.com/en-us/visualstudio/ide/editorconfig-code-style-settings-reference?view=vs-2019)

Formatting conventions

[https://docs.microsoft.com/en-us/visualstudio/ide/editorconfig-formatting-conventions?view=vs-2019](https://docs.microsoft.com/en-us/visualstudio/ide/editorconfig-formatting-conventions?view=vs-2019)

So in this article I went through a few configuration changes that can help developers have their own configuration without stepping on each other toes and how to help prevent merge conflicts.
