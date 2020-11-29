const express = require('express')
const Link = require('../models/link')
const authenticated = require('../middleware/authenticated')

const router = express.Router()

router.get('/', authenticated, async (req, res)=>{
    const user_links = await Link.find({user: req.user})


    res.render('mylinks.ejs', {links: user_links, host: req.get('host')})
})

router.post('/add', authenticated, async (req, res)=>{
    generate_slug = async ()=>{
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        if(await Link.findOne({slug: result})){
            return generate_slug()
        }else{
            return result
        }
    }

    const link = new Link({
        user: req.user,
        slug: await generate_slug(),
        long_url: req.body.url
    })
    link.save()

    res.redirect('/links')
})

router.get('/:slug/copy/success/', authenticated, (req, res)=>{
    req.flash('info', `Your link: ${req.params.slug} has been copied to the clipboard .`)
    res.redirect('/links')
})

router.post('/save/:slug', authenticated, async(req, res)=>{
    const link = await Link.findOne({slug: req.params.slug})

    if(link){
        if (req.user.id == link.user._id){
            if(req.user.custom_slug_perm){
                let slug = req.body.slug
                slug = slug.replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');

                if(slug.length > 35){
                    req.flash('error', 'The max slug length is 35. Try again with a shorter one.')
                    res.redirect('/links')
                    return
                }
                link.slug = slug
            }
            link.long_url = req.body.long_url
            link.save()
            req.flash('success', `Your link: ${link.slug} has been saved.`)
            res.redirect('/links')
        }else{
            res.send(403)
        }
    }else{
        res.send(404)
    }
})

router.post('/delete/:slug', authenticated, async (req, res)=>{
    const link = await Link.findOne({slug: req.params.slug})

    if(link){
        if (req.user.id == link.user._id){
            await link.delete()
            req.flash('success', `Your link: ${link.slug} has been deleted.`)
            res.redirect('/links')
        }else{
            res.send(403)
        }
    }else{
        res.send(404)
    }
})

module.exports = router