import { Animated, StyleSheet, View } from "react-native";
import data from "../QuizData";

//Denne vise brukerens progresjon og hvor mange spørsmål brukeren har svart mtp total antall spørsmål.
//Denne komponenten inneholder View og Animation. View til progresjonsbaren.
//HUSK komponentmappen er gjenbrukbare deler av en skjerm

const ProgressBar = ({ progress }: { progress: Animated.Value }) => {
  const allQuestions = data;

  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          {
            height: 5,
            borderRadius: 5,
            backgroundColor: "#EDA276" + "90",
          },
          {
            width: progressAnim,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "80%",
    height: 5,
    borderRadius: 5,
    backgroundColor: "#00000020",
    marginBottom: 10,
  },
});

export default ProgressBar;
