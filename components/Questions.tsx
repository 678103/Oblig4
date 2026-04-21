import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import data from "../QuizData";
//må bruke imagekomponent for å vise bilde

// i denne komponenten lages det et View som vil vise spørsmålets nummer og et spørsmål, begge er tatt som props fra QuizPage.js Screen

const Questions = ({
  index,
  image,
  question,
}: {
  index: number;
  image: ImageSourcePropType;
  question: string;
}) => {
  return (
    <View>
      {/* Question Counter */}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{
            color: "hsl(0, 0%, 20%)",
            fontSize: 15,
            opacity: 0.6,
            marginRight: 2,
          }}
        >
          {index + 1}
        </Text>
        <Text style={{ color: "#333", fontSize: 13, opacity: 0.6 }}>
          / {data.length}
        </Text>
      </View>

      {/* Question */}
      <Text style={{ color: "#333", fontSize: 18, textAlign: "center" }}>
        {question}
      </Text>

      {/* Image */}
      <Image
        source={image}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Questions;
