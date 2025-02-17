import bcrypt from 'bcryptjs';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ProductRoute } from './routes/ProductRoute';
import { OrderRoute } from './routes/OrderRoute';
import { UserRoute } from './routes/UserRoute';
import { TransactionRoute } from './routes/TransactionRoute';
import { SupplierRoute } from './routes/SupplierRoute';
import errorHandler from './middleware/errorHandler';
import AppError from './utils/AppError';
import AuthService from './AuthService';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Inventory Management System Backend');
});

app.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.body['email'];
    const password = req.body['password'];
    if (!email || !password) {
      return next(new AppError('Email and password are required', 400));
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError('Invalid credentials', 401));
    }

    const token = AuthService.generateToken(user.id);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
});

const orderRoute = new OrderRoute();
app.use('/api/Order', orderRoute.getRouter());

const productRoute = new ProductRoute();
app.use('/api/Product', productRoute.getRouter());

const supplierRoute = new SupplierRoute();
app.use('/api/Supplier', supplierRoute.getRouter());

const transactionRoute = new TransactionRoute();
app.use('/api/Transaction', transactionRoute.getRouter());

const userRoute = new UserRoute();
app.use('/api/User', userRoute.getRouter());

app.get('/health', async(req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ message: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Error handling middleware
app.use(errorHandler);
app.use(errorHandler);

export default app;