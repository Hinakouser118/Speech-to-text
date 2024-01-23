import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

export default function TexttoSpeech() {
  const [name, setName] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English
  const [selectedVoice, setSelectedVoice] = useState(null);

  const listVoicesForLanguage = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    const filteredVoices = availableVoices.filter(voice => voice.language.includes(selectedLanguage));
    setVoices(filteredVoices);
  }

  useEffect(() => {
    listVoicesForLanguage();
  }, [selectedLanguage]);

  const speakGreeting = () => {
    const greeting = `${name}`;
    const options = {
      language: selectedVoice.language,
      voice: selectedVoice.identifier,
    };
    Speech.speak(greeting, options);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Greeting App</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Your Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Type your name..."
        />
      </View>

      <View style={styles.languageButtons}>
        <Text style={styles.label}>Select Language:</Text>
        <TouchableOpacity onPress={() => setSelectedLanguage("en")}>
          <Text style={selectedLanguage === "en" ? styles.selectedLanguage : styles.language}>English</Text>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => setSelectedLanguage("hi")}>
          <Text style={selectedLanguage === "hi" ? styles.selectedLanguage : styles.language}>Hindi</Text>
        </TouchableOpacity>
        {/* Add more languages as needed */}
      </View>

      <ScrollView style={styles.voiceList}>
        {voices.map(voice => (
          <TouchableOpacity
            key={voice.identifier}
            style={selectedVoice === voice ? styles.selectedVoiceButton : styles.voiceButton}
            onPress={() => setSelectedVoice(voice)}
          >
            <Text style={styles.voiceButtonText}>{voice.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: selectedVoice ? '#4CAF50' : '#ccc' }]}
        onPress={speakGreeting}
        disabled={!selectedVoice}
      >
        <Text style={styles.buttonText}>Speak Greeting</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,

  },
  language: {
    fontSize: 16,
    paddingVertical: 8,
    bottom:10
  },
  selectedLanguage: {
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
    marginHorizontal: 20,
    bottom:10
  },

  voiceList: {
    maxHeight: 120,
    marginBottom: 16,
  },
  voiceButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedVoiceButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    
  },
  voiceButtonText: {
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
