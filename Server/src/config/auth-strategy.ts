import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../mongoose/schemas/user";
import { comparePassword } from "../utils/bcrypt";
import { IUser, UserRole } from "../types/user";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.serializeUser(function (user: IUser, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id).select(
      "-password -__v -resetPasswordToken -resetPasswordTokenExpires"
    );
    if (!user) {
      return done(null, false);
    }
    done(null, {
      ...(user.toObject() ?? {}),
      _id: user._id.toString(),
      role: user.role as UserRole,
      favorites: user.favorites.map((favorite) => favorite.toString()),
      resetPasswordTokenExpires: user.resetPasswordTokenExpires?.toString(),
      createdAt: user.createdAt?.toString(),
      updatedAt: user.updatedAt?.toString(),
    });
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email: string, password: string, done) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Invalid Credentials!" });
        }

        if (!comparePassword(password, user.password as string)) {
          return done(null, false, { message: "Invalid Credentials!" });
        }

        return done(null, {
          ...(user.toObject() ?? {}),
          _id: user._id.toString(),
          role: user.role as UserRole,
          favorites: user.favorites.map((favorite) => favorite.toString()),
          password: undefined,
          resetPasswordToken: undefined,
          resetPasswordTokenExpires: undefined,
          createdAt: user.createdAt?.toString(),
          updatedAt: user.updatedAt?.toString(),
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });

        console.log("profile", profile);
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails?.[0].value,
            surname: profile.name?.familyName,
            name: profile.name?.givenName,
            password: "google",
            avatar: profile.photos?.[0].value,
            role: UserRole.USER,
          });
          await user.save();
        }

        return done(null, {
          ...(user.toObject() ?? {}),
          _id: user._id.toString(),
          role: user.role as UserRole,
          favorites: user.favorites.map((favorite) => favorite.toString()),
          password: undefined,
          resetPasswordToken: undefined,
          resetPasswordTokenExpires: undefined,
          createdAt: user.createdAt?.toString(),
          updatedAt: user.updatedAt?.toString(),
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user: IUser, done) {
  done(null, user);
});

passport.deserializeUser(async function (user: IUser, done) {
  done(null, user);
});
