import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SearchResults({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  // NOME CORRETO
  const Filtros = ["Nearby", "Rating", "Price"];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Search Results</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Filtros')}>
          <MaterialIcons name="tune" size={26} color="#813EFF" />
        </TouchableOpacity>
      </View>

      {/* SORT BY + FILTROS */}
      <View style={styles.sortRow}>
        <Text style={styles.sortBy}>Sort by</Text>

        <View style={styles.FiltrosRow}>
          {Filtros.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                selectedFilter === f && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView style={styles.resultsList}>
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>
            Transporters will appear here...
          </Text>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 50 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },

  /* SORT BY + FILTROS */
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  sortBy: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },

 
  FiltrosRow: {
    flexDirection: "row",
    gap: 10,
  },

  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#813EFF",
  },

  filterButtonActive: {
    backgroundColor: "#813EFF",
  },

  filterText: {
    color: "#813EFF",
    fontWeight: "600",
    fontSize: 13,
  },

  filterTextActive: {
    color: "#fff",
  },

  resultsList: {
    flex: 1,
    marginTop: 10,
  },

  placeholderBox: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
  },

  placeholderText: {
    color: "#777",
    fontSize: 15,
  },
});
