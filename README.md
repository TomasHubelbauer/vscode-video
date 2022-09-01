# VS Code Video
![](https://github.com/tomashubelbauer/vscode-video/workflows/.github/workflows/main.yml/badge.svg)

**Important:** This might not actually be possible because VS Code started 
shipping with an FFmpeg library support for several video codecs:
https://code.visualstudio.com/updates/v1_71#_ffmpeg-codecs-support

Previews video files in VS Code using the custom editor API.

## Installation

Install from source because the extension uses proposed APIs and so it cannot
be published to the VS Code extension marketplace.

## Prerequisites

The user has to have Google Chrome installed for this extension to work.

## Limitations

VS Code uses Chromium which does not bundle media codecs with it, thus the webview
cannot be used to play the media directly.

https://github.com/microsoft/vscode/issues/54097

This extension uses Puppeteer Core and local installation of Chrome (if any) to
play the video in Chrome and controls the headless Chrome instance so that the
video frames are transferred over to the webview.

## Running

Use VS Code Insiders! Press F5 to start debugging the extension.

## Resources

https://code.visualstudio.com/api/extension-guides/custom-editors

https://github.com/microsoft/vscode-extension-samples/tree/master/custom-editor-sample

## To-Do

### Try using the screencast API for a better performance (but what about quality?)

### Add playback controls which use `vscode.postMessage` to the editor provider

### Turn the `progress` element into a scrubbar which also uses `postMessage`

### Load the JS and the CSS from bundled extension resources like example shows

https://github.com/microsoft/vscode-extension-samples/tree/master/custom-editor-sample

### Figure out how to make the video have its native dimensions in Puppeteer

Perhaps I need to open a `data:text/html` page with the video or maybe event a
temporary local file (in case the data URL cannot play the video) so that user
agent styles are not forcing the video to fit the viewport or whatever they are
doing right now.

### Handle the user not having Chrome installed using an error message

### See if it would be possible to use the `Uint8Array` for better perf

Maybe I could use a `canvas` instead of the image element and blit the image
data to it.

### See if a custom MediaSource could be devised for `video` element to be used

This would simplify the HTML and we could use native controls but probably
would be very complex if not impossible due to having to handle the container.

### Fall back to Microsoft Edge in case Chrome and Chromium are not installed

Use Playwright or see if Puppeteer Core still works as it is all CDP in the end.

### Consider adding audio support (mainly in the UI, Chrome plays the audio)

### Publish the extension once the proposed custom editor API hits stable

### Install Chrome or Chromium in the GitHub Actions workflow to make it go
