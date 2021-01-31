const passport = require('passport'); // Import passport
const axios = require('axios'); // Import axios
const https = require('https'); // Import https

const JWTstrategy = require('passport-jwt').Strategy; // Import JWTstrategy
const ExtractJWT = require('passport-jwt').ExtractJwt; // Import ExtractJWT

// Axios intance for request
const axiosRequest = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false // Pass SSL certificate
  })
});

passport.use(
  'user',
  new JWTstrategy({
      secretOrKey: 'secret_password', // It must be same with secret key when created token
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // It will extract token from req.header('Authorization')
      passReqToCallback: true // Enable req for next step function
    },
    async (req, token, done) => {
      try {
        // Get user info authorization from another service
        let getUser = {
          method: 'get',
          url: 'https://soka.kuyrek.com:3005/authorization',
          headers: {
            'Authorization': req.header('Authorization')
          }
        };

        // Get response for getUser request
        let response = await axiosRequest(getUser);

        // Get user data from the response
        let userLogin = response.data.user;
        console.log(userLogin);

        // If user is not found, it will make Unauthorized and make a message
        if (!userLogin) {
          return done(null, false, {
            message: 'User not found!'
          })
        };
        
        // If user role is not user, it will make Unauthorized and make a message
        if (!userLogin.role.includes('user')) {
          return done(null, false, {
            message: "Unauthorized!"
          });
        }

        // If success, it will return userLogin variable that can be used in the next step
        return done(null, token.user, {
          message: "Authorized!"
        });
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: "Unauthorized!"
        });
      }
    }
  )
);

passport.use(
  'superUser',
  new JWTstrategy({
      secretOrKey: 'secret_password', // key for jwt
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // extract token from authorization
    },
    async (token, done) => {
      // find user depend on token.user.email
      const userLogin = await user.findOne({

        email: token.user.email

      })

      // if user.role includes transaksi it will next
      if (userLogin.role.includes('superUser')) {
        return done(null, token.user)
      }

      // if user.role not includes transaksi it will not authorization
      return done(null, false)
    }
  )
)
