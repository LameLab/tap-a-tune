module.exports = {
  /**
   * APP_ID:
   *  The skill ID to be matched against requests for confirmation.
   *  It helps protect against spamming your skill.
   *  Replace this with the value of your skill ID to enable this protection.
   */
  APP_ID: '',
  STORAGE: {
    /**
     * STORAGE.SESSION_TABLE:
     *  The name of the table in DynamoDB where you want to store session and game data.
     *  You can leave this empty if you do not wish to use DynamoDB to automatically
     *  store game data between sessions after each request.
     */
    SESSION_TABLE: 'tap-a-tune-sessions'
  },
  LOG_LEVEL: 'DEBUG'
}