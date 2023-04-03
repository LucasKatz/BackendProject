// Función para verificar el rol del usuario
const checkRole = async (req, res, next, role) => {
    // Aquí puedes obtener el rol del usuario desde una base de datos o algún otro servicio de autenticación
    const userRole = 'admin'; // Ejemplo: el rol del usuario es 'admin'
    
    if (userRole === role) {
      // El usuario tiene el rol requerido, permitir acceso al endpoint
    next();
    } else {
      // El usuario no tiene el rol requerido, devolver respuesta de error
    res.status(403).send('No tienes permisos para acceder a este endpoint');
    }
}

  // Middleware para limitar acceso de acuerdo al rol del usuario
const restrictToRole = (role) => {
    return (req, res, next) => {
    checkRole(req, res, next, role);
    }
}

  // Ejemplo de uso del middleware restrictToRole para limitar acceso a un endpoint
app.get('/admin', restrictToRole('admin'), (req, res) => {
    // Código para el endpoint '/admin' que solo es accesible para usuarios con rol 'admin'
});