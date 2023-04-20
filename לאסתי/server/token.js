const jwt=require("jsonwebtoken");
const { getAllFiles } = require("./dal/file");
const { use } = require("./routes/officer");
const login=(email, password)=>
{
    return new ptomise(async(resolve,reject)=>
    {
        let users=await getAll().then((data)=>{
            return data;
        });

        const user=users.find((u)=>
        {
            return u.email==email&&u.password==password;
        });
        if(user){
            const accessTokensecret="bussinesToken";
            const refreshTokensecret="someRandomStringForRefresh";
            let refreshTokens=[];

            const accessToken=jwt.sign(
                {email:user.email,role:user.role},accessTokensecret//להוסיף
            );
            const refreshToken=jwt.sign(
                {email:user.email,role:user.role},refreshTokensecret
            );
            refreshTokens.push(refreshToken);
            resolve({accessToken,refreshToken});
        }
        else
        reject ("email or password incorrect")
    });
    const authenyicateJWT = (req,res,next)=>
    {
        const authHeader=req.headers.authorization;
        if(authHeader){
            const token=authHeader.split("")[1];
            jwt.verify(token,accessToken,(err,user)=>
            {
                if(err){
                    console.log(err);
                    return res.sendStatus(403);
                }
                req.user=user;
                next();
            });
        } else{
            res.sendStatus(401);
        }
    };

}