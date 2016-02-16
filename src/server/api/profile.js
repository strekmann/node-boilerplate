import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.route('/:id')
.get((req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed when fetching user',
            });
        }
        if (!user) {
            return res.status(404).json({
                error: 'Could not find user',
            });
        }
        return res.json({ user: user.toObject() });
    });
});

export default router;
