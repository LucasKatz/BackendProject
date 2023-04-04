export const renderChat = (req, res) => {
    req.role !== "user" ? res.status(401).send("Usuario no autorizado"):null;
    res.render("chat", { title: "Chat" });
  }