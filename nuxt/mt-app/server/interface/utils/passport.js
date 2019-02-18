import passport from 'passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async (username, password, done) => {
  
}))
