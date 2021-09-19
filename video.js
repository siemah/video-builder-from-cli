const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

let timemark;
function onProgress(progress) {
  if (progress.timemark !== timemark) {
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

module.exports = function createVideo(imagePath, audioPath, videoPath) {
  const command = ffmpeg();

  return new Promise(function (resolve, reject) {
    command
      .input(imagePath)
      // .inputFPS(1 / 6)
      .input(audioPath)
      .audioCodec('aac')
      .audioBitrate('128k')
      .outputFPS(25)
      .videoCodec('mpeg4')
      // .videoBitrate('10000k')
      .aspect('16:9')
      .output(videoPath)
      .on('end', resolve)
      .on('progress', onProgress)
      .on('error', reject)
      .run();
  });
};
