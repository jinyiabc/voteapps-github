const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const githubAuth = {
		clientID: 'c39cb162d6fe999660eb',
		clientSecret: '26b483950f9919e40c01a44725fb8c338176fec2',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	};


passport.use(new GitHubStrategy(githubAuth,
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

module.exports  = passport;
