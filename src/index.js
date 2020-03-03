import React, { useEffect, useState } from 'react'
import './config/ReactotronConfig'
import {
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Button
} from 'react-native'
import TrackPlayer from 'react-native-track-player'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
// import '../service'

const App = () => {
  console.log(console.tron)
  const [player, setPlayer] = useState({})
  const [icon, setIcon] = useState('play-circle')

  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())

  useEffect(() => {
    TrackPlayer.setupPlayer().then(async () => {
      TrackPlayer.updateOptions({
        // One of RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE
        ratingType: TrackPlayer.RATING_5_STARS,

        // Whether the player should stop running when the app is closed on Android
        stopWithApp: false,

        // An array of media controls capabilities
        // Can contain CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SEEK_TO,
        // CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_SET_RATING
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
          /*         TrackPlayer.CAPABILITY_STOP */
        ],

        // An array of capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
        ] /* ,

      // Icons for the notification on Android (if you don't like the default ones)
      playIcon: require('./play-icon.png'),
      pauseIcon: require('./pause-icon.png'),
      stopIcon: require('./stop-icon.png'),
      previousIcon: require('./previous-icon.png'),
      nextIcon: require('./next-icon.png'),
      icon: require('./notification-icon.png') // The notification icon */
      })
      // Adds a track to the queue
      TrackPlayer.add({
        id: 'trackId',
        url:
          'https://www12.senado.leg.br/radio/@@audio/31f96459-2f78-41a3-b52e-b1b72a7886d0?download',
        /* require('./assets/file_example_MP3_700KB.mp3') */ title:
          'Rádio Senado',
        artist: 'Notícias'
      }).then(() => {
        setPlayer(TrackPlayer)
      })
    })
  }, [])

  async function handlePlay () {
    if (player) {
      console.log('ok', player)
      const playing = await player.getState()
      console.log('here', playing)
      if (playing === 3) {
        console.log('here', player)
        player.pause()
        setIcon('play-circle')
      } else {
        player.play()
        setIcon('pause-circle')
      }
    }
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Radio Senado Player</Text>

          <TouchableOpacity onPress={handlePlay} style={styles.playButton}>
            <FontAwesome5Icon
              name={icon}
              size={150}
              color='#3d425c'
              style={styles.playButton}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'flex-start',

    alignItems: 'stretch',

    backgroundColor: '#f5fcff'
  },

  headerTitle: {
    fontSize: 20,

    paddingVertical: 25,

    textAlign: 'center',

    color: 'white',

    backgroundColor: '#0d305c'
  },

  playButton: {
    borderRadius: 50,

    marginTop: 25,

    borderColor: 'rgba(93 ,63 ,106 , 0.2)',

    alignItems: 'center'
  }
})

export default App
