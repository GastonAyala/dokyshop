const db = require("../../../database/models");
const { literal } = require('sequelize');
const getOriginUrl = require('../../utils/getOriginUrl');

module.exports = (req, res) =>{
    const { page } = req.query;
    db.user.paginate({
        
        page: +page,
        paginate:10,
            include: [{
                association: "address",
            },
    ],
    attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
        include: [
            [
                literal(`CONCAT('${getOriginUrl(req)}/api/users/', avatar)`),
                'imageAvatarAPI'
            ],
            [
                literal(`CONCAT('${getOriginUrl(req)}/api/users/detail/', user.id)`),
                'detail'
            ]
        ]
    }
        
    })
    .then(({docs: user, pages, total}) =>{
        const nextPage = pages === +page || page > pages ? null : +page + 1;
            const previousPage = +page > 1 && page <= pages ? +page - 1 : null
            res.status(200).json({
                ok: true,
                pages,
                count: total,
                next: nextPage ? getOriginUrl(req) + '/api/users?page=' + nextPage : null,
                prev: previousPage ? getOriginUrl(req) + '/api/users?page=' + previousPage : null,
                data: user
        })
    }).catch(err =>{
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    })

 //   http://localhost:3030/api/users?page=1
}