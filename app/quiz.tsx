import { useRouter } from "expo-router"; // Expo: bruker useRouter i stedet for navigation-prop
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import data from "../QuizData";
import ProgressBar from "../components/ProgressBar";
import Questions from "../components/Questions";

export default function Quiz() {
  const router = useRouter(); // Expo: useRouter håndterer navigasjon
  const allQuestions = data;

  const [progress] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(1));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState<
    string | null
  >(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const validateAnswer = (selectedOption: string) => {
    if (!isOptionsDisabled) {
      const correct = allQuestions[currentQuestionIndex]["correct_option"];
      setCurrentOptionSelected(selectedOption);
      setCorrectOption(correct);
      setIsOptionsDisabled(true);
      if (selectedOption === correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
      // Expo: router.push med params i stedet for navigation.navigate("Result", { score })
      router.push({ pathname: "/result", params: { score } });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
    }
    Animated.parallel([
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 2,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true, // Expo: endret til true for bedre ytelse
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1900,
          useNativeDriver: true, // Expo: endret til true for bedre ytelse
        }),
      ]),
    ]).start();
  };

  //dette er en sub-komponent i Quiz som gjør at den looper gjennom tabellen med svaralternativer.
  // Will display these options inside TouchableOpacity which will act as a button and onPress of it will display the result of on-spot.
  // And Call this component just after Questions Component called in QuizPage return. here is a code snippet
  const renderOptions = () => {
    return (
      <View style={{ marginTop: 100 }}>
        {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(150 / 4) * (index + 10), 0],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              style={[
                { ...styles.optionsText },
                {
                  backgroundColor: isOptionsDisabled
                    ? option == correctOption
                      ? "#7be25b"
                      : option == currentOptionSelected
                        ? "#f0222b"
                        : "#cfcdcc"
                    : "#fac782",
                },
              ]}
            >
              <Text
                style={{ fontSize: 16, color: "black", textAlign: "center" }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <ProgressBar progress={progress} />
          <Questions
            index={currentQuestionIndex}
            question={allQuestions[currentQuestionIndex]?.question}
            image={data[currentQuestionIndex].image}
          />
        </View>
        {renderOptions()}
      </View>
      {/* NEXT-knapp */}
      <View style={{ position: "absolute", bottom: -75, right: 20 }}>
        <TouchableOpacity
          style={[
            { ...styles.btnNext },
            { backgroundColor: !currentOptionSelected ? "#cfcdcc" : "#ffffff" },
          ]}
          disabled={!currentOptionSelected}
          onPress={handleNext}
        >
          <Text style={styles.btnNextText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { backgroundColor: "#38588b" },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  subContainer: {
    marginTop: 50,
    marginVertical: 10,
    padding: 40,
    borderTopRightRadius: 40,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -6, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  optionsText: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnNext: {
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  btnNextText: {
    color: "#333",
    fontSize: 17,
    letterSpacing: 1.1,
  },
});
