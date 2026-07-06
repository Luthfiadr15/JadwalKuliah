import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useMemo, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { courses } from "../data/courses";

const totalMatkul = courses.length;
const totalSKS = courses.reduce((total, item) => total + item.sks, 0);
const totalDosen = new Set(courses.map((item) => item.dosen)).size;

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.kode.toLowerCase().includes(search.toLowerCase()) ||
        item.dosen.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  // JSX tetap seperti yang sudah Anda miliki

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcome}>👋 Selamat Datang, Luthfi</Text>

            <Text style={styles.title}>Jadwal Kuliah</Text>

            <Text style={styles.subtitle}>Semester 6 • Teknik Informatika</Text>
          </View>

          <TouchableOpacity
            style={styles.profile}
            activeOpacity={0.8}
            onPress={() => router.push("/profile")}
          >
            <Ionicons name="person" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= DASHBOARD ================= */}

      <View style={styles.dashboard}>
        <View style={styles.statCard}>
          <MaterialIcons name="menu-book" size={30} color="#2563EB" />

          <Text style={styles.statNumber}>{totalMatkul}</Text>

          <Text style={styles.statText}>Mata Kuliah</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialIcons name="school" size={30} color="#2563EB" />

          <Text style={styles.statNumber}>{totalSKS}</Text>

          <Text style={styles.statText}>Total SKS</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialIcons name="groups" size={30} color="#2563EB" />

          <Text style={styles.statNumber}>{totalDosen}</Text>

          <Text style={styles.statText}>Dosen</Text>
        </View>
      </View>

      {/* ================= SEARCH ================= */}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748B" />

        <TextInput
          placeholder="Cari Mata Kuliah..."
          placeholderTextColor={
            theme.background === "#0F172A" ? "#94A3B8" : "#64748B"
          }
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ================= LIST MATA KULIAH ================= */}

      {filteredCourses.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.9}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/course-detail",
              params: {
                id: item.id,
              },
            })
          }
        >
          {/* HEADER CARD */}

          <View style={styles.cardHeader}>
            <MaterialIcons name="menu-book" size={30} color={theme.primary} />

            <View style={styles.cardContent}>
              <Text style={styles.courseName}>{item.nama}</Text>

              <Text style={styles.courseCode}>{item.kode}</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color={theme.primary} />
          </View>

          <View style={styles.divider} />

          {/* INFORMASI */}

          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color="#2563EB" />

            <Text style={styles.infoText}>{item.sks} SKS</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="class" size={20} color="#2563EB" />

            <Text style={styles.infoText}>{item.kelas}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="person" size={20} color="#2563EB" />

            <Text style={styles.infoText}>{item.dosen}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="check-circle" size={20} color="#16A34A" />

            <Text
              style={[
                styles.infoText,
                {
                  color: "#16A34A",
                  fontWeight: "bold",
                },
              ]}
            >
              {item.status}
            </Text>
          </View>

          {/* FOOTER */}

          <View style={styles.footerCard}>
            <Text style={styles.footerText}>
              Ketuk untuk melihat detail mata kuliah
            </Text>

            <Ionicons name="arrow-forward" size={18} color="#2563EB" />
          </View>
        </TouchableOpacity>
      ))}

      {filteredCourses.length === 0 && (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="search-off" size={70} color="#94A3B8" />

          <Text style={styles.emptyTitle}>Mata kuliah tidak ditemukan</Text>

          <Text style={styles.emptySub}>Coba gunakan kata kunci lain.</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => router.push("/meetings")}
      >
        <MaterialIcons name="event-note" size={24} color="white" />

        <Text style={styles.buttonText}>Lihat Semua Pertemuan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        activeOpacity={0.9}
        onPress={() => router.push("/schedule")}
      >
        <MaterialIcons name="calendar-month" size={24} color="#2563EB" />

        <Text style={styles.buttonSecondaryText}>Jadwal Mingguan</Text>
      </TouchableOpacity>
    </ScrollView>
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
      elevation: 8,
    },

    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    welcome: {
      color: "rgba(255,255,255,0.85)",
      fontSize: 16,
      fontWeight: "500",
    },

    title: {
      color: "#FFFFFF",
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 3,
    },

    subtitle: {
      color: "rgba(255,255,255,0.85)",
      marginTop: 5,
      fontSize: 15,
    },

    profile: {
      width: 55,
      height: 55,
      borderRadius: 28,
      backgroundColor: "rgba(255,255,255,0.18)",
      justifyContent: "center",
      alignItems: "center",
    },

    /* ================= DASHBOARD ================= */

    dashboard: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 15,
      marginTop: -22,
      marginBottom: 18,
    },

    statCard: {
      width: "31%",
      backgroundColor: theme.card,
      borderRadius: 18,
      alignItems: "center",
      paddingVertical: 18,
      borderWidth: 1,
      borderColor: theme.border,
      elevation: 5,
    },

    statNumber: {
      marginTop: 8,
      fontSize: 24,
      fontWeight: "bold",
      color: theme.primary,
    },

    statText: {
      marginTop: 5,
      fontSize: 12,
      color: theme.subText,
      textAlign: "center",
    },

    /* ================= SEARCH ================= */

    searchContainer: {
      backgroundColor: theme.card,
      marginHorizontal: 15,
      marginBottom: 18,
      borderRadius: 15,
      paddingHorizontal: 15,
      height: 55,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border,
      elevation: 3,
    },

    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 15,
      color: theme.text,
    },

    /* ================= CARD ================= */

    card: {
      backgroundColor: theme.card,
      marginHorizontal: 15,
      marginBottom: 16,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.border,
      elevation: 4,
    },

    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
    },

    cardContent: {
      flex: 1,
      marginLeft: 15,
    },

    courseName: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },

    courseCode: {
      marginTop: 4,
      color: theme.subText,
      fontSize: 14,
    },

    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginVertical: 15,
    },

    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },

    infoText: {
      marginLeft: 10,
      color: theme.text,
      fontSize: 15,
    },

    footerCard: {
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    footerText: {
      color: theme.primary,
      fontWeight: "600",
      fontSize: 14,
    },

    /* ================= STATUS ================= */

    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },

    statusText: {
      fontSize: 12,
      fontWeight: "bold",
    },

    /* ================= EMPTY ================= */

    emptyContainer: {
      alignItems: "center",
      marginTop: 50,
      paddingHorizontal: 20,
    },

    emptyTitle: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },

    emptySub: {
      marginTop: 8,
      color: theme.subText,
      textAlign: "center",
    },

    /* ================= BUTTON ================= */

    button: {
      backgroundColor: theme.primary,
      marginHorizontal: 15,
      marginTop: 12,
      borderRadius: 18,
      paddingVertical: 17,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 8,
    },

    buttonSecondary: {
      backgroundColor: theme.card,
      marginHorizontal: 15,
      marginTop: 15,
      marginBottom: 35,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.primary,
      paddingVertical: 17,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    buttonSecondaryText: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 8,
    },
  });
