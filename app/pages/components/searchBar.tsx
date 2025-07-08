import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputWidth = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<RNTextInput>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    const toValue = isExpanded ? 0 : 200;

    Animated.timing(inputWidth, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);

    if (!isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleChangeText = (text: string) => {
    setSearchTerm(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, { width: inputWidth }]}>
        <TextInput
          ref={inputRef}
          placeholder="Pesquisar..."
          style={styles.input}
          placeholderTextColor="#666"
          value={searchTerm}
          onChangeText={handleChangeText}
        />
      </Animated.View>

      <TouchableOpacity onPress={toggleSearch} style={styles.icon}>
        <Ionicons name="search" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  inputContainer: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    padding: 5,
  },
});

export default SearchBar;
