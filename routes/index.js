const express = require('express');
const router = express.Router();
const Link = require('../models/link')

router.get('/', async (req, res)=>{
    res.render('index.ejs')
})

router.get('/:slug', async (req, res)=>{
    const link = await Link.findOne({slug: req.params.slug})

    if (link){
        link.clicks +=1
        link.save()
        res.redirect(link.long_url)
    }else{
        res.status(404).render('404.ejs')  
    }
})

module.exports = router;