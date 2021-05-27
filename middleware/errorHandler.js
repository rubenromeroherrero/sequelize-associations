// intervalo entre nuestro servicio y las apps
// centralizar los errores y los podamos controlar

const errorHandler = (error, req, res, next) => {
  // para controlar cuando no haya código de estado, le aplicaríamos el 500
  const status = error.statusCode ?? 500;
  // va a requerir de un código de status y un mensaje de error
  res.status(status).json({ message: error.message });
};

module.exports = errorHandler;
