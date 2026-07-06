import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#F4F8FF",
          },
        }}
      >
        {/* Dashboard */}
        <Stack.Screen
          name="index"
          options={{
            gestureEnabled: false,
          }}
        />

        {/* Detail Mata Kuliah */}
        <Stack.Screen
          name="course-detail"
          options={{
            gestureEnabled: true,
          }}
        />

        {/* Daftar Pertemuan */}
        <Stack.Screen
          name="meetings"
          options={{
            gestureEnabled: true,
          }}
        />

        {/* Jadwal Mingguan */}
        <Stack.Screen
          name="schedule"
          options={{
            gestureEnabled: true,
          }}
        />

        {/* Profil */}
        <Stack.Screen
          name="profile"
          options={{
            gestureEnabled: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}