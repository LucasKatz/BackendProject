export const  authMiddleware = async (req,res,next)=>{
    if(req.session?.user != undefined){
    return next()
    }
    return res.status(401).redirect("/login?message=Debe loguearse para acceder a esta seccion")
    
}
export default authMiddleware