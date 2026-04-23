import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="quiz"
        options={{
          title: "Questions",
          headerStyle: { backgroundColor: "#4c3514" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen name="result" options={{ headerShown: false }} />
    </Stack>
  );
}
