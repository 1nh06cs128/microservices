import UserRepository from "../database/repository/user-repo.js"
import { FormateData } from "../utils/index.js"
import { customLogger } from "../utils/custom-logger.js"
import docClient from '../database/doc-client.js'

// All Business logic will be here
class UserService {

    constructor() {
        customLogger('User Service Constructor');
        this.UserRepository = new UserRepository(docClient);
    }

    async CreateUser(user) {
        customLogger('CreateUser');
        const userResult = await this.userRepo.createUser(user)
        return FormateData(userResult);
    }

    async GetUsers() {
        customLogger('GetUsers');
        const users = await this.UserRepository.getAllUsers();
        customLogger(users);
        return FormateData(users);
    }

    async GetUserById(userId) {
        customLogger('GetUserDescription');
        const user = await this.UserRepository.getUserById(userId);
        return FormateData(user)
    }

    async updateUserById(userId) {
        customLogger('GetUserDescription');
        const user = await this.UserRepository.updateUserById(userId);
        return FormateData(user)
    }

    async deleteUserById(userId) {
        customLogger('GetUserDescription');
        const user = await this.UserRepository.deleteUserById(userId);
        return FormateData(user)
    }

}

export default UserService;