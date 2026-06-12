---
title: What is Jamstack — for everyone else?
excerpt: A non-technical explainer of Jamstack — what it is, why it makes sites faster, safer, and easier to scale, and when it makes sense for you.
date: 2021-12-16
---

You are probably here because you’ve had the word “Jamstack” (or decoupling) being thrown at you many times, or you have been having a case of FOMO 😮 when it comes to this buzzword, or maybe everything you search for returns something very technical. No, it’s not just you.

![](https://cdn-images-1.medium.com/max/1024/1*n0rMtkEH7koLvDrQWBE_WQ.jpeg)

_No, not that kind of a jam_

## The definition

Jamstack is a form of architecture designed to make digital experiences faster, more secure, and easier to scale. It brings various tools together into an integrated workflow that allows people to spend their time doing what they love.

**Jam** from Jamstack is an abbreviation for **J**avaScript, **A**PIs, and **M**arkup. Javascript for the dynamic functionalities, APIs for connecting to third-party services (like payment gateways, lead gen/CRM tools, etc), and Markup is your website’s statically served assets _(HTML, CSS, JS)_.

The idea is: Businesses don’t have to worry as much about scalability or maintenance, Engineers get to use a modern toolset that helps improve efficiency, Marketers benefit from fast-to-market, and users appreciate the speed/performance of the digital experiences.

## Why Jamstack?

### Performance and scale

Everything that the user sees (the front end) is generated beforehand and is done so usually in a highly optimized static format and assets.

When the user hits your website, they don’t have to wait for the server to compute/calculate or generate the page first — they are directly served to the user in a format that your browser can readily use.

These are often served from a Content Distribution Network (CDN) like Cloudflare, Amazon CloudFront, Fastly, etc. which are geographically distributed networks optimized (including but not limited to caching) to serve assets to users from a location closest to the user which improves the web performance of your site.

![](https://cdn-images-1.medium.com/max/788/1*nV00aivLPNFBrAuN60Uhog.png)

_This is what Cloudflare’s network looks like — in over 250 cities in 100 countries brings your content closer to your users than ever before_

**Bonus:** As your site is pre-generated, you chose or move from one provider to another without having to worry too much about lock-ins and migration hell 😅. All modern static site generators work on the same principle, i.e., pre-rendering.

### Security and maintenance

When your files are pre-built and hosted on read-only hosts and served through a CDN, there isn’t really a lot for an attacker to do. Jamstack aims to remove or reduce the need to set up or maintain a dedicated server to host your website.

And since this is It is static-first, once your website is generated and deployed on the static host or served through a CDN, you don’t need a dedicated team to keep your website running.

Hosting static files is cheaper than what it would take for dedicated hosting (and still cheaper in most cases as compared to shared hosting — which you should not use for product-level sites anyway).

You and your team can focus on what matters the most — the business and the users.

### Decoupled

> \_decouple (verb): \_separate, disengage, or dissociate (something) from something else.

Everything that you use has a specific and specialized purpose. You can choose to have best-in-class front-end tooling and a tried/tested backend/admin experience (connected via APIs) and so on.

For anything more complex, you can emulate server-like capabilities by leveraging serverless functions which allow you to write and execute more complex processes without the need for a dedicated system or a team to keep it up. Hosting providers like Netlify, Vercel, and many others do it for you. You trigger the function from your static site, and they will do the rest.

## Some use cases

- **Marketing/landing pages:** Your statically generated front-end pushes leads/data to your CRM tool of choice (like HubSpot, Salesforce, etc). With quick development, faster performance, at a fraction of the infrastructure cost for traditional hosting.
- **Marketing teams and content-heavy sites:** You can benefit from giving your Marketing team flexibility to use a tool of their choice. You can use Contentful, Sanity, Strapi, or even a decoupled WordPress — giving your content and marketing team the comfort of using a toolset they trust and enabling your Engineering team to use modern tooling which helps with faster development cycles. Best of both worlds.
- **Serverless for advanced users:** You can even have fully functional web applications which can do almost everything that a server can do — minus the security/infrastructure cost of setting up and maintaining. With cloud functions (which are supported by most modern web hosts), you can run the computation.

### Where are people using this today?

According to the [Jamstack Community Survey 2020–2021](https://jamstack.org/survey/2021/), the top 5 business application of Jamstack has been in the following spaces:

- B2B software
- E-commerce
- Consumer software
- Informational
- Lead capture/landing pages

And the industries that saw these applied the most are (no surprises here):

- Advertising and marketing
- Education
- Finance and financial services
- Media publishing
- Business support and logistics

## Where do I get started

If you are like me, you’d probably have bought into the idea of Jamstack. I mean, why not? Shorter time to market, improved performance, not having to worry about lock-ins, reduced costs to maintain the sites. That all sounds good. But what the heck do I do? where do I start? There are so many options, frameworks, and tools! 🤔

What has worked for us and many of the businesses that we have worked for is to start with a “proof of concept”. You are not really trying to prove the concept of Jamstack; instead, it is to prove (or evaluate) how applicable or valuable is that to your business in real-life.

Take a simplified version of your current problem statement, set up a minimalist version of the workflow, get your business users to try it out, get feedback. You will start to see a difference in the speed at which your team can build things and deploy changes.

From a content/data source perspective, [Markdown](https://www.markdownguide.org/basic-syntax/) is probably the easiest to get started with at this stage. At this point, what you want to see is if this workflow of decoupled, pre-generated, ship and forget architecture is something that will create value for your business. Later on, you can plugin in external headless CMS solutions like Contentful, Strapi, Keystone, Sanity, and more.

You could go for something as simple as Next.js or Gatsby which are among the most widely used static site generators (SSG). If you and your team are not familiar with React or other frameworks (like Vue, which has Gridsome and many more), you can start with 11ty which has a low barrier to entry.

We started with 11ty + Nunjucks / Handlebars + Markdown, with hosting/deployment managed by Netlify a couple of years back. The key is to start simple.

Now, in addition to the above, we frequently use Gatsby, Next.js, Contentful, Strapi, Contentstack, and Netlify hosting (with the options to preview builds before you merge, making it very easy for quality control and much much more; and no, not a sponsored post, just a happy customer).

Just head on over [Jamstack.org](https://jamstack.org/) — look for [site generators](https://jamstack.org/generators/) and [headless CMSs](https://jamstack.org/headless-cms/) and start tinkering. Best of luck with your adventures 🚀.
