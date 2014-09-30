// function to call after a click on the Facebook button
function facebookSigninCallback() {

    FB.login(function(authResult){
      // Handle the response object, like in statusChangeCallback() in our demo
      // code.
      authHandler.facebook(authResult);
    }, {scope: 'public_profile,email'});
  }

// function to call after a clic on the G+ button
function googleSigninCallback() {
  //console.log('g+ cb ')
  gapi.auth.signIn({
    'callback': function(authResult) {
      authHandler.google(authResult);
    },
    'clientid': '859678273387-tejhqhv2pt4f6qfhlcdjsna2s1rge1t1.apps.googleusercontent.com',
    'cookiepolicy': 'single_host_origin',
    'requestvisibleactions': 'http://schema.org/AddAction',
    'scope': 'https://www.googleapis.com/auth/plus.login'
  });
}

var authHandler = {

  // Facebook auth entrypoint
  facebook: function(authResult) {

    if (authResult.status === "connected") {

      var payload = this.getPayload('facebook', authResult).then(this.sendPayload);

    } else {
      console.log('FACEBOOK SIGN IN ERROR ', authResult);
    }

  },

  // G+ auth entrypoint
  google: function(authResult) {

    if (authResult['status']['signed_in']) {

      var payload = this.getPayload('google', authResult).then(this.sendPayload);

    } else {
      console.log('GOOGLE SIGN IN ERROR : ', authResult);
    }

  },

  // Send a payload containing a user and its passport to the api
  // If everything checks out, get a JWT in return
  sendPayload: function(payload) {
    
    $.ajax({
      contentType:"application/json; charset=utf-8",
      url: '/auth/connect',
      type: 'post',
      dataType: "text",
      data: JSON.stringify(payload)
    }).done(function(data) {
      console.log('Auth OK / jwt : ', data);
      sessionStorage.jwt = data;
    });
  },

  // Provide a standardized payload for `sendPayload` from
  // whatever provider
  getPayload: function(service, authData) {
    
    var payload = $.Deferred();

    switch (service) {
      case 'google':
        console.log('get google payload')

        this._getUser(service, authData)
        .then(this._getPassport)
        .then(function(data) {
          console.log('end promise chain', data)
          payload.resolve(data)
        });

        break;
      case 'facebook':
        console.log('get facebook payload')

        this._getUser(service, authData)
        .then(this._getPassport)
        .then(function(data) {
          console.log('end promise chain', data)
          payload.resolve(data)
        });
        // ...
        break;
      default:
        console.log('error :3');
    }

    return payload.promise();

  },


  // Must return a valid passport for the application (the token will be verified/extended server-side )
  //
  // // example :
  // passport: {
  //   provider: 'google',
  //   identifier: user.id,
  //   protocol: 'oauth2',
  //   tokens: {
  //     accessToken: authResult.access_token
  //   }
  // },
  _getPassport: function(service, user, authData) {

    switch (service) {
      case 'google':

        return {
          query: {
            provider: service,
            identifier: user.id,
            protocol: 'oauth2',
            tokens: {
              accessToken: authData.access_token
            }
          },
          profile: user
        };
          
        break;

      case 'facebook': 

        return {
          query: {
            provider: service,
            identifier: user.id,
            protocol: 'oauth2',
            tokens: {
              accessToken: authData.authResponse.accessToken
            }
          },
          profile: user
        };

        break;
    }

  },


  // Must return a basic user object to be sent on the server (name, email, etc...)
  //
  // // example :
  // profile: {
  //   "id": user.id,
  //   "displayName": user.name,
  //   "name": { 
  //     "familyName": user.family_name, 
  //     "givenName": user.given_name 
  //   },
  //   "emails": [ { "value": user.email } ],
  //   "_raw": JSON.stringify(user),
  //   "_json": user
  // }
  _getUser: function(service, authData) {

    var deferredUser = $.Deferred();

    switch (service) {

      case 'google':
        // get the user data with a `native` call to gapi
        gapi.client.load('oauth2', 'v2', function() {
          var request = gapi.client.oauth2.userinfo.get();

          request.execute(function(user) {
            user = user.result; // google trickery
            // Resolve the promise and pass data to _getPassport
            deferredUser.resolve(service, {
              "id": user.id,
              "displayName": user.name,
              "name": { 
                "familyName": user.family_name, 
                "givenName": user.given_name 
              },
              "emails": [ { "value": user.email } ],
              "_raw": JSON.stringify(user),
              "_json": user
            }, authData);

          });

        });
        break;

      case 'facebook':
        // get the user with a standard /me graph call
        FB.api('/me', function(user) {
          console.log('Successful login for: ', user);
          deferredUser.resolve(service, {
              "id": user.id,
              "displayName": user.name,
              "name": { 
                "familyName": user.first_name, 
                "givenName": user.family_name 
              },
              "emails": [ { "value": user.email } ],
              "_raw": JSON.stringify(user),
              "_json": user
            }, authData);
        });

        break;
    }

    return deferredUser.promise();
  }

};