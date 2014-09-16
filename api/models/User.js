/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: {
      type: 'email',
      unique: true
    },
    passports: {
      collection: 'passport',
      via: 'user'
    },
    operations: {
      collection: 'operation',
      via: 'user'
    },
    tags: {
      collection: 'tag',
      via: 'user'
    },
    // User's jwt token
    jwt: { type: 'string' },
  }
};
