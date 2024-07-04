const db = require('../../database/models')

module.exports = async (req, res) => {

    try {
        const {user: {_json, provider} } = req.session.passport
        const { sub, name, picture, email } = _json;

        const newAdress = await db.address.create({
            street: null,
            city: null,
            province:  null,
            zipCode: null
        })

        const [ user, _] = await db.user.findOrCreate({
            where:{
                socialId: sub
            },
            defaults:{
                socialId: sub,
                provider,
                name,
                email,
                avatar: picture,
                addressId: newAdress.id
            }
        })

        req.session.userLogin = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: "REGULAR"
        };
   
        res.cookie("userLogin", req.session.userLogin, { maxAge: (60000 * 10 ) * 6})

        return res.redirect("/");

    } catch (error) {
        res.json(error)
    }
    
}