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
  "97129318",
  "97174655"
]);
```

Create a template for showing your videos. I'm using some custom classes and Font Awesome classes here. You'll need to style it how you want.

```html
<template name="videoList">

  {{#if videos}}
    {{#each videos}}
      <a class="video" href="#" style="background-image: url({{preview}})">
        <button class="play-video-button"><i class="fa fa-play"></i></button>
      </a>
    {{/each}}
  {{/if}}

  {{#with activeVideo}}
    <div class="overlay">
      <button class="close single-icon"><i class="fa fa-times"></i></button>
      <iframe
        src="{{src}}"
        width="500"
        height="281"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen>
      </iframe>
    </div>
  {{/with}}

</template>
```

Finally, add template helpers and events. I'm using a session variable to hold the active video's data.

```javascript
Session.set('activeVideo', null);

Template.videoList.helpers({
  videos: function () {
    return myVideos.getVideos();
  },
  activeVideo: function () {
    return Session.get('activeVideo');
  }
});

Template.videoList.events({
  'click .video': function () {
    Session.set('activeVideo', this);
  }
});
```

Contribute
----------

Please help me develop this package into something useful for the community. I would appreciate PRs for fixes, tests, or missing features. Let's discuss the future.
