import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { courses } from "../data/courses";
import { meetings } from "../data/meetings";

export default function CourseDetailScreen() {
  const context = useContext(ThemeContext);

const theme = context?.theme ?? {
  background: "#F4F8FF",
  card: "#FFFFFF",
  header: "#2563EB",
  primary: "#2563EB",
  text: "#1E293B",
  subText: "#64748B",
};

const styles = createStyles(theme);
  console.log("THEME =", theme);
  const { id } = useLocalSearchParams();

  const course = courses.find((item) => item.id === id);

  const courseMeetings = meetings.filter((item) => item.courseId === id);

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <MaterialIcons name="error-outline" size={70} color="#EF4444" />

          <Text style={styles.notFoundTitle}>Mata kuliah tidak ditemukan</Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>{course.nama}</Text>

          <Text style={styles.subtitle}>Detail Mata Kuliah</Text>
        </View>

        {/* CARD INFO */}

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialIcons name="badge" size={22} color="#2563EB" />

            <Text style={styles.infoText}>Kode : {course.kode}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={22} color="#2563EB" />

            <Text style={styles.infoText}>SKS : {course.sks}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="class" size={22} color="#2563EB" />

            <Text style={styles.infoText}>Kelas : {course.kelas}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="person" size={22} color="#2563EB" />

            <Text style={styles.infoText}>{course.dosen}</Text>
          </View>
        </View>

        {/* STATISTIK */}

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{courseMeetings.length}</Text>

          <Text style={styles.statLabel}>Total Pertemuan</Text>
        </View>

        {/* DAFTAR PERTEMUAN */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daftar Pertemuan</Text>

          {courseMeetings.map((item) => (
            <View key={item.id} style={styles.meetingCard}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>P-{item.pertemuan}</Text>
              </View>

              <View style={styles.content}>
                <Text style={styles.topic}>{item.topik}</Text>

                <View style={styles.dateRow}>
                  <Ionicons name="calendar-outline" size={16} color="#64748B" />

                  <Text style={styles.date}>{item.tanggal}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={() => router.push("/schedule")}
        >
          <MaterialIcons name="calendar-month" size={22} color="white" />

          <Text style={styles.scheduleText}>Lihat Jadwal Mingguan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/")}
        >
          <Ionicons name="home" size={22} color="#2563EB" />

          <Text style={styles.homeText}>Kembali ke Dashboard</Text>
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

    notFound: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30,
    },

    notFoundTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 25,
      color: theme.text,
    },

    header: {
      backgroundColor: theme.header,
      paddingTop: 55,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 6,
    },

    backIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,.2)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },

    title: {
      color: "#FFFFFF",
      fontSize: 28,
      fontWeight: "bold",
    },

    subtitle: {
      color: "#E2E8F0",
      marginTop: 5,
      fontSize: 15,
    },

    infoCard: {
      backgroundColor: theme.card,
      margin: 20,
      borderRadius: 18,
      padding: 18,
      elevation: 4,
    },

    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 8,
    },

    infoText: {
      marginLeft: 12,
      fontSize: 15,
      color: theme.text,
    },

    statCard: {
      backgroundColor: theme.primary,
      marginHorizontal: 20,
      borderRadius: 18,
      paddingVertical: 20,
      alignItems: "center",
    },

    statNumber: {
      color: "#FFFFFF",
      fontSize: 34,
      fontWeight: "bold",
    },

    statLabel: {
      color: "#DBEAFE",
      marginTop: 4,
    },

    section: {
      margin: 20,
    },

    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
      color: theme.text,
    },

    meetingCard: {
      flexDirection: "row",
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      elevation: 3,
    },

    badge: {
      width: 58,
      height: 58,
      borderRadius: 16,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },

    badgeText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },

    content: {
      flex: 1,
      justifyContent: "center",
    },

    topic: {
      fontWeight: "bold",
      fontSize: 16,
      color: theme.text,
    },

    dateRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },

    date: {
      marginLeft: 6,
      color: theme.subText,
    },

    scheduleButton: {
      backgroundColor: theme.primary,
      marginHorizontal: 20,
      marginBottom: 15,
      borderRadius: 16,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },

    scheduleText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      marginLeft: 8,
      fontSize: 16,
    },

    homeButton: {
      backgroundColor: theme.card,
      marginHorizontal: 20,
      marginBottom: 35,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.primary,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    homeText: {
      color: theme.primary,
      fontWeight: "bold",
      marginLeft: 8,
      fontSize: 16,
    },

    backButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 15,
    },

    backButtonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
