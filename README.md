About
-----

__This Meteor smart package provides you with a reactive loader for public* Vimeo videos.__

Specify an array of video IDs you want to get, and when they're all returned from the Vimeo API, your template will automatically update with the data. Just use the `getVideos()` method. See example below.

_* I would love to support public and private videos. Please contribute if possible!_

How to use
----------

First, install the package from Atmosphere.

`mrt add vimeo`

Then, somewhere, specify the videos to load.

```javascript
// Set up videos
var myVideos = new Vimeo([
  "93517849",
  "93525318",
  "93525316",
  "93519766",
  "93519764",
  "93517850",
  "93517845",
  "93517848"
]);
```

Create a template for showing your videos. We're using some custom classes and Font Awesome classes here.

```html
<template name="videoList">

  {{#if videos}}
    {{#each videos}}
      <a class="video" href="#" style="background-image: url({{preview}})">
        <button class="play-video-button"><i class="fa fa-play"></i></button>
      </a>
    {{/each}}
  {{/if}}

</template>
```

Finally, get the data in a template helper.

```javascript
Template.videoList.helpers({
  videos: function () {
    return myVideos.getVideos();
  }
});
```

Contribute
----------

Please help me develop this package into something useful for the community. I would appreciate PRs for fixes, tests, or missing features. Let's discuss the future.
