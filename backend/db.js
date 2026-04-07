const mongoose = require('mongoose')

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/makeupDB', {
  // Opciones actuales de Mongoose 9+
  // no se necesitan useNewUrlParser ni useUnifiedTopology
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'))
db.once('open', () => console.log('Conectado a MongoDB correctamente'))

module.exports = mongoose
