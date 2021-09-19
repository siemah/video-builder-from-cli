const fs = require('fs')
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
var command = ffmpeg();
var timemark = null;
const image = "bg.jpeg";
const audio = "untitled.wav";

// ffmpeg.getAvailableEncoders(function (err, encoders) {
//   console.log('Available formats:');
//   fs.writeFile('./encoders.json', JSON.stringify(encoders), (err) => {
//     console.log(err)
//   })
// });

// v1
command
  .input(image)
  .inputFPS(1 / 6)
  .input(audio)
  .audioBitrate('384k')
  // .audioCodec('ac3')
  // .outputFPS(24)
  // .videoCodec('mpeg4')
  .output('output-1920x1080.mp4')
  // .videoBitrate('10000k')
  // .aspect('16:9')
  .on('end', onEnd)
  .on('progress', onProgress)
  .on('error', onError)
  .run();

function onProgress(progress) {
  if (progress.timemark != timemark) {
    timemark = progress.timemark;
    console.log('Time mark: ' + timemark + "...");
  }
}

function onError(err, stdout, stderr) {
  console.log('Cannot process video: ' + err.message);
  console.log(err)
}

function onEnd() {
  console.log('Finished processing');
}