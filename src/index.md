---
title: Hello World
layout: "base.njk"
---


Hello Jamstack fam!


{% for post in collections.posts %}
- [{{ post.data.title}}]({{post.url}})
{% endfor %}