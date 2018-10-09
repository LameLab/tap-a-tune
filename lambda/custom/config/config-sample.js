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
  LOG_LEVEL: 'DEBUG',
  IMAGES: {
    BACKGROUND_IMAGES: [
      'https://d2vbr0xakfjx9a.cloudfront.net/bg1.jpg',
      'https://d2vbr0xakfjx9a.cloudfront.net/bg2.jpg'
    ],
  },
  GAME: {
    MAX_PLAYERS: 4
  },
  STATE: {
    // Start mode performs roll call and button registration.
    // https://developer.amazon.com/docs/gadget-skills/discover-echo-buttons.html
    START_GAME_STATE: '',
    ROLLCALL_STATE: '_ROLLCALL',
    BUTTON_GAME_STATE: '_BUTTON_GAME'
  },
  pickRandom(arry) {
    if (Array.isArray(arry)) {
      return arry[Math.floor(Math.random() * Math.floor(arry.length))]
    }
    return arry;
  }
}