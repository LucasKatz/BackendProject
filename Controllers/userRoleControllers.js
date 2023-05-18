import userModel from "../DAO/models/userModel.js"


export const changeRol = async (req, res) => {
    try {
      const user = req.session.user;
      const userId = user._id; 

      // Comprobación de la existencia del usuario
        const response = await userModel.findById(userId)
        if (!response) {
        res.status(404).json({ status: "error", message: "El usuario no está registrado" });
        return;
        }

      // Comprobación de rol del usuario
        if (response.rol === "Admin") {
        res.status(400).json({ status: "error", message: "El usuario tiene el rol de Administrador, por lo tanto no es posible realizar el cambio de rol" });
        return;
    }

      // Acciones para realizar el cambio de rol del usuario
    if (response.rol === "Premium") {
        await userModel.findByIdAndUpdate(userId, { rol: "Usuario" });
        let result = await userModel.findById(userId);
        console.log(result)
        res.status(200).json({ status: "success", payload: result });
    } else {
        await userModel.findByIdAndUpdate(userId, { rol: "Premium" });
        let result = await userModel.findById(userId);
        console.log(result)
        res.status(200).json({ status: "success", payload: result });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
};

export default changeRol