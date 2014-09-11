/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    user: {
      model: 'user' // do not share tags for privacy reasons
    },
    label: {
      type: 'string'
    },
    operations: { // operations (credit & debit) associated with this tag
      collection: 'operation',
      via: 'tags'
    }
  }
};
