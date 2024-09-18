"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const authuser_dto_1 = require("./dto/request/authuser.dto");
const users_service_1 = require("./users.service");
const updateUser_dto_1 = require("./dto/request/updateUser.dto");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersController = class UsersController {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async RegisterUser(AuthuserDto) {
        AuthuserDto.password = await bcrypt.hash(AuthuserDto.password, 10);
        return this.usersService.createUser(AuthuserDto);
    }
    async LoginUser(authuserDto, response) {
        const user = await this.usersService.findOneUser(authuserDto.email);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (!await bcrypt.compare(authuserDto.password, user.password)) {
            throw new common_1.BadRequestException("Invalid credentials");
        }
        const jwt = await this.jwtService.signAsync({ id: user.id, userName: user.userName });
        response.cookie('jwt', jwt, { httpOnly: true });
        return user;
    }
    updateUserById(id, updateUserDetails) {
        return this.usersService.updateUser(id, updateUserDetails);
    }
    deleteUserById(id) {
        try {
            return this.usersService.deleteUser(parseInt(id));
        }
        catch (err) {
            throw new common_1.NotFoundException("User not found");
        }
    }
    getAllUsersDetails(request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = this.jwtService.verify(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException("Unauthorized");
            }
            return this.usersService.findUsers();
        }
        catch {
            throw new common_1.UnauthorizedException("Unauthorized");
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authuser_dto_1.AuthenticateUser]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "RegisterUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authuser_dto_1.AuthenticateUser, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "LoginUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_dto_1.updateUser]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsersDetails", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], UsersController);
//# sourceMappingURL=users.controller.js.map