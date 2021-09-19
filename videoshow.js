var videoshow = require('videoshow')

var images = [
  __dirname + '/bg.jpeg',
];

videoshow(images)
  .save('videoshow-v1.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err) {
    console.error('Error:', err)
  })
  .on('end', function (output) {
    console.log('Video created in:', output)
  })