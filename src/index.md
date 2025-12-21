---
title: Abhinav Thota
layout: "home.njk"
scripts:
  - src: "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"
  - src: "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"
  - src: "/lazyloadGif.js"
  - src: "/countryCardsAnimation.js"
hero:
  title: Hello 👋
  description: > 
    I'm Abhinav Thota, a software engineer. I want to build great things
    and share what I learn along the way. 
  passions: 
    title: >
      Currently I am:
    items:
      - name: strengthening my skills in Java and TypeScript
      - name: studying for AWS Solutions Architect Cert
      - name: diving deep into RESTful API design & event driven architectures
projects:
  title: Featured Projects
  items:
    - name: Resume Editor
      description: A live and dynamic resume builder application. Auto-saves any changes to a PostgresDB. Supports PDF export. Built primarily using Django REST Framework and React/Next.js.
      lazyLoadImg: "/assets/ResumeBuilder.gif"
    - name: >
        Blur: Final Year Capstone Project
      description: A recording and submission platform that supports facial blurring for anonymity. Built using AWS services (DynamoDB, S3, Lambda, Amplify), OpenCV library and React.
      lazyLoadImg: "/assets/CAPSTONE_BLUR.gif"

countries:
  title: My journey so far
  items:
    - context: I was born in...
      image: "/assets/1-country-map.png"
      places:
        - name: 🇮🇳 Hyderabad, India
    - context: I grew up in...
      image: "/assets/2-country-map.png"
      places:
        - name: 🇸🇬 Singapore
        - name: 🇧🇳 Brunei
    - context: I studied Computer Science in...
      image: "/assets/3-country-map.png"
      places:
        - name: 🇨🇦 Canada
    - context: and I now live in...
      image: "/assets/4-country-map.png"
      places:
        - name: 🇬🇧 United Kingdom
showRecentPosts: true
---