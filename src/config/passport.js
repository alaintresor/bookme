import dotenv from 'dotenv';
import passport from 'passport';
import facebookStrategy from 'passport-facebook';
import strategy from 'passport-google-oauth2';

dotenv.config();

const FacebookStrategy = facebookStrategy.Strategy;
const GoogleStrategy = strategy.Strategy;

export const facebookCallBack = (accessToken, refreshToken, user, cb) =>
  cb(null, user);
export const googleCallBack = (request, accessToken, refreshToken, user, cb) =>
  cb(null, user);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
      callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
      passReqToCallback: true,
      profileFields: [
        'id',
        'displayName',
        'email',
        'given_name',
        'family_name',
      ],
    },
    googleCallBack,
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_AUTH_ID,
      clientSecret: process.env.FACEBOOK_AUTH_SECRET,
      callbackURL: process.env.FACEBOOK_AUTH_CALLBACK_URL,
      profileFields: [
        'id',
        'displayName',
        'picture.type(large)',
        'email',
        'first_name',
        'last_name',
        'gender',
      ],
    },
    facebookCallBack,
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
