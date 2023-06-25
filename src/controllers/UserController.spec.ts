import { UserController } from "./UserController";
import { User, UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers :jest.fn(),
        deleteUser : jest.fn(),
        db: [
            {
                name: 'Nath',
                email: 'nath@test.com'
            }
        ]
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath2',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve Retornar um erro caso usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório'})
    })

    it('Deve Retornar um erro caso usuário não informe o e-mail', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email:  ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! e-mail obrigatório'})
    })

    it('Retorna todos os usuários', () => {
        const mockRequest = {
            body: {}
        } as Request

        const jsonResponse = userController.userService.getAllUsers();
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toBe(jsonResponse)
    })

    it('Apaga um usuário do banco de dados', () => {
        const mockRequest = {
            body: {
                name: 'Nath'
            }
        } as Request
        
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado'})
    })

    it('Deve Retornar um erro caso usuário não informe o name - Delete', () => {
        const mockRequest = {
            body: {
                name: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório'})
    })

})
