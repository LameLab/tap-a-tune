'use strict';

const Alexa = require('ask-sdk');

// import lambda function config
const config = require('./config/config');

// import handlers
const GlobalHandlers = require('./handlers/global-handlers');
const StartHandlers = require('./handlers/start-handlers');

// utils
const logger = require('./utils/logger');

/**
 * Lambda setup.
 */
exports.handler = function (event, context) {
  let factory = Alexa.SkillBuilders.standard()
    .addRequestHandlers(
      // GlobalHandlers.HelpHandler,
      // GlobalHandlers.StopCancelHandler,
      // GlobalHandlers.SessionEndedRequestHandler,
      // GlobalHandlers.DefaultHandler
      StartHandlers.ButtonCountHandler,
      StartHandlers.YesHandler,
      StartHandlers.NoHandler,
      StartHandlers.LaunchPlayGameHandler,
      StartHandlers.StartNewGameHandler
    )
    .addRequestInterceptors(GlobalHandlers.RequestInterceptor)
    .addResponseInterceptors(GlobalHandlers.ResponseInterceptor)
    .addErrorHandlers(GlobalHandlers.ErrorHandler);

  if (config.APP_ID) {
    factory.withSkillId(config.APP_ID);
  }

  logger.debug("===ENV VAR DYNAMODBTABLE===: " + process.env.DYNAMODB_TABLE_NAME);
  if (process.env.DYNAMODB_TABLE_NAME && process.env.DYNAMODB_TABLE_NAME !== '') {
    config.STORAGE.SESSION_TABLE = process.env.DYNAMODB_TABLE_NAME;
    logger.debug("===STORAGE SESSION TABLE Set to===: " + config.STORAGE.SESSION_TABLE);
  }

  if (config.STORAGE.SESSION_TABLE) {
    factory.withTableName(config.STORAGE.SESSION_TABLE)
      .withAutoCreateTable(true);
  }

  let skill = factory.create();

  return skill.invoke(event, context);
}