import session from 'express-session';
import MongoStore from 'connect-mongo';

export const createSessionConfig = () => {
  const mongoUrl = process.env.MONGODB_URI;
  
  if (!mongoUrl) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  return session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    }
  });
};