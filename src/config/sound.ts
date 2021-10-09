import Sound from 'react-native-sound';
Sound.setCategory('Playback');

let sound: Sound;

const initPlayer = (filepath: string) => {
  return new Promise((resolve, reject) => {
    sound = new Sound(filepath, '', (error) => {
      if (error) {
        console.log('创建播放器失败', error);
        reject(error);
      } else {
        console.log('创建播放器成功', sound);
        resolve();
      }
    });
  });
};

const play = () => {
  return new Promise((resolve, reject) => {
    if (sound) {
      sound.play((success) => {
        if (success) {
          resolve();
        } else {
          console.log('播放失败');
          reject();
        }
      });
    } else {
      reject();
    }
  });
};
const pause = () => {
  return new Promise((resolve) => {
    if (sound) {
      sound.pause(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

const stop = () => {
  return new Promise((resolve) => {
    if (sound) {
      sound.stop(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

const getCurrentTime = () => {
  return new Promise((resolve) => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};

const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  } else {
    return 0;
  }
};

export { initPlayer, play, pause, getCurrentTime, getDuration, stop };
