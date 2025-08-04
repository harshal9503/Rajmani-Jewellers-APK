import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '../../constants/Colors';

const ContactScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      >
        <Image
          source={require('../../assets/backarrow.png')}
          style={{ width: 24, height: 24, tintColor: '#000' }}
        />
      </TouchableOpacity>
      {/* Header */}
      <Text style={styles.heading}>Rajmani Jewellers</Text>

      {/* Address */}
      <Text style={styles.address}>
        Jhanda Chowk, Kila Gate, Sarafa Bazar,{'\n'}
        Khargone, Madhya Pradesh{'\n'}
        451001, MP, India
      </Text>

      {/* GSTIN */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>GSTIN:</Text>
        <TextInput
          value="23AVFPS5740P1Z1"
          style={styles.input}
          editable={false}
        />
      </View>

      {/* Contact 1 */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Contact:</Text>
        <View style={{width:"100%"}}>
          <TextInput
            value="+91 91790 97007"
            style={styles.input}
            editable={false}
          />
          <TextInput
            value="+91 97708 72919"
            style={styles.input}
            editable={false}
          />
        </View>
      </View>

      {/* Email */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          value="info@rajmani.com"
          style={styles.input}
          editable={false}
        />
      </View>

      {/* Footer Note */}
      <Text style={styles.footerNote}>
        If you encounter any problems, please feel free to reach out to us.
      </Text>
    </ScrollView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    alignSelf: 'center',
    marginBottom: 23,
  },
  address: {
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  detailContainer: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
  },
  label: {
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
    fontWeight: '600',
    paddingVertical:10,
    paddingHorizontal:20
  },
  input: {
    borderWidth: 1,
    borderColor: '#2d0073',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    fontSize: 14,
    color: '#000',
    width:'60%',
    textAlign: 'left',
  },
  footerNote: {
    fontSize: 14,
    color: '#444',
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing:0.5
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
});
