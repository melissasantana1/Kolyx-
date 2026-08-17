import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// 🔹 Simulação de dados de conversas
const chats = [
  {
    id: "1",
    name: "Lucas Almeida",
    message: "Beleza, nos falamos mais tarde!",
    time: new Date(), // hoje
    unread: 2,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Mariana Costa",
    message: "Ok, combinamos amanhã então 😊",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000), // ontem
    unread: 0,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Rafael Souza",
    message: "Te mandei o documento por e-mail.",
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
    unread: 4,
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

// 🔹 Função para formatar data (Hoje / Ontem / Data)
function formatDate(date) {
  const now = new Date();
  const diffDays = Math.floor(
    (now - date) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-GB"); // formato dd/mm/yyyy
}

export default function InboxT() {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      activeOpacity={0.8}
      onPress={() => console.log("Abrir conversa de", item.name)}
    >
      {/* Foto de perfil */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      {/* Informações da conversa */}
      <View style={styles.chatInfo}>
        <View style={styles.chatTop}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{formatDate(item.time)}</Text>
        </View>
        <View style={styles.chatBottom}>
          <Text
            style={styles.chatMessage}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.message}
          </Text>

          {/* 🔹 Notificação (badge) */}
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity onPress={() => console.log("Buscar conversa")}>
          <Ionicons name="search" size={24} color="#000" style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>

      {/* ---------- Lista de conversas ---------- */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ---------- Estilos ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
   
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    flex: 1,
    marginTop: 5,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  chatTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  chatTime: {
    fontSize: 13,
    color: "#777",
  },
  chatBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatMessage: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    marginRight: 10,
  },
  badge: {
    backgroundColor: "#813EFF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});
