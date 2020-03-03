// service.js
import TrackPlayer from 'react-native-track-player'

module.exports = async function () {
  await TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())
  await TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())
}
