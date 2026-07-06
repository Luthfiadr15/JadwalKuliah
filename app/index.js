import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState , useContext } from "react";

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
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.kode.toLowerCase().includes(search.toLowerCase()) ||
        item.dosen.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcome}>👋 Selamat Datang</Text>

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
          style={styles.searchInput}
          placeholder="Cari Mata Kuliah..."
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
            <View style={styles.iconBox}>
              <MaterialIcons name="menu-book" size={28} color="#2563EB" />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.courseName}>{item.nama}</Text>

              <Text style={styles.courseCode}>{item.kode}</Text>
            </View>

            <Ionicons name="chevron-forward-circle" size={28} color="#2563EB" />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#2563EB",
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
    color: "#DBEAFE",
    fontSize: 16,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 3,
  },

  subtitle: {
    color: "#E0E7FF",
    marginTop: 5,
    fontSize: 15,
  },

  profile: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 18,
    elevation: 5,
  },

  statNumber: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
  },

  statText: {
    marginTop: 5,
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },

  /* ================= SEARCH ================= */

  searchContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginBottom: 18,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginBottom: 16,
    borderRadius: 18,
    padding: 18,
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  cardContent: {
    flex: 1,
    marginLeft: 15,
  },

  courseName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  courseCode: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 14,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginVertical: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 10,
    color: "#475569",
    fontSize: 15,
  },

  footerCard: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
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
    color: "#334155",
  },

  emptySub: {
    marginTop: 8,
    color: "#64748B",
    textAlign: "center",
  },

  /* ================= BUTTON ================= */

  button: {
    backgroundColor: "#2563EB",
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
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 35,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#2563EB",
    paddingVertical: 17,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSecondaryText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
