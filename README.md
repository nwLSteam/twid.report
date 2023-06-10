# twid.report

This repository encapsulates the source code for [twid.report](https://twid.report) (formerly twab.report), a site to
check the current "This Week in Destiny" (TWID) article posted by Bungie Inc.

The site is based on React, uses the [Contentstack Delivery SDK](https://www.npmjs.com/package/contentstack) and
the [Bungie.net API](https://bungie-net.github.io/multi/index.html) to request data, and uses SCSS for style. The main
data flow logic can be found in [ContentStackBlock.tsx](/src/components/ContentStackBlock.tsx).
