exports.GET_ALL_FAV = `Select * from UserFavourites left join Product using(idProduct) where idUser = :idUser`;

exports.DELETE_FAV_BYPRODUCT = `Delete from UserFavourites where idUser = :idUser and idProduct = :idProduct`;