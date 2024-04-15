
exports.findUserByUserId = async (obj) => instanceOfSQLServer.execute('SELECT 1 from Users where idUser=:idUser and isActive=1', obj);


