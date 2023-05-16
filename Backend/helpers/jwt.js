const expressJwt = require('express-jwt');


function JwtMiddleware() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            //{url:`${api}/products`,methods:['GET',OPTIONS]},
            {url:/\/api\/v1\/products(.*)/,methods:['GET',OPTIONS]},
            {url:/\/api\/v1\/categories(.*)/,methods:['GET',OPTIONS]},
            `${api}/users/login`,
            `${api}/users/register`,

        ]
    });
}

async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true)
    }
    done();
}

module.exports = JwtMiddleware;
