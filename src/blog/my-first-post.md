---
title: Custom Built Comment Section using AWS!
comments: true
slug: test-post
scripts:
  - src: "/commentSection.js"
    type: "module"
---

I built a custom comment section for this site using AWS services. It needs Authentication to prevent malicious actors.
The primary AWS Services used are: API Gateway, Cognito and DynamoDB.

**The general flow:** 
- You sign in with Google — no account creation needed
- Google sends back a JSON Web Token (JWT), which AWS Cognito exchanges for access tokens
- Those tokens let you post and delete comments through API Gateway
- Comments are stored in DynamoDB — I only have access to your name, email, and comment data

Try it out below and let me know what you think!

**Side Note:** This was mostly done as a way to learn; I will probably move to a external comment provider like Disqus if I start taking blog writing more seriously.