---
title: How to make SVG sprite and use in your 11ty projects
excerpt: Take SVGs, combine them into a symbol sprite file, and then use them anywhere in your 11ty project.
date: 2021-06-23
---

* * *

### How to make SVG sprite and use in your 11ty projects

> _Before I start, I do want to qualify that I’m still new to the world of web development_ (the act of writing things myself) _and have never worked as an engineer myself. I have and do work closely with a team of highly motivated and curious software engineers which encourages me to go out and try new things. The best way to describe what I do a lot of the times is — I_ [_hack_](https://www.merriam-webster.com/dictionary/hack) _things_ (verb: to cut or sever with repeated irregular or unskillful blows; to cut or shape by or as if by crude or ruthless strokes)_._

What we are going to do here is: take a bunch of individual SVGs (stored with your assets), combining them into a symbol sprite file, and then be able to use/call them anywhere in your 11ty project — with some custom presets (icons, logos, etc) as well as custom parameters (height, width).

You might ask — why would someone want to do that? They have infinitely scalability independent of the device size/resolution — for the same file size (and a smaller file size as compared to an image which needs to be retina display ready). You can color, animate and edit them (via scripting or by hand) to make and look/behave exactly how you want them to. And with what I’m exploring below — you’d be able to get faster performance as you don’t need to make any HTTP request (let alone multiple) to get all your icons, logos, illustrations in your website. Faster loading time means better webpage performance, higher search engine ranking and most importantly, an improved user experience.

![](https://cdn-images-1.medium.com/max/800/0*1QdTfQ9KvpSpBe3z)

Photo by [Maik Jonietz](https://unsplash.com/@der_maik_?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

I was part of a conversation (as an observer) where the topic of discussion was the future or promise of SVGs in modern web development (in context of a Jamstack project— using 11ty, Nunjucks, Handlebars, Markdown). What I found fascinating is the idea of taking a bunch of individual assets (SVGs) and compiling them in a single file (sprite) for the front-end/browser to be able to fetch the individual items with a reference/identifier (and not having the need to transfer all the individual SVGs separately.

This is also reminds of me a game that I used play back in the day called [Little Fighter 2](https://lf2.net/) from the 90s. I recalled being fascinated to find out how the game was built (in a very general/vague way) by digging into their asset files to find —guess what .. sprites! — using which they were able to stitch them together to animate the characters — their movements, actions/interactions and skills.

![](https://cdn-images-1.medium.com/max/600/1*Y8JNq8byazSCNNyIEwI9uw.png)

![](https://cdn-images-1.medium.com/max/600/0*NrE7oYwStBZ7Urj6.gif)

Left: Sprite (.bmp) file of a character. Right: Individual spirte “blocks” are stringed together to make animation.

I know this is not exactly the same thing — and I’m not getting into animating sprites or any similar use cases in this post. Why I delved into that is to share the observation that a lot of what we see as trending in the recent years around SVGs, symbol sprites and SVG animations is not too different in principle to how game developers have done things in the past.

### Getting into it

I came across a neat little base package called [eleventastic](https://github.com/maxboeck/eleventastic) by Max Böck which already checked most of the boxes of what I was discussing/hearing on the call.

_EDIT: Max’s repo now uses_ [_eleventy-plugin-svg-sprite_](https://www.npmjs.com/package/eleventy-plugin-svg-sprite) _to generate the sprite instead, which is cool — but I’ve kept (and not updated) his original solution in the post so that folks can understand the underlying working of something like this._

So I started off by [forking the repo](https://github.com/banuragprdxn/eleventastic) and then tried to understand how the author had configured all the SVGs in the `src/assets/icons` directory to be bundled into a symbol sprite file. Neat!

Forked copy from Max’s repo before some more recent changes: [https://github.com/banuragaxioned/eleventastic/blob/master/utils/iconsprite.js](https://github.com/banuragaxioned/eleventastic/blob/master/utils/iconsprite.js)

Then the SVG filename will then be used as the symbol identifier and the icon can be used as a shortcode in your templates or as a direct `xlink:href`. This is where the magic happens!

I expanded upon the `icon` type from Max and added `logo` which accepts `width` and `height` and `colorlogo` which accepts `width` , `height`and `fill` _(to add color to shape)_.

Forked copy from Max’s repo before some more recent changes: [https://github.com/banuragaxioned/eleventastic/blob/master/utils/shortcodes.js](https://github.com/banuragaxioned/eleventastic/blob/master/utils/shortcodes.js)

### In action

*   Now go ahead and add new SVGs into src/assets/icons folder
*   Use shortcodes (`logo`, `icon`, `colorlogo`) and pass the necessary parameters to render to get shapes be rendered from your symbol sprite.

{% icon "wheel" %}

{% logo "hammer", "75", "75" %}

{% colorlogo "wheel", "150", "150", "purple" %}

*   You can also directly use the shape like below.

<svg><use xlink:href="#icon-github" fill="#dd0000"></use></svg>

*   Save and rebuild (if you are not already running in locally using `npm start` (which will auto-refresh your browser)

Once the rebuild is done, you should see something like the below screenshot 🙂

![](https://cdn-images-1.medium.com/max/800/1*akuSG6Sv3wJenGc-05v_kw.png)

Above snippets being put in action

> Note: You can extend this further if you like by passing the fill value from your CSS stylesheets instead of inline (like I did in the example below). Check reference links at the bottom to find out more on how to do that.

Appreciate any feedback and/or suggestions any might have on what I have shared here. Again, a big thank you to Max for his base code package which was super clear, simple, and easy to follow/expand upon — even for a newbie coder like me.

**Source code:**

This is by no means production ready and I’m sure there are ways to improve and further optimize the workflow. The goal of this exercise is to act more as a proof of concept or a _hack_ on how to put this together for some additional use cases (which may or may not be your requirement).

[**banuragprdxn/eleventastic**  
_A simple Eleventy Starter Kit, my base for all new 11ty projects. ( Demo Site) CSS Pipeline (Sass, CleanCSS) JS…_github.com](https://github.com/banuragprdxn/eleventastic "https://github.com/banuragprdxn/eleventastic")[](https://github.com/banuragprdxn/eleventastic)

**References:**

[**The complete guide to SVG**  
_SVG allows us to create icons in a file format that is resolution independent, which is awesome, but due to the…_www.creativebloq.com](https://www.creativebloq.com/features/the-complete-guide-to-svg/6 "https://www.creativebloq.com/features/the-complete-guide-to-svg/6")[](https://www.creativebloq.com/features/the-complete-guide-to-svg/6)

[**maxboeck/eleventastic**  
_A simple Eleventy Starter Kit, my base for all new 11ty projects. ( Demo Site) CSS Pipeline (Sass, CleanCSS) JS…_github.com](https://github.com/maxboeck/eleventastic "https://github.com/maxboeck/eleventastic")[](https://github.com/maxboeck/eleventastic)

[**Template Shortcodes**  
_Template Shortcodes | Eleventy, a simpler static site generator._www.11ty.dev](https://www.11ty.dev/docs/shortcodes/ "https://www.11ty.dev/docs/shortcodes/")[](https://www.11ty.dev/docs/shortcodes/)
