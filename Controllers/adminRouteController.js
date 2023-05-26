import userModel from "../DAO/models/userModel.js";



export const paginatedUsers = async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || 1;
    let query;
    let prevURL;
    let nextURL;
  
    const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  
    try {
      const listUsers = await userModel.paginate({}, {
        page: page || 1,
        limit: limit,
        sort: { first_name: sort },
        lean: true
      });
  
      query = {};
  
      const response = listUsers.docs;
      const totalPages = listUsers.totalPages;
      const prevPage = listUsers.prevPage;
      const nextPage = listUsers.nextPage;
      const currentPage = listUsers.page;
      const hasPrevPage = listUsers.hasPrevPage;
      const hasNextPage = listUsers.hasNextPage;
  
      if (hasPrevPage) {
        prevURL = url.replace(`page=${currentPage}`, `page=${prevPage}`);
      }
  
      if (hasNextPage) {
        nextURL = url.replace(`page=${currentPage}`, `page=${nextPage}`);
      }
  
      res.render("listOfUsers", {
        users: response,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        currentPage: currentPage,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevURL,
        nextLink: nextURL
      });
    } catch (err) {
      console.error('Error al obtener los usuarios', err);
      res.status(500).send('Error al obtener los usuarios');
    }
  };
  