/**
* Operation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    user: {
      model: 'user'
    },
    amount: {
      type: 'float'
    },
    date: {
      type: 'datetime'
    },
    type: {
      type: 'string',
      enum: ['debit', 'credit'] // operation type can only be "debit" or "credit"
    },
    tags: {
      collection: 'tag',
      via: 'operations',
      dominant: true // tags relations are stored in the operation document
    }
  }
};
