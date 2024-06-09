const db = require("../../../database/models");
const { literal } = require('sequelize');
const getOriginUrl = require('../../utils/getOriginUrl');
const { ErrorCustom } = require('../../utils/createError');

module.exports = (req, res) => {
    const { page } = req.query;

    if (!req.query.page) {
        db.user.findAll()
        .then(users => {
            res.status(200).json({
                ok: true,
                data: users
            })
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                msg: 'Error en el servidor'
            })
        })
    } else {
        const { page = "1", limit = "10" } = req.query;
        if(isNaN(+page) || isNaN(+limit)) {
            throw new ErrorCustom(400, 'El formato de página o límite no es válido');
        }
        db.user.paginate({
            page: +page,
            paginate: +limit,
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
        .then(({docs: user, pages, total}) => {
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
        })
        .catch(err =>{
            res.status(500).json({
                ok: false,
                msg: err.message
            })
        })
    }
}