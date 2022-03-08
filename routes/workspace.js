const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const WorkSpace = require('../models/Workspace');
const User = require('../models/User');

router.get('/:workspaceName', auth, async (req, res) => {

    const { workspaceName } = req.params

    const workspace = await WorkSpace.findOne({ admin: req.user.id, name: workspaceName })
    
    if(workspace){
        return res.json( workspace )
    } else {
        return res.status(404).json({ errors: [
            { msg: 'Workspace inesistente' }
        ]})
    }

})

router.post('/', auth, async (req, res) => {

    const { name } = req.body

    const workspace = await WorkSpace.create({ admin: req.user.id ,name })

    User.findByIdAndUpdate(
        req.user.id,
        { $push: { workspacesIds: workspace._id }}
    )
    .then( user => res.json({ msg: 'spazio creato' }))
    .catch( err => res.status(400).json({ errors: [
            { msg: 'Impossibile creare lo spazio di lavoro' }
        ]})
    )

})

router.put('/:workspaceName', auth, async (req, res) => {

    const { workspaceName } = req.params

    const { workspaceLists } = req.body

    WorkSpace.findOneAndUpdate(
        { admin: req.user.id, name: workspaceName },
        { $set: { lists: workspaceLists }}
    )
    .then( workspace => res.json( workspace ))
    .catch( err => res.status(400).json({ errors: [
            { msg: 'Impossibile creare lo spazio di lavoro' }
        ]})
    )

})



module.exports = router