/**
 * Passport configuration
 *
 * This if the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {

  local: {
    strategy: require('passport-local').Strategy
  },

  // twitter: {
  //   name: 'Twitter',
  //   protocol: 'oauth',
  //   strategy: require('passport-twitter').Strategy,
  //   options: {
  //     consumerKey: 'your-consumer-key',
  //     consumerSecret: 'your-consumer-secret'
  //   }
  // },
  //
  // github: {
  //   name: 'GitHub',
  //   protocol: 'oauth2',
  //   strategy: require('passport-github').Strategy,
  //   options: {
  //     clientID: 'your-client-id',
  //     clientSecret: 'your-client-secret'
  //   }
  // },
  //

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    scope: ['email', 'public_profile'],
    options: {
      clientID: '1494808234100037',
      clientSecret: '42898a44118dcf53f498ceda9b54599d',
      callbackURL: 'http://localhost:1337/auth/facebook/callback'
    }
  },

  google: {
     name: 'Google',
     protocol: 'oauth2',
     strategy: require('passport-google-oauth').OAuth2Strategy,
     scope: 'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
     options: {
       clientID: '859678273387-tejhqhv2pt4f6qfhlcdjsna2s1rge1t1.apps.googleusercontent.com',
       clientSecret: '-h8bS0_rnyqaFWg3TAhmldfq',
       callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
     }
  }

};
