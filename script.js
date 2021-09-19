var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');
var videoshow = require('videoshow')

let _timemark;
const _vo = {
  videoCodec: 'libx264',
  fps: 25,
  videoBitrate: 1024,
  videoCodec: 'libx264',
  audioBitrate: '128k',
  format: 'mp4',
  pixelFormat: 'yuv420p'
};
(async () => {
  console.log('convert wav to mp3')
  const _time = Date.now();
  const audioPath = `converter-${_time}.mp3`;
  const imagePath = __dirname + '/assets/bg.jpeg';
  const videoPath = `${__dirname}/videoshow-v1-${_time}.mp4`;

  try {
    await wav2mp3(`${__dirname}/assets/untitled.wav`, audioPath);
    console.log('create video')
    const res = await createVideo(imagePath, audioPath, videoPath);
    console.log('output:', res)
  } catch (error) {
    console.log(error);
  }
})()
// todo: upload created video 2youtube


function wav2mp3(sourcePath, distinationPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(sourcePath)
      .inputFormat('wav')
      .audioBitrate(192)
      .format('mp3')
      .save(distinationPath)
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
}

function createVideo(imagePath, audioPath, videoPath) {
  return new Promise((resolve, reject) => {
    var images = [imagePath];

    videoshow(images,_vo)
      .audio(audioPath)
      .save(videoPath)
      .on('start', function (command) {
        console.log('ffmpeg process started:', command)
      })
      .on('error', function (err) {
        console.error('Error:', err)
        reject(err);
      })
      .on('progress', function onProgress(progress) {
        if (progress.timemark != _timemark) {
          _timemark = progress.timemark;
          console.log('Time mark: ' + _timemark + "...");
        }
      })
      .on('end', function (output) {
        console.log('Video created in:', output)
        resolve(output)
      })
  });
}
