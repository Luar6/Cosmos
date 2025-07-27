import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  data: {
    id: string;
    nome_agenda: string;
    chave_de_convite: string;
    firstCreated: string;
  };
};

export default function AgendaItem({ data }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {console.log("Pressed agenda id:", data.id);}}>
        <View style={styles.header}>
          <Ionicons name="book-outline" size={24} color={colors.primary} />
          <Text style={styles.title}>{data.nome_agenda}</Text>
        </View>
        <Text style={styles.subtitle}>Convite: {data.chave_de_convite}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2F',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 5, // Altere isso para reduzir ou aumentar as bordas de cada agenda
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00FFFF22',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subtitle: {
    color: '#AAAAFF',
    fontSize: 14,
    marginTop: 4,
  },
});
