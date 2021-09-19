var videoshow = require('videoshow')

var images = [
  __dirname + '/assets/bg.jpeg',
];

videoshow(images)
  .audio(`${__dirname}/assets/untitled.wav`)
  .save(`${__dirname}/videos/videoshow-v1-${Date.now()}.mp4`)
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err) {
    console.error('Error:', err)
  })
  .on('progress', function onProgress(progress) {
    if (progress) {
      timemark = progress.timemark;
      console.log(progress.percent + '% - Time mark: ' + timemark + "...");
    }
  })
  .on('end', function (output) {
    console.log('Video created in:', output)
  })
