const express = require('express');
const router = express.Router();
const Crud = require('../models/crud');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

//lister
router.get('/', async(req, res) => {
    try {
        const crud=await Crud.find()
        res.json(crud)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})


//afficher une ligne
router.get('/:id',getLine ,(req, res) =>{
    res.json(res.crud)
})

//make a post
router.post('/', async(req, res) =>{
    const nouveau = new Crud({
        "data.prenom":req.body.prenom,
        "data.nom": req.body.nom,
        "data.adresse":req.body.adresse,
        "data.telephone":req.body.telephone
    })
    try {
        const newModel = await nouveau.save()
        res.status(201).json(newModel)
        console.log(newModel);
    } catch (err) {
        res.status(400).json({ message:err.message})
    }
})

//modifier une ligne
router.patch('/:id',getLine, async(req, res,err) =>{
    if (req.body.prenom != null) {
        res.crud.data.prenom = req.body.prenom
        console.log(res.crud.data.prenom);
    }
    
    if (req.body.nom != null) {
        res.crud.data.nom = req.body.nom
    }
    if (req.body.adresse != null) {
        res.crud.data.adresse = req.body.adresse
    }
    
    if (req.body.telephone != null) {
        res.crud.data.telephone = req.body.telephone
    }
      try {
        const updated = await (res.crud).data.save()
        res.json(updated)
        console.log(updated);
      } catch {
        res.status(400).json({ message: err.message })
      }
})

//supprimer une ligne
router.delete('/:id',getLine, async(req, res) =>{
    try {
        await res.crud.remove()
        res.json({ message: 'Deleted!!' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})

async function getLine(req, res, next) {
    try {
         crud = await Crud.findById(req.params.id)
      if (crud == null) {
        return res.status(404).json({ message: 'Pas trouvé'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.crud = crud
    next()
  }

module.exports = router;