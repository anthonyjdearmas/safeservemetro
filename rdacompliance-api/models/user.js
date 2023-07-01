const db = require('../util/database');

module.exports = class User {
  constructor(accessCode, expirationDate, associatedEmail) {
    this.accessCode = accessCode;
    this.expirationDate = expirationDate;
    this.associatedEmail = associatedEmail;
    this.quiz1_progress = 0;
    this.quiz2_progress = 0;
    this.quiz3_progress = 0;
    this.quiz4_progress = 0;
    this.quiz5_progress = 0;
    this.quiz6_progress = 0;
    this.quiz7_progress = 0;
    this.quiz8_progress = 0;
    this.quiz9_progress = 0;
    this.quiz10_progress = 0;
    this.quiz15_progress = 0;
    this.quiz16_progress = 0;
  }

  static find(accessCode) {
    return db.execute('SELECT * FROM users WHERE accessCode = ?', [accessCode]);

  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (accessCode, expirationDate, associatedEmail) VALUES (?, ?, ?)',
      [user.accessCode, user.expirationDate, user.associatedEmail]
    );
  }

  static getExpirationDate(accessCode) {
    return db.execute(
      'SELECT expirationDate FROM users WHERE accessCode = ?',
      [accessCode]
    );
  }
  
  static setQuizProgress(accessCode, quizNumber, quizScore) {
    return db.execute(
      'UPDATE users SET quiz' + quizNumber + '_progress = ? WHERE accessCode = ?',
      [quizScore, accessCode]
    );
  }

  static getQuizProgress(accessCode, quizNumber) {
    return db.execute(
      'SELECT quiz' + quizNumber + '_progress FROM users WHERE accessCode = ?',
      [accessCode]
    );
  }

  static getAllQuizData(accessCode) {
    return db.execute(
      'SELECT quiz1_progress, quiz2_progress, quiz3_progress, quiz4_progress, quiz5_progress, quiz6_progress, quiz7_progress, quiz8_progress, quiz9_progress, quiz10_progress, quiz11_progress, quiz12_progress FROM users WHERE accessCode = ?',
      [accessCode]
    );
  }
  
};
