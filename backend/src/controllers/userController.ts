import * as userService from "../services/userService.js";
import { Request, Response } from "express";
import { generateToken } from "../utils/jwt.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(parseInt(req.params.id));
    res.status(200).json({ message: "User deleted" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token, userId: user.id, name: user.name });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
};