import express from 'express';

import { ensureAuthenticated } from '../lib/middleware';
import { User } from '../models';

const router = express.Router();

router.route('/account')
.all(ensureAuthenticated)
.put((req, res, next) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            return res.status(404).json({
                error: 'Could not find user',
            });
        }

        /*
        req.assert('user.username', 'username is required').notEmpty();
        req.assert('user.name', 'name is required').notEmpty();
        req.assert('user.email', 'valid email required').isEmail();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                errors,
            });
        }
        */

        user.username = req.body.user.username;
        user.name = req.body.user.name;
        user.email = req.body.user.email;
        user.save((saveErr) => {
            if (saveErr) { return next(saveErr); }

            return res.json({ user });
        });
    });
});

export default router;
