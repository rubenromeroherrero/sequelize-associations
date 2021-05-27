// cogemos los status_codes de la librería http, nativa de node
const { STATUS_CODES } = require("http");

// SE ENCARGA DE LANZAR LOS ARCHIVOS DE ERROR
// analiza y muestra el código de estado y el mensaje

class HttpError extends Error {
  constructor(statusCode, message) {
    // cogemos lo que trae la clase Error(message)
    super(message);

    // captamos el status code, y si no le pasamos valor, aplica el 500
    this.statusCode = statusCode || 500;
    // captamos el mensaje dado, y si no filtramos el status code que se da
    // para extraer el mensaje correspondiente
    this.message = message || STATUS_CODES[this.statusCode];
  }
}

module.exports = HttpError;
