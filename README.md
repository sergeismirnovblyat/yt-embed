# yt-embed bookmarklet

## How to use

https://sergeismirnovblyat.github.io/yt-embed/

## What it does
Only runs on youtube.com when a video is open. Grabs the video id and loads an embedded YouTube video in an iframe, which is prepended to the page. YouTube embed videos don't play ads. When the embedded video is loaded, the original is muted. Closing the video will restore the state of the original video.

<img width="300px" src="https://user-images.githubusercontent.com/69124074/89132978-fa8a3580-d4cc-11ea-9161-81149f151b92.png"/>

More details are shown when clicking the ⓘ button.

## Build locally
You will need Node and some js bundler like Webpack to compile the bookmark.
1. Clone this repo
2. Install a js bundler
3. Set entry as `./src/index.js` and compile to an output file.
4. Prepend "javascript:" to the output file.
5. Copy output file contents to use as the bookmarklet.
