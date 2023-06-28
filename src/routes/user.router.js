import { Router } from "express";
import userService from "../dao/user.service.js";
import { hashPassword, comparePassword } from '../utils/encript.js';

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    const userData = {...req.body,password: hashPassword(req.body.password)};
    try {
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error : error.message});
    }
});


usersRouter.post('/auth', async (req, res) =>{
    const { email, password } = req.body;
    try {
        const user = await userService.getByEmail(email);
        if(!user) throw new Error('Invalid data');
        if(!comparePassword(user, password)) throw new Error('Invalid data');
        req.session.user = user;
        res.status(200).json(user);
        res.redirect('/product');
    } catch (error) {      
        res.status(400).json({ error: error.message});
    }
});





usersRouter.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged Out'});

});



usersRouter.post('/restore-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await userService.getByEmail(email);
        if (!user) throw new Error('User not found');
        const hashedPassword = hashPassword(newPassword);
        user.password = hashedPassword;
        await userService.updateUser(user);
        res.status(200).json({ message: 'Password restored successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default usersRouter;