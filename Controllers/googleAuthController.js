// Importa los módulos necesarios
import userModel from "../DAO/models/userModel.js"; // Cambia esto según tu modelo de usuario

// Controlador para el callback de Google
export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    // Intercambia el código de autorización por un token de acceso
    const accessTokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: 'authorization_code'
      })
    });
    
    const accessTokenData = await accessTokenResponse.json();
    const { access_token } = accessTokenData;

    // Obtén los datos del usuario desde Google con el token de acceso
    const userProfileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const userProfileData = await userProfileResponse.json();
    const email = userProfileData.email;

    // Busca al usuario en tu base de datos por su correo electrónico
    let user = await userModel.findOne({ email });
    console.log(user)

    if (!user) {
      // Crea un nuevo usuario si no existe
      const newUser = {
        first_name: userProfileData.given_name,
        last_name: userProfileData.family_name,
        email: email,
        age: 0,
        rol: "user",
        cartID: "", // Asigna el ID del carrito si es necesario
      };

      user = await userModel.create(newUser);
    }

    // Aquí puedes generar un JWT si lo necesitas para la autenticación

    // Redirige al usuario a la página deseada (por ejemplo, a /products)
    const redirectUrl = req.query.redirect || '/products';
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Google Authentication Error:", error);
    // Maneja el error de autenticación de Google aquí
    // Redirige a una página de error o realiza alguna otra acción
    res.redirect("/login");
  }
};

