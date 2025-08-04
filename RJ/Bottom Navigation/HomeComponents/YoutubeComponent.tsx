import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {WebView} from 'react-native-webview';

const {width} = Dimensions.get('window');
const VIDEO_WIDTH = 377.76;
const VIDEO_HEIGHT = 183.01;

const YoutubeComponent = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
          .container {
            width: ${VIDEO_WIDTH}px;
            height: ${VIDEO_HEIGHT}px;
            border-radius: 12px;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <iframe
            src="https://www.youtube.com/embed/NpNgO1jndEY?autoplay=1&mute=1&controls=1"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
        </div>
      </body>
    </html>
  `;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{html: htmlContent}}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          style={styles.webview}
          scrollEnabled={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  webview: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default YoutubeComponent;
