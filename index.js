#!/usr/bin/env node

let playerName = "Player";
let score = 0;

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

const triviaQuestions = [
  {
    question: 'Which planet is known as the "Red Planet"?',
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest organ in the human body?",
    choices: ["Liver", "Brain", "Skin", "Heart"],
    correctAnswer: "Skin",
  },
  {
    question: "How many players are there on a standard soccer team?",
    choices: ["9", "11", "7", "10"],
    correctAnswer: "11",
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "Which is the largest ocean on Earth?",
    choices: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
];

function displayMessage() {
  console.clear();
  console.log(
    chalk.yellow(
      figlet.textSync("Trivial Pursuite", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  console.log(chalk.blue("Welcome to the Trivia Challange \n"));

  console.log(chalk.green("You will be asked a series of question \n"));
  console.log(chalk.green("Answer as many as Possible \n"));
  console.log(chalk.green("Let the game begins \n"));
}

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function askPlayerName() {
  const asnwers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Enter your name:",
    default() {
      return playerName;
    },
  });
  playerName = asnwers.player_name;
}

async function askQuestion(question) {
  console.log(chalk.blue(`\n ${question.question}`));
  const asnwers = await inquirer.prompt({
    name: "player_answer",
    type: "list",
    message: "Choose your answer",
    choices: question.choices,
  });
  return asnwers.player_answer === question.correctAnswer;
}

async function displayCorrectFeedback() {
  console.log(
    chalk.green(
      figlet.textSync("Correct", {
        font: "Doom",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  console.log(chalk.green("Good Job, Keep it Up"));
}

async function displayInCorrectFeedback() {
  console.log(
    chalk.green(
      figlet.textSync("Wrong", {
        font: "Doom",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  console.log(chalk.green("Oops, that was not the correct option"));
}

async function runTriviaGame() {
  displayMessage();
  await askPlayerName();

  for (const question of triviaQuestions) {
    console.log(chalk.cyan(`\n ${playerName} here is your next question`));
    const isAnswerCorrect = await askQuestion(question);

    if (isAnswerCorrect) {
      displayCorrectFeedback();
      score++;
    } else {
      displayInCorrectFeedback();
    }
    await sleep(2000);
  }
  displayGameResult();
}

async function displayGameResult() {
  console.clear();
  if (score === triviaQuestions.length) {
    console.log(
      chalk.yellow(
        figlet.textSync(`CONGRATS , ${playerName} !`, {
          font: "Big",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );
    console.log(chalk.green("\nYou are a Trivial Pursuit Champion! 🏆"));
  } else {
    console.log(
      chalk.cyan(
        `${playerName}, your final score is: ${score}/${triviaQuestions.length}`
      )
    );
    console.log(
      chalk.yellow(
        figlet.textSync("Game Over!", {
          font: "Big",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );
    console.log(
      chalk.red("\nKeep learning and try again for a perfect score next time!")
    );
  }
}

runTriviaGame();
