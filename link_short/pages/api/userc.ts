import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { name, email, password } = req.body
  
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
  
    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
  
    res.status(201).json(newUser)
  }

  