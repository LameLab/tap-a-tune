/*
 * Copyright 2018 Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 * http://aws.amazon.com/asl/
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
'use strict';

const config = require('./config');
const GAME_TITLE = 'Tap a tune';

const messages = {
  en: {
    translation: {
      'GENERAL_HELP': {
        outputSpeech: 'To get started just ask me to play a game. ' +
          'What would you like to do? ',
        reprompt: "Sorry, I didn't catch that, what would you like to do next?",
        displayTitle: GAME_TITLE + ' - Help',
        displayText: 'This is a game that requires player\'s interaction to follow the rhythm/tune given' +
          'To get started just ask me to play a game.'
      },
      'UNHANDLED_REQUEST': {
        outputSpeech: "Sorry, I didn't get that. Please say again!",
        reprompt: "Please say it again. You can ask for help if you're not sure what to do."
      },
      'GOOD_BYE': {
        outputSpeech: "Ok, see you next time!",
        reprompt: ''
      },

      //
      //--------------------  Start Game Related Prompts -------------------------------------------
      //
      'START_GAME': {
        outputSpeech: "Welcome to " + GAME_TITLE + ". This game supports minimum " +
          config.GAME.MIN_BUTTONS +
          " and up to " +
          config.GAME.MAX_BUTTONS + " buttons. " +
          "How many buttons are there?",
        reprompt: "How many buttons?",
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "Welcome to " + GAME_TITLE + ". This game supports minimum " +
          config.GAME.MIN_BUTTONS +
          " and up to " +
          config.GAME.MAX_BUTTONS + " buttons. " +
          "How many buttons are there?"
      },
      'RESUME_GAME': {
        outputSpeech: 'Ok, we will pick up where you left off. ' +
          'How many buttons are there?',
        reprompt: 'How many buttons are there?',
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "Welcome back!"
      },
      'DONT_RESUME_GAME': {
        outputSpeech: 'Ok, lets start a new game. How many buttons are there?',
        reprompt: 'How many buttons are there?',
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "Ok. Let's start a new game!"
      },
      'ASK_TO_RESUME': {
        outputSpeech: "It looks like you have {{button_count}} buttons game in progress, " +
          "would you like to resume?",
        reprompt: 'Would you like to resume the last game?',
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "You have {{button_count}} buttons game in progress."
      },
      // 'PLAYERCOUNT_INVALID': {
      //   outputSpeech: 'Please say a number between one and ' + config.GAME.MAX_PLAYERS + ' players',
      //   reprompt: 'Please say a number between one and ' + config.GAME.MAX_PLAYERS + ' players'
      // },
      'GAME_READY': {
        outputSpeech: ["Fantastic! Are you ready to start the game?"],
        reprompt: "Ready to start the game?",
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "Are you ready to start the game?"
      },
      'BUTTONCOUNT_INVALID': {
        outputSpeech: 'Please say a number between ' + config.GAME.MIN_BUTTONS + ' and ' + config.GAME.MAX_BUTTONS + ' buttons',
        reprompt: 'Please say a number between ' + config.GAME.MIN_BUTTONS + ' and ' + config.GAME.MAX_BUTTONS + ' buttons',
      },

      //
      //--------------------  Roll Call Related Prompts -------------------------------------------
      //
      'ROLL_CALL_HELP': {
        outputSpeech: 'This is a trivia game for Echo Buttons. ' +
          'In order to play the game, each player must check in by ' +
          'pressing an Echo Button. Would you like to continue and ' +
          'check players in for the game?',
        reprompt: "Sorry, I didn't catch that, what would you like to do next?",
        displayTitle: GAME_TITLE + ' - Help',
        displayText: 'In order to play the game, each player must check in by ' +
          'pressing an Echo Button. Would you like to continue?'
      },
      'ROLL_CALL_CONTINUE': {
        outputSpeech: "Ok. Players, press your buttons now, " +
          "so I'll know which buttons you will be using.",
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "To resume the game, please press all the buttons at once!"
      },
      'ROLL_CALL_TIME_OUT': {
        outputSpeech: "<say-as interpret-as='interjection'>uh oh</say-as>, " +
          "looks like times up and I haven't heard from all players. " +
          "Did you want to continue?",
        reprompt: "should we continue?"
      },
      'ROLL_CALL_RESUME_GAME': {
        outputSpeech: "To resume the game, please press all the buttons at once!",
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "To resume the game, please press all the buttons at once!"
      },
      'ROLL_CALL_COMPLETE': {
        outputSpeech: ["Great! We can start the game. Are you ready?",
        "Awesome. All buttons registered. Are you ready to start the game?"],
        reprompt: "Ready to start the game?",
        displayTitle: GAME_TITLE + " - Welcome",
        displayText: "Are you ready to start the game?"
      },
      'ROLL_CALL_HELLO_BUTTON': {
        outputSpeech: "Button {{button_number}}. "
      },
      'ROLL_CALL_NEXT_PLAYER_BUTTON': {
        outputSpeech: "Ok, press button {{button_number}}."
      },
    },
  },

  //
  // To override by territory follow the below pattern
  //
  // For additional information on translations and formatting messages see https://www.i18next.com/
  //
  'en-US': {
    translation: {
      'GAME_ROUND_SUMMARY_OUTRO': {
        outputSpeech: "Let's continue!"
      }
    },
  }
};

module.exports = messages;