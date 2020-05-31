# VS Code Video

## Status

This extension can not work because VS Code does not ship FFMPEG:

- https://github.com/microsoft/vscode/issues/54097
- https://github.com/microsoft/vscode/issues/66050
- https://github.com/microsoft/vscode/issues/82012

## Running

Use VS Code Insiders! Press F5 to start debugging the extension.

## Resources

https://code.visualstudio.com/api/extension-guides/custom-editors

https://github.com/microsoft/vscode-extension-samples/tree/master/custom-editor-sample

## To-Do

### Attempt launching VLC/FFMPEG and streaming an MJPEG stream into the webview

This way the media server would be VLC/FFMPEG outside of VS Code but the render
surface would still be the webview.

I played around with this somewhat in
https://github.com/TomasHubelbauer/net-http-listener-mjpeg-stream
.

### Attempt to use Puppeteer / Chromium with codecs and screencast it to webview

Puppeteer has the screencast API, local Chrome if any could be used, or Chromium
with codecs could be used:
https://www.npmjs.com/package/chrome-or-chromium-all-codecs-bin
