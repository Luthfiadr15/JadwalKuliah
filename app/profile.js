import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import { courses } from "../data/courses";
import { meetings } from "../data/meetings";
import { schedule } from "../data/schedule";

export default function ProfileScreen() {
  const { theme, darkMode, toggleTheme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  const totalSKS = courses.reduce((total, item) => total + item.sks, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <View style={styles.avatar}>
            <MaterialIcons name="account-circle" size={90} color="white" />
          </View>

          <Text style={styles.name}>Muhammad Luthfi Adrian</Text>

          <Text style={styles.nim}>NIM : 233510570</Text>

          <Text style={styles.major}>Teknik Informatika • Semester 6</Text>
        </View>

        {/* ================= DASHBOARD ================= */}

        <View style={styles.dashboard}>
          <View style={styles.box}>
            <MaterialIcons name="menu-book" size={28} color={theme.primary} />

            <Text style={styles.number}>{courses.length}</Text>

            <Text style={styles.label}>Mata Kuliah</Text>
          </View>

          <View style={styles.box}>
            <MaterialIcons name="school" size={28} color={theme.primary} />

            <Text style={styles.number}>{totalSKS}</Text>

            <Text style={styles.label}>Total SKS</Text>
          </View>

          <View style={styles.box}>
            <FontAwesome5 name="calendar-alt" size={24} color={theme.primary} />

            <Text style={styles.number}>{meetings.length}</Text>

            <Text style={styles.label}>Pertemuan</Text>
          </View>
        </View>

        {/* ================= INFORMASI MAHASASISWA ================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informasi Mahasiswa</Text>

          <View style={styles.row}>
            <Ionicons name="person" size={22} color={theme.primary} />

            <Text style={styles.info}>Muhammad Luthfi Adrian</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="id-card" size={22} color={theme.primary} />

            <Text style={styles.info}>233510570</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="school" size={22} color={theme.primary} />

            <Text style={styles.info}>Teknik Informatika</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="calendar" size={22} color={theme.primary} />

            <Text style={styles.info}>Semester 6</Text>
          </View>
        </View>

        {/* ================= PENGATURAN ================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pengaturan</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <Ionicons
                name={darkMode ? "moon" : "sunny"}
                size={22}
                color={theme.primary}
              />

              <Text style={styles.settingText}>Dark Mode</Text>
            </View>

            <Switch value={darkMode} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* ================= TENTANG APLIKASI ================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tentang Aplikasi</Text>

          <View style={styles.row}>
            <MaterialIcons name="apps" size={22} color={theme.primary} />

            <Text style={styles.info}>
              Nama Aplikasi : Jadwal Kuliah Mobile
            </Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="verified" size={22} color={theme.primary} />

            <Text style={styles.info}>Versi : 1.0.0</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons
              name="developer-mode"
              size={22}
              color={theme.primary}
            />

            <Text style={styles.info}>
              Framework : React Native + Expo Router
            </Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="code" size={22} color={theme.primary} />

            <Text style={styles.info}>Bahasa : JavaScript</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="storage" size={22} color={theme.primary} />

            <Text style={styles.info}>Penyimpanan : Local JSON</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="person" size={22} color={theme.primary} />

            <Text style={styles.info}>Developer : Muhammad Luthfi Adrian</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="today" size={22} color={theme.primary} />

            <Text style={styles.info}>Hari Aktif : {schedule.length}</Text>
          </View>
        </View>

        {/* ================= BUTTON ================= */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
        >
          <MaterialIcons name="home" size={24} color="white" />

          <Text style={styles.buttonText}>Kembali ke Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
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
      paddingBottom: 35,
      alignItems: "center",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,

      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 6,
    },

    avatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    name: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 15,
    },

    nim: {
      color: "#DBEAFE",
      marginTop: 5,
      fontSize: 16,
    },

    major: {
      color: "#DBEAFE",
      marginTop: 5,
      fontSize: 15,
    },

    /* ================= DASHBOARD ================= */

    dashboard: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 18,
      marginTop: -25,
      marginBottom: 18,
    },

    box: {
      width: "31%",
      backgroundColor: theme.card,
      borderRadius: 18,
      alignItems: "center",
      paddingVertical: 18,

      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 5,
    },

    number: {
      marginTop: 8,
      fontSize: 24,
      fontWeight: "bold",
      color: theme.primary,
    },

    label: {
      marginTop: 5,
      color: theme.subText,
      fontSize: 12,
      textAlign: "center",
    },

    /* ================= CARD ================= */

    card: {
      backgroundColor: theme.card,
      marginHorizontal: 18,
      marginBottom: 18,
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

    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 15,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },

    info: {
      marginLeft: 12,
      fontSize: 15,
      color: theme.text,
      flex: 1,
    },

    /* ================= BUTTON ================= */

    button: {
      backgroundColor: theme.primary,
      marginHorizontal: 18,
      marginTop: 10,
      marginBottom: 40,
      borderRadius: 18,
      paddingVertical: 16,

      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 6,
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 10,
    },

    /* ================= SETTING ================= */

    settingCard: {
      backgroundColor: theme.background,
      borderRadius: 15,
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,

      borderWidth: 1,
      borderColor: theme.border,
    },

    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    settingText: {
      marginLeft: 12,
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
    },
  });
