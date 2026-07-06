import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { schedule } from "../data/schedule";

import { ThemeContext } from "../context/ThemeContext";

export default function ScheduleScreen() {
  const { theme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  // Statistik Dinamis
  const totalHari = schedule.length;

  const totalJadwal = schedule.reduce(
    (total, section) => total + section.data.length,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>📅 Jadwal Mingguan</Text>

        <Text style={styles.headerSubtitle}>
          Semester 6 • Teknik Informatika
        </Text>
      </View>

      {/* ================= DASHBOARD ================= */}

      <View style={styles.dashboard}>
        <View style={styles.box}>
          <MaterialIcons
            name="calendar-month"
            size={32}
            color={theme.primary}
          />

          <Text style={styles.boxNumber}>{totalHari}</Text>

          <Text style={styles.boxLabel}>Hari Kuliah</Text>
        </View>

        <View style={styles.box}>
          <FontAwesome5 name="book-open" size={28} color="#2563EB" />

          <Text style={styles.boxNumber}>{totalJadwal}</Text>

          <Text style={styles.boxLabel}>Total Jadwal</Text>
        </View>
      </View>

      {/* ================= LIST ================= */}

      <SectionList
        sections={schedule}
        keyExtractor={(item, index) => item.matkul + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={22} color="white" />

            <Text style={styles.sectionTitle}>
              {section.title.toUpperCase()}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.85} style={styles.card}>
            <View style={styles.topRow}>
              <MaterialIcons name="menu-book" size={25} color="#2563EB" />

              <Text style={styles.course}>{item.matkul}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>Kuliah</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Ionicons name="location" size={20} color="#2563EB" />

              <Text style={styles.info}>{item.ruangan}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="time" size={20} color="#2563EB" />

              <Text style={styles.info}>{item.jam}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/")}
          >
            <MaterialIcons name="home" size={22} color="white" />

            <Text style={styles.buttonText}>Kembali ke Dashboard</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    /* ================= HEADER ================= */

    header: {
      backgroundColor: theme.header,
      paddingTop: 55,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 6,
    },

    headerTitle: {
      color: "#FFFFFF",
      fontSize: 28,
      fontWeight: "bold",
    },

    headerSubtitle: {
      color: "#E5E7EB",
      fontSize: 16,
      marginTop: 5,
    },

    /* ================= DASHBOARD ================= */

    dashboard: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginTop: -25,
      marginBottom: 15,
    },

    box: {
      width: "48%",
      backgroundColor: theme.card,
      borderRadius: 18,
      alignItems: "center",
      paddingVertical: 18,

      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 5,
    },

    boxNumber: {
      marginTop: 8,
      fontSize: 26,
      fontWeight: "bold",
      color: theme.primary,
    },

    boxLabel: {
      marginTop: 5,
      color: theme.subText,
      fontSize: 14,
    },

    /* ================= SECTION ================= */

    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.primary,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 15,
      marginTop: 15,
    },

    sectionTitle: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 17,
      marginLeft: 10,
    },

    /* ================= CARD ================= */

    card: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 18,

      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 4,
    },

    topRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    course: {
      flex: 1,
      marginLeft: 12,
      fontSize: 17,
      fontWeight: "bold",
      color: theme.text,
    },

    badge: {
      backgroundColor: theme.background,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },

    badgeText: {
      color: theme.primary,
      fontWeight: "bold",
      fontSize: 12,
    },

    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginVertical: 14,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },

    info: {
      marginLeft: 10,
      color: theme.text,
      fontSize: 15,
    },

    /* ================= BUTTON ================= */

    button: {
      backgroundColor: theme.primary,
      marginTop: 25,
      borderRadius: 15,
      paddingVertical: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",

      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 5,
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 8,
    },
  });
