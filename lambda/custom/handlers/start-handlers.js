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
      let validButtonCount = config.validButtonCount(sessionAttributes.buttonCount);

      let gameInProgress = (sessionAttributes.currentQuestion || 0) <= config.GAME.QUESTIONS_PER_GAME;

      let responseMessage;
      if (validButtonCount && gameInProgress) {
        logger.debug('LaunchPlayGameHandler: valid player count');
        responseMessage = ctx.t('ASK_TO_RESUME', {'button_count': sessionAttributes.buttonCount});
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
      // Deleting buttonCount to force launching of a new game
      delete sessionAttributes.buttonCount;
      return startHandlers.LaunchPlayGameHandler.handle(handlerInput);
    }
  },
  ButtonCountHandler: {
    canHandle(handlerInput) {
      logger.debug('START.ButtonCountHandler: canHandle');
      let {
        attributesManager,
        requestEnvelope
      } = handlerInput;
      return requestEnvelope.request.type === 'IntentRequest' &&
        (requestEnvelope.request.intent.name === 'ButtonCountIntent' ||
          requestEnvelope.request.intent.name === 'ButtonCountOnlyIntent') &&
        attributesManager.getSessionAttributes().STATE === config.STATE.START_GAME_STATE;
    },
    handle(handlerInput) {
      logger.debug('START.ButtonCountHandler: handle');
      let {
        requestEnvelope,
        attributesManager,
        responseBuilder
      } = handlerInput;
      let sessionAttributes = attributesManager.getSessionAttributes();
      let ctx = attributesManager.getRequestAttributes();

      sessionAttributes.buttonCount = requestEnvelope.request.intent.slots.buttons &&
        !isNaN(requestEnvelope.request.intent.slots.buttons.value) ?
        parseInt(requestEnvelope.request.intent.slots.buttons.value, 10) : 0;

      let validButtonCount = config.validButtonCount(sessionAttributes.buttonCount);

      if (validButtonCount){
        logger.debug('ButtonCountHandler: valid button count');
      } else {
        logger.debug('ButtonCountHandler: invalid button count');
        const responseMessage = ctx.t('BUTTONCOUNT_INVALID');

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

      let validButtonCount = config.validButtonCount(sessionAttributes.buttonCount);

      if (validButtonCount) {
        logger.debug('YesHandler: valid player count');
      } else {
        logger.debug('YesHandler: invalid player count');
      }
      return responseBuilder.getResponse();
    }
  }
}

module.exports = startHandlers;