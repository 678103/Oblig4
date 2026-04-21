import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(1));

  const startQuiz = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1900,
        useNativeDriver: true,
      }),
    ]).start();

    router.push("/quiz");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/welcome.png")}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>Klar for en gøyal quiz?</Text>
      </View>
      <TouchableOpacity onPress={startQuiz} style={styles.btn}>
        <Text style={styles.btnText}>Let's Begin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38588b",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },

  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  btn: {
    backgroundColor: "#fac782",
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: "center",
    width: "90%",
  },
  btnText: {
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    letterSpacing: 1.1,
  },
});
