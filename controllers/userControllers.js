import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

const prisma = new PrismaClient();


export const postLogin = async (req, res, next) => {
      try{
            const {email, password} = req.body;
            const user = await prisma.user.findUnique({
                  where: {email}
            });
            if(!user){
                  return res.status(404).json({
                        message: "No email of such exists. Sign up instead"
                  });
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);

            if(!isMatch) {
                  return res.status(401).json({
                        message: "Incorect Password! Try again"
                  });
            }

            const token  = jwt.sign(
                  {
                        userId: user.id,
                        email: user.email
                  },
                  SECRET_KEY,
                  {expiresIn: "1h"}
            );

            return res.status(200).json({
                  message: "Login Succssful!",
                  token,
                  
                  user: {
                        id: user.id,
                        email: user.email
                  }
            });
      }catch(err) {
            console.error(err);
            return res.status(500).json({
                  message: "Something went wrong!"
            })
      }
};

export const postRegister = async (req, res, next) => {
      try{
            const { email, password } = req.body;
            
            const existingUser = await prisma.user.findUnique({
                  where: {email}
            });
            if (existingUser) {
                  return res.status(409).json({
                        error: "Email is already registered"
                  });
            }
            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = await prisma.user.create({
                  data: {
                        email: email,
                        passwordHash: passwordHash
                  }
            });

            res.status(201).json({
                  message: "User created successfully",
                  user: newUser
            });
      }catch(err) {
            console.error(err);
            return res.status(500).json({
                  error: 'Could not create user'
            })
      }
};