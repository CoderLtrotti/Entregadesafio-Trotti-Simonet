import userModel from './models/users.model.js';
import bcrypt from 'bcrypt';

class UserService {
constructor() {
    this.model = userModel;
    }

    async getALL() {
        return await this.model.find();
    }

    async getByEmail(email) {
        return await this.model.findOne({ email: email});
    }

    async createUser(userData) {
        return await this.model.create(userData);
    }
    async getById(id) {
        return await this.model.findById(id);
    }
}


const userService = new UserService() ;
export default userService;


