import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Earnings() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
         onPress={() => navigation.goBack()}

        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Earnings</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Withdraw Box */}
      <View style={styles.withdrawBox}>
        <View style={styles.withdrawTopRow}>
          <View>
            <Text style={styles.withdrawValue}>$0</Text>
            <Text style={styles.withdrawLabel}>
              AVAILABLE FOR WITHDRAWAL
            </Text>
          </View>

          <TouchableOpacity 
          style={styles.withdrawButton}
          onPress={() => navigation.navigate("Withdraw")}
          >

            <View style={styles.withdrawBtnRow}>
              <Feather name="clock" size={14} color="#813EFF" />
              <Text style={styles.withdrawButtonText}> Withdraw</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* SUMMARY BOX */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Summary</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Average Price</Text>
          <Text style={styles.valueBlack}>$0</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Active Deliveries</Text>
          <View style={styles.rightColumn}>
            <Text style={styles.valueBold}>0</Text>
            <Text style={styles.valuePurple}>$0</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Completed Deliveries</Text>
          <View style={styles.rightColumn}>
            <Text style={styles.valueBold}>0</Text>
            <Text style={styles.valuePurple}>$0</Text>
          </View>
        </View>
      </View>

      {/* ===== NOVA CAIXA EARNINGS EDITADA ===== */}
      <View style={styles.earningsBox}>
        
        <Text style={styles.sectionTitle}>Earnings</Text>

        {/* Month */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>In October</Text>
          <Text style={styles.valueBold}>$0</Text>
        </View>

        <View style={styles.divider} />

        {/* Upcoming */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Upcoming Payments</Text>
          <Text style={styles.valueBold}>$0</Text>
        </View>

        <View style={styles.divider} />

        {/* Withdrawn */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Withdrawn to date</Text>
          <Text style={styles.valueBold}>$0</Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 30,
  },

  backButton: { width: 40 },
  backText: { fontSize: 28 },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "black",
  },

  withdrawBox: {
    borderWidth: 1,
    borderColor: "#813EFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },

  withdrawTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  withdrawValue: {
    color: "#813EFF",
    fontSize: 26,
    fontWeight: "700",
  },

  withdrawLabel: {
    color: "#B8A6FF",
    fontSize: 9,
    marginTop: 4,
    fontWeight: "600",
  },

  withdrawButton: {
    backgroundColor: "#EDE7FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  withdrawBtnRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  withdrawButtonText: {
    color: "#813EFF",
    fontWeight: "600",
    fontSize: 12,
  },

  /* SUMMARY */

  summaryBox: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  summaryTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowLabel: {
    fontSize: 14,
    color: "black",
  },

  rightColumn: {
    alignItems: "flex-end",
  },

  valueBlack: {
    fontSize: 14,
    color: "black",
  },

  valueBold: {
    fontWeight: "700",
    fontSize: 14,
  },

  valuePurple: {
    color: "#813EFF",
    fontWeight: "600",
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 15,
  },

  /* NOVA CAIXA EARNINGS */

  earningsBox: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 15,
    fontSize: 16,
  },
});
