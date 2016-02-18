import { Router } from 'express';
import { User } from '../models';

const router = new Router();

router.route('/:id')
.get((req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).json({
                error: 'Could not find user',
                status: 404,
            });
        }
        return res.json({ user });
    });
});

export default router;
