import { useContext, useMemo, useState } from "react";

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { ThemeContext } from "../context/ThemeContext";
import { meetings } from "../data/meetings";

export default function MeetingScreen() {
  const { theme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  const [search, setSearch] = useState("");

  const [expanded, setExpanded] = useState(null);

  const groupedMeetings = useMemo(() => {
    const groups = {};

    meetings.forEach((item) => {
      if (!groups[item.matkul]) {
        groups[item.matkul] = [];
      }

      groups[item.matkul].push(item);
    });

    return Object.keys(groups)
      .filter((matkul) => matkul.toLowerCase().includes(search.toLowerCase()))
      .map((matkul) => ({
        matkul,
        data: groups[matkul],
      }));
  }, [search]);

  const getIcon = (matkul) => {
    switch (matkul) {
      case "BIG DATA":
        return "storage";

      case "SWITCHING, ROUTING DAN JARINGAN NIRKABEL":
        return "router";

      case "IMPLEMENTASI DAN PENGUJIAN PERANGKAT LUNAK":
        return "code";

      case "INTERAKSI MANUSIA DAN KOMPUTER":
        return "desktop-windows";

      case "PEMROGRAMAN MOBILE":
        return "phone-android";

      case "PEMROSESAN BAHASA ALAMI":
        return "forum";

      case "KERJA PRAKTEK":
        return "work";

      case "PEMBELAJARAN MESIN":
        return "psychology";

      default:
        return "school";
    }
  };

  const toggleAccordion = (matkul) => {
    if (expanded === matkul) {
      setExpanded(null);
    } else {
      setExpanded(matkul);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>📅 Daftar Pertemuan</Text>

        <Text style={styles.subtitle}>Semester 6 • Teknik Informatika</Text>
      </View>

      {/* DASHBOARD */}

      <View style={styles.dashboard}>
        <View style={styles.box}>
          <FontAwesome5 name="book-reader" size={28} color={theme.primary} />

          <Text style={styles.number}>{meetings.length}</Text>

          <Text style={styles.label}>Total Pertemuan</Text>
        </View>

        <View style={styles.box}>
          <MaterialIcons name="school" size={30} color={theme.primary} />

          <Text style={styles.number}>{groupedMeetings.length}</Text>

          <Text style={styles.label}>Mata Kuliah</Text>
        </View>
      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color={theme.subText} />

        <TextInput
          placeholder="Cari Mata Kuliah..."
          placeholderTextColor={theme.subText}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* LIST MATA KULIAH */}

      <FlatList
        data={groupedMeetings}
        keyExtractor={(item) => item.matkul}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <TouchableOpacity
              style={styles.courseHeader}
              onPress={() => toggleAccordion(item.matkul)}
            >
              <View style={styles.leftHeader}>
                <MaterialIcons
                  name={getIcon(item.matkul)}
                  size={28}
                  color={theme.primary}
                />

                <View>
                  <Text style={styles.courseTitle}>{item.matkul}</Text>

                  <Text style={styles.courseCount}>
                    {item.data.length} Pertemuan
                  </Text>
                </View>
              </View>

              <Ionicons
                name={expanded === item.matkul ? "chevron-up" : "chevron-down"}
                size={26}
                color={theme.primary}
              />
            </TouchableOpacity>

            {expanded === item.matkul && (
              <View style={styles.meetingContainer}>
                {item.data.map((meeting) => (
                  <View key={meeting.id} style={styles.meetingCard}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        P-{meeting.pertemuan}
                      </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.topic}>{meeting.topik}</Text>

                      <Text style={styles.date}>{meeting.tanggal}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/schedule")}
          >
            <MaterialIcons name="calendar-month" color="white" size={22} />

            <Text style={styles.buttonText}>Lihat Jadwal Mingguan</Text>
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
      elevation: 8,
    },

    title: {
      color: "#FFFFFF",
      fontSize: 28,
      fontWeight: "bold",
    },

    subtitle: {
      color: "#E5E7EB",
      marginTop: 5,
      fontSize: 16,
    },

    /* ================= DASHBOARD ================= */

    dashboard: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginTop: -25,
      marginBottom: 18,
    },

    box: {
      width: "48%",
      backgroundColor: theme.card,
      borderRadius: 18,
      alignItems: "center",
      paddingVertical: 18,
      elevation: 5,
    },

    number: {
      marginTop: 8,
      fontSize: 26,
      fontWeight: "bold",
      color: theme.primary,
    },

    label: {
      color: theme.subText,
      marginTop: 5,
      fontSize: 14,
    },

    /* ================= SEARCH ================= */

    searchContainer: {
      marginHorizontal: 20,
      backgroundColor: theme.card,
      borderRadius: 15,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      elevation: 3,
      marginBottom: 20,
      height: 55,
    },

    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: theme.text,
    },

    /* ================= COURSE ================= */

    courseCard: {
      backgroundColor: theme.card,
      borderRadius: 18,
      marginBottom: 15,
      overflow: "hidden",
      elevation: 4,
    },

    courseHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 18,
    },

    leftHeader: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    courseTitle: {
      marginLeft: 12,
      fontWeight: "bold",
      fontSize: 16,
      color: theme.text,
    },

    courseCount: {
      marginLeft: 12,
      marginTop: 3,
      color: theme.subText,
      fontSize: 13,
    },

    /* ================= MEETING ================= */

    meetingContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.border,
      padding: 15,
      backgroundColor: theme.background,
    },

    meetingCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.card,
      borderRadius: 15,
      padding: 14,
      marginBottom: 12,
      elevation: 2,
    },

    badge: {
      width: 55,
      height: 55,
      borderRadius: 15,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },

    badgeText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 15,
    },

    topic: {
      fontWeight: "bold",
      fontSize: 15,
      color: theme.text,
    },

    date: {
      marginTop: 6,
      color: theme.subText,
      fontSize: 13,
    },

    /* ================= BUTTON ================= */

    button: {
      backgroundColor: theme.primary,
      paddingVertical: 17,
      borderRadius: 18,
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 8,
    },
  });
