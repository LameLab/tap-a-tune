const logger = require('../utils/logger');
const config = require('../config/config');

const startHandlers = {
  /**
   * Invoked when a user says 'open' or 'play' or some other variant
   */
  LaunchPlayGameHandler: {
    canHandle(handlerInput) {
      logger.debug('START.LaunchPlayGameHandler: canHandle');
      let {
        requestEnvelope
      } = handlerInput;
      return (requestEnvelope.request.type === 'LaunchRequest' ||
          requestEnvelope.request.type === 'NewSession' ||
          (requestEnvelope.request.type === 'IntentRequest' &&
            requestEnvelope.request.intent.name === 'PlayGameIntent'));
    },
    handle(handlerInput) {
      logger.debug('START.LaunchPlayGameHandler: handle');
      let {
        attributesManager,
        responseBuilder
      } = handlerInput;
      let ctx = attributesManager.getRequestAttributes();
      let sessionAttributes = attributesManager.getSessionAttributes();
      sessionAttributes.STATE = config.STATE.START_GAME_STATE;

      /**
       * Check to see if we have an active game
       */
      let validPlayerCount = sessionAttributes.playerCount &&
        sessionAttributes.playerCount <= config.GAME.MAX_PLAYERS && sessionAttributes.playerCount > 0;
      let gameInProgress = (sessionAttributes.currentQuestion || 0) <= config.GAME.QUESTIONS_PER_GAME;

      let responseMessage;
      if (validPlayerCount && gameInProgress) {
        logger.debug('LaunchPlayGameHandler: valid player count');
        responseMessage = ctx.t('ASK_TO_RESUME', {'player_count': sessionAttributes.playerCount});
      } else {
        logger.debug('LaunchPlayGameHandler: invalid player count');
        responseMessage = ctx.t('START_GAME');

        // it's a new game so delete all attributes
        let attributeNames = Object.keys(sessionAttributes);
        for (let k = 0; k < attributeNames.length; k++) {
          delete sessionAttributes[attributeNames[k]];
        }
      }
      ctx.outputSpeech.push(responseMessage.outputSpeech);
      ctx.reprompt.push(responseMessage.reprompt);
      ctx.render(handlerInput, responseMessage);
      ctx.openMicrophone = true;

      return responseBuilder.getResponse();
    }
  },
  StartNewGameHandler: {
    canHandle(handlerInput) {
      logger.debug('START.StartNewGameHandler: canHandle');
      let request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' &&
        request.intent.name === 'AMAZON.StartOverIntent';
    },
    handle(handlerInput) {
      logger.debug('START.StartNewGameHandler: handle');
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      // Deleting playerCount to force launching of a new game
      delete sessionAttributes.playerCount;
      return startHandlers.LaunchPlayGameHandler.handle(handlerInput);
    }
  },
  PlayerCountHandler: {
    canHandle(handlerInput) {
      logger.debug('START.PlayerCountHandler: canHandle');
      let {
        attributesManager,
        requestEnvelope
      } = handlerInput;
      return requestEnvelope.request.type === 'IntentRequest' &&
        (requestEnvelope.request.intent.name === 'PlayerCountIntent' ||
        requestEnvelope.request.intent.name === 'PlayerCountOnlyIntent') &&
        attributesManager.getSessionAttributes().STATE === config.STATE.START_GAME_STATE;
    },
    handle(handlerInput) {
      logger.debug('START.PlayerCountHandler: handle');
      let {
        requestEnvelope,
        attributesManager,
        responseBuilder
      } = handlerInput;
      let sessionAttributes = attributesManager.getSessionAttributes();
      let ctx = attributesManager.getRequestAttributes();

      sessionAttributes.playerCount = requestEnvelope.request.intent.slots.players &&
        !isNaN(requestEnvelope.request.intent.slots.players.value) ?
        parseInt(requestEnvelope.request.intent.slots.players.value, 10) : 0;

      let validPlayerCount = sessionAttributes.playerCount &&
        (sessionAttributes.playerCount <= config.GAME.MAX_PLAYERS) && (sessionAttributes.playerCount > 0);

      if (validPlayerCount){
        logger.debug('PlayerCountHandler: valid player count');
      } else {
        logger.debug('PlayerCountHandler: invalid player count');
        let responseMessage = ctx.t('PLAYERCOUNT_INVALID');
        ctx.outputSpeech.push(responseMessage.outputSpeech);
        ctx.reprompt.push(responseMessage.reprompt);
        ctx.openMicrophone = true;
      }

      return responseBuilder.getResponse();
    }
  },
  /**
   * The player has responded 'no' to the option of resuming the previous game.
   */
  NoHandler: {
    canHandle(handlerInput) {
      logger.debug('START.NoHandler: canHandle');
      let {
        attributesManager,
        requestEnvelope
      } = handlerInput;
      return requestEnvelope.request.type === 'IntentRequest' &&
        requestEnvelope.request.intent.name === 'AMAZON.NoIntent' &&
        (attributesManager.getSessionAttributes().STATE === config.STATE.START_GAME_STATE);
    },
    handle(handlerInput) {
      logger.debug('START.NoHandler: handle');
      let {
        attributesManager,
        responseBuilder
      } = handlerInput;
      let sessionAttributes = attributesManager.getSessionAttributes();
      let ctx = attributesManager.getRequestAttributes();

      logger.debug('NoHandler');

      return responseBuilder.getResponse();
    }
  },
  /**
   * The player has responded 'yes' to the option of resuming the previous game.
   */
  YesHandler: {
    canHandle(handlerInput) {
      logger.debug('START.NoHandler: canHandle');
      let {
        attributesManager,
        requestEnvelope
      } = handlerInput;
      return requestEnvelope.request.type === 'IntentRequest' &&
        requestEnvelope.request.intent.name === 'AMAZON.YesIntent' &&
        attributesManager.getSessionAttributes().STATE === config.STATE.START_GAME_STATE;
    },
    handle(handlerInput) {
      logger.debug('START.NoHandler: handle');
      let {
        attributesManager,
        responseBuilder
      } = handlerInput;
      let sessionAttributes = attributesManager.getSessionAttributes();
      let ctx = attributesManager.getRequestAttributes();

      let validPlayerCount = sessionAttributes.playerCount &&
        sessionAttributes.playerCount <= config.GAME.MAX_PLAYERS && sessionAttributes.playerCount > 0;

      if (validPlayerCount) {
        logger.debug('YesHandler: valid player count');
      } else {
        logger.debug('YesHandler: invalid player count');
      }
      return responseBuilder.getResponse();
    }
  }
}

module.exports = startHandlers;