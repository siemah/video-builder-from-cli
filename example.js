const videoshow = require('videoshow')
const images = [`${__dirname}/assets/bg.jpeg`]

videoshow(images)
  .audio(`${__dirname}/converter.mp3`, {fade:true})
  .save('example-video.avi')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err) {
    console.error('Error:', err)
  })
  .on('end', function (output) {
    console.log('Video created in:', output)
  })
