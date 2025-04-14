"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManager = exports.createManager = exports.getManager = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        const manager = yield prisma.manager.findUnique({
            where: { cognitoId },
        });
        if (manager) {
            res.json(manager);
        }
        else {
            res.status(404).json({ message: "Manager not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving manager: ${error.message}` });
    }
});
exports.getManager = getManager;
const createManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const manager = yield prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });
        res.status(201).json(manager);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating manager: ${error.message}` });
    }
});
exports.createManager = createManager;
const updateManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        const updateManager = yield prisma.manager.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber,
            },
        });
        res.json(updateManager);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error updating manager: ${error.message}` });
    }
});
exports.updateManager = updateManager;
