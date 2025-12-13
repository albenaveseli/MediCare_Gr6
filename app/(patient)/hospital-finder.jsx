import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';

export default function HospitalFinder() {
  const [userLocation, setUserLocation] = useState(null);
  const [webError, setWebError] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc.coords);
    })();
  }, []);

  if (!userLocation) {
    return (
      <View style={styles.center}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  const { latitude, longitude } = userLocation;
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

 // 👉 Fallback për WEB (WebView nuk përkrahet fare në web)
if (Platform.OS === 'web') {
  return (
    <View style={styles.wrapper}>
      <Header title="Map" />

      <View style={styles.center}>
        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackTitle}>
            Harta nuk është e disponueshme
          </Text>

          <Text style={styles.fallbackText}>
            Në versionin web të aplikacionit, harta nuk mund të shfaqet.
          </Text>

          <Pressable
            style={styles.fallbackButton}
            onPress={() => Linking.openURL(googleMapsLink)}
          >
            <Text style={styles.fallbackButtonText}>
              Hap në Google Maps
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}



  return (
    <View style={styles.wrapper}>
      <Header title="Hospital Finder" />

      <WebView
        style={styles.map}
        originWhitelist={['*']}
        onError={() => setWebError(true)}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                  }
                  iframe {
                    border: 0;
                    width: 100%;
                    height: 100%;
                  }
                </style>
              </head>
              <body>
                <iframe
                  loading="lazy"
                  allowfullscreen
                  src="https://www.google.com/maps?q=${latitude},${longitude}&output=embed">
                </iframe>
              </body>
            </html>
          `,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 1, // 🔥 harta e merr krejt lartësinë
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  link: {
    color: '#1e90ff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  fallbackCard: {
  width: '100%',
  maxWidth: 420,
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 4,
},

fallbackTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 8,
  textAlign: 'center',
},

fallbackText: {
  fontSize: 14,
  color: '#555',
  textAlign: 'center',
  marginBottom: 16,
},

fallbackButton: {
  backgroundColor: '#0096a7ff',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},

fallbackButtonText: {
  color: '#fff',
  fontSize: 15,
  fontWeight: '500',
},

});
