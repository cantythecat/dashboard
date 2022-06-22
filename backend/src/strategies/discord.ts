import passport from "passport";
import DiscordStrategy from "passport-discord";
import * as config from "../config.json";
import User from "../database/models/User";

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ userId }).exec();
    return user ? done(null, user) : done(null, null);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: config.discord_client.client_id,
      clientSecret: config.discord_client.client_secret,
      callbackURL: config.callback_url,
      scope: ["identify", "guilds"],
    },
    async (acessToken, refreshToken, profile, done) => {
      const { id, username, discriminator, avatar, guilds } = profile;
      try {
        const findUser = await User.findOneAndUpdate(
          { userId: id },
          {
            userTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          },
          { new: true }
        ).exec();
        if (findUser) {
          console.log("User found.");
          return done(null, findUser);
        } else {
          const newUser = await User.create({
            userId: id,
            userTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
