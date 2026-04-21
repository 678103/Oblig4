const data = [
  {
    question: "What animal is this?",
    image: require("./assets/images/fish.png"),
    options: ["Dog", "Elephant", "Horse", "Fish"],
    correct_option: "Fish",
  },
  {
    question: "What animal is this?",
    image: require("./assets/images/dog.png"),
    options: ["Dog", "Elephant", "Horse", "Fish"],
    correct_option: "Dog",
  },
  {
    question: "What animal is this?",
    image: require("./assets/images/elephant.png"),
    options: ["Dog", "Elephant", "Horse", "Fish"],
    correct_option: "Elephant",
  },
];

export default data; //hvorfor?
//en fil kan bare ha én export default. det betyr "dette er hovedtingen fra denne filen "
