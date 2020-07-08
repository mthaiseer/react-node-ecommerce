const Category = require('../models/category');
const { errorHandler} = require('../helpers/dbErrorHelper')


exports.findCategoryById = (req, res) => {
      res.json(req.category);
}

exports.findAllCategory =  async (req, res) =>{

    try{

        const data  = await  Category.find();
        if(!data) return res.json({error : 'No category found'})
        return res.json({data})

     }catch(e){
        res.status(400).json({
            error: errorHandler(e)
        })
     }
  
}

exports.updateCategory = async (req, res) =>{
     const {name} = req.body;
     const category =  req.category;
     category.name =  name;

     try{

        const data  = await category.save();
        return res.json({data})

     }catch(e){
        res.status(400).json({
            error: errorHandler(e)
        })
     }

}

exports.deleteCategory  = async (req, res) =>{

    const category  = req.category;

    try{

        const data  = await category.remove();
        return res.json({"message" : "Category removed successfully !!!" })

     }catch(e){
        res.status(400).json({
            error: errorHandler(e)
        })
     }


}
 
exports.categoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id);
        if(!category){
            return res.json({ error : 'Category not found'  })
        }
        req.category = category;
    } catch (e) {
        res.status(400).json({
            error:  'Category not found'
        })
    }
    next();
}

exports.createCategory = async (req, res) => {

    const category = new Category(req.body);
    try {
        const data = await category.save();
        res.json({
            data
        })
    } catch (e) {
        res.status(400).json({
            error: errorHandler(e)
        })
    }
}