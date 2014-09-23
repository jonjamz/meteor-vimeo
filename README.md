About
-----

__This Meteor smart package provides you with a reactive loader for public* Vimeo videos.__

Specify an array of video IDs you want to get, and when they're all returned from the Vimeo API, your template will automatically update with the data. Just use the `getVideos()` method. See example below.

_* I would love to support public and private videos. Please contribute if possible!_

How to use
----------

First, install the package from Atmosphere.

`meteor add mrt:vimeo`

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
      <p>{{{summary}}}</p>
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

The following attributes are available in the returned video helper:

  ```
  {{preview}} - Thumbnail preview of the video
  {{src}} - Vimeo URL to the video
  {{summary}} - The video's "Description" field on Vimeo
  {{title}} - The video's title
  ```

Callbacks
----------
You can also specify a callback function to run once the Vimeo data has loaded. For example, you may want to load your video data in a route and set a session variable before it is rendered.

```javascript
this.route('videos', {
        path: '/videos',
        onBeforeAction: function(pause) {
            // Set up videos
            myVideos = new Vimeo([
                "105564454",
                "105564698"
            ], function(){
                Session.set('activeVideo', myVideos.getVideos()[0]);
            });
        }
    });
});
```


Contribute
----------

Please help me develop this package into something useful for the community. I would appreciate PRs for fixes, tests, or missing features. Let's discuss the future.
