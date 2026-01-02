---
title: Just starting? Host your personal site on AWS
comments: true
slug: test-post
scripts:
  - src: "/commentSection.js"
    type: "module"
---
AWS, or more generally, knowledge in the cloud is one of the most sought after skills at the moment (as of 2026). I know because I see it in the skill requirement list for almost every SWE/Web Dev job I apply to.

Yet, it is one of the most complex and overwhelming experiences when you are just starting out. And it is so hard to show and demonstrate to people that you know what you are doing. (Because frankly, I had no clue even after watching hours of content)

Beyond just being able to spit out some acronyms, or show a certification, how do you prove to people that you **ACTUALLY** know AWS? 

When I started building my website, I was also watching theoretical AWS videos and wondered, "Wait a minute, why can't I just use AWS to host my site?". This simple thought ended up becoming a great learning experience that really solidified a lot of concepts I learnt by watching lectures. 

This post's main objective is to show you not only the process but to serve as a loose/rough guide on how you can do the same and what you will learn from it.

### The Tech Stack Decision You'll Actually Have to Make

Before diving deep into AWS, let's talk about personal websites. One of the main questions you have to ask yourself is the tech stack you want to use, and there are many ways to decide this.

While frameworks like React/Next.js are really popular and HIGHLY in-demand, they are far better suited for Dynamic Content - although I believe there are advances by using server side rendering. While it is the industry standard, and I still believe knowing these frameworks is crucial, for the scope of this project, I would almost not reccomend it. 

React really shines for Single Page Applications (SPAs) that give an "app-like" feel (no reload/refresh needed to navigate). However, SPAs come at the cost of you needing to configure navigation and also making the user load up a gigantic single file. React depends on a lot of NPM packages, and this will ultimately need you to use bundlers to package everything up into a file that takes your browser a long time to load.

In short, it's a lot of added complexity on already complex project. Writing your own raw HTML, CSS and JS files, or even using a Static Site Generator, would be my recommendation however the choice is really up to you.


## Discovering Static Site Generators

[What JSX actually costs you - bundle size, load times]
[Finding 11ty (or another SSG)]
[How templating languages like Nunjucks give you JSX benefits without the cost]
[Alpine.js for the little interactivity you need]
[What you'll learn: how the web actually works, what browsers need vs what devs want]

## Understanding CDNs and Why They Matter

[What a CDN actually does - explain like they're new to this]
[Why static files + CDN = perfect match]
[How this makes your site faster globally]
[What you'll learn: content delivery, edge computing basics]

## The AWS Setup: S3 + CloudFront

[What S3 buckets are - object storage, not a database]
[How CloudFront sits in front of S3]
[The flow: HTTP request → CloudFront → S3 bucket → files]
[What you'll learn: cloud storage, CDN integration, basic AWS architecture]

## Automating Deployment with GitHub Actions

[The manual way vs the automated way]
[Setting up GitHub Actions workflow]
[Configuring secrets in GitHub]
[Writing IAM policies to authorize GitHub → AWS]
[What you'll learn: CI/CD pipelines, AWS security, automation]

## Why This Was Worth It

[What you understand now that you didn't before]
[Cost comparison: AWS vs Vercel]
[Speed improvements]
[The confidence of understanding your infrastructure]

## Your Turn: How to Start

**What you'll need:**
- [List requirements]

**The weekend plan:**
1. Day 1: [Setup steps]
2. Day 2: [Deployment steps]

**Resources that helped me:**
- [Link to 11ty docs]
- [Link to AWS guides you used]
- [Any other helpful resources]

[Final encouragement: it's easier than you think, and you'll learn more than any tutorial]