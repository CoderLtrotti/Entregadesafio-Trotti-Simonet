import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import userService from '../dao/user.service.js';


const initializePassport = () => {
    passport.use(
        'github', 
        new GitHubStrategy(
            {
            clientID:'Iv1.b918d72caea3389c',
            clientSecret:'f72da97f3bfaf5c6ccd4399febfa81a04b9ef9b3',
            callbackURL:'http://localhost:8080/api/sessions/githubcallback',   
            }, 
            async (accessToken, refreshToken, profile, done) => {
                try {
                console.log(profile);
                let user = await userServices.getByEmail(
                    profile._json.email
                );
                if(!user){
                    let newUser = {
                        first_name: profile._json.name,
                        last_name:'',
                        email: profile._json.email,
                        password:'',
                        img: profile._json.avatar_url,
                    };
                    user = await userServices.createUser(newUser);
                    done(null,user);
                 }  else{ 
                    done(null, user);
                }        
            }   catch (error) {
                    done (error, false);
             }
         
            }      
        )    
     );
    
    passport.serializeUser ((user, done) => {
        done (null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getById(id);
        done(null, user);
    });
};
export default initializePassport;

