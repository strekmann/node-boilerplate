import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.route('/:id')
.get((req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(404).json({
                error: 'Could not find user',
            });
        }
        return res.json({ user });
    });
});

export default router;
