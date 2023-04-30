import { changeRol } from "../Controllers/premiumRol";

const premiumRouter = express.Router();

premiumRouter.put('/api/users/premium/:uid', changeRol)

export default premiumRouter