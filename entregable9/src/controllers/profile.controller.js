import UserService from"../services/dao/users.dao.js"

const userService = new UserService()

export const renderProfile = async (request, response) => {
    try {
      if (!request.isAuthenticated()) {
        return response.status(401).send("Unauthorized: Usuario no autenticado");
      }

      const userEmail = request.user.email;  
      const userToRender = await userService.getUserByEmail(userEmail);
  
      response.render("profile", {
        title: "Perfil",
        userToRender,
        fileCss: "../css/styles.css",
      });
    } catch (error) {
      console.error("Error:", error);
      response.status(500).send("Internal Server Error");
    }
  }