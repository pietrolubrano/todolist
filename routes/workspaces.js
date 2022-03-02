const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const WorkSpace = require('../models/Workspace');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
    const workspaces = await WorkSpace.find({ admin: req.user.id })

    res.status(200).json({ workspaces })
})

router.post('/create', auth, async (req, res) => {
    const { name, lists } = req.body

    const workspace = await WorkSpace.create({ admin: req.user.id ,name, lists })

    User.findByIdAndUpdate(
        req.user.id,
        { $push: { workspacesIds: workspace._id }}
    )
    .then( user => res.json({ msg: 'spazio creato' }))
    .catch( err => res.json({ errors: [
            { msg: 'Impossibile creare lo spazio di lavoro' }
        ]})
    )
    
    /* CANCELLARE WORKSPACE SE FALLISCE CREAZIONE ? */
})

router.post('/update', auth, async (req, res) => {
    
    const { id, lists } = req.body

    WorkSpace.findByIdAndUpdate(
        id,
        { $set: { lists: lists } },
        { new: true }
    )
    .then( workspace => res.json({ msg: 'updated' }))
    .catch( err => res.json({ errors: [
            { msg: 'Impossibile salvare' }
        ]})
    )

})

module.exports = router