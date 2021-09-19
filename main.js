const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const createVideo = require('./video');

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


(async function () {
  const imagePath = `${__dirname}/assets/bg.jpeg`;
  const sourceAudio = `${__dirname}/assets/untitled.wav`;
  const audioPath = `${__dirname}/converter.mp3`
  const videoPath = `${__dirname}/output.mp4`
  try {
    await wav2mp3(sourceAudio, audioPath);
    console.log('video created')
    const res = await createVideo(imagePath, audioPath, videoPath);
    console.log('[result from video creation]');
    console.log(res)
  } catch (error) {
    console.log(error)
  }
})();
