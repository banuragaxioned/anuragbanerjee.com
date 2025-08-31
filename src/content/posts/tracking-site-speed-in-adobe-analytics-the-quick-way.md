---
title: Tracking Site Speed in Adobe Analytics — The Quick Way
excerpt: A quick way to start tracking site speed performance of your web properties along with the rest of your Adobe Analytics data.
date: 2021-06-20
---

There are more than enough ways to set site speed tracking on your web property. I’m going to share a quick and easy way to implement this to get broadly accurate data to support your analysis and user experience.

![](https://cdn-images-1.medium.com/max/800/0*Q5iNk5QHvW0IxL0Y)

### Install the plug-in

*   Go to the Extensions tab of your property
*   Install and Publish the Common Analytics Plugins extension.
*   Once published, create a rule to load the library with the following configuration:
*   Event: Library Loaded (Page Top)
*   Condition: None
*   Add an action to the newly created rule:
*   Extension: Common Analytics Plugin
*   Action Type: Initialize `getPageLoadTime`
*   Save to the library and publish the rule

If you are more tech savvy then you can explore couple of more options described here:

*   [Install the plug-in using Launch custom code editor](https://experienceleague.adobe.com/docs/analytics/implementation/vars/plugins/getpageloadtime.html?lang=en#install-the-plug-in-using-launch-custom-code-editor)
*   [Install the plug-in using AppMeasurement](https://experienceleague.adobe.com/docs/analytics/implementation/vars/plugins/getpageloadtime.html?lang=en#install-the-plug-in-using-appmeasurement)

### Setting up events

Before you can use any success events in your reports, you would need to set them up in the Admin section of Adobe Launch.

### Using the plug-in

The getPageLoadTime method sets `s._pltLoadTime` which captures the time in seconds that the previous page took to load. If you do not already have an eVar for Previous Page then the same method also sets `s._pltPreviousPage` so you can reference both of the values together in your reports.

Now on to how to make use of this.

Where you apply depends on your requirements. No one wants multiple server calls — especially in this case. So if you already have an existing rule which is triggered on page load then add the following custom code block into the Actions. I set these on a rule with an event of [Onload (window load)](https://experienceleague.adobe.com/docs/dtm/using/resources/load-order.html).

If you already have existing s.events calls which you do not want to touch with the same rule then you can always use Adobe’s plug-in called [apl (appendToList)](https://experienceleague.adobe.com/docs/analytics/implementation/vars/plugins/apl.html) which allows you to safely add new values to list-delimited variables, such as `events`, `linkTrackVars`, `list`, and others.

Your success events would look something like this in that case:

This will set event105, which would be a custom numeric event (which we created/set earlier), equal to the load time of the previous page. Using a custom event in this case would allow you to get the total amount of time for all page loads of the previous page (from all visitors/visits).

You would need create a calculated metric to get the average page load time for each page which should look something like this:

### Read more

Some really great and helpful resources:

*   [The Hard Truth About Measuring Page Load Time](https://analyticsdemystified.com/google-analytics/hard-truth-measuring-page-load-time/) by Josh West on Analytics Demystified
*   [Measuring Site Speed in Adobe Analytics](https://blog.adobe.com/en/2013/08/16/measuring-site-speed-in-adobe-analytics.html?) by Ben Gaines on Adobe Blog
*   [How to Classify Page Load Time in Adobe Analytics](https://www.ourpcgeek.com/how-to-classify-page-load-time/) on OurPcGeek
*   [Classification Rule Builder workflow](https://experienceleague.adobe.com/docs/analytics/components/classifications/classifications-rulebuilder/classification-rule-builder.html) on Adobe Experience League
