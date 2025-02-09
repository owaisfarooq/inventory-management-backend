import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { ProductRoute } from './routes/ProductRoute';
import { OrderRoute } from './routes/OrderRoute';
import { UserRoute } from './routes/UserRoute';
import { TransactionRoute } from './routes/TransactionRoute';
import { SupplierRoute } from './routes/SupplierRoute';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Inventory Management System Backend');
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

app.get('/health', async (req: Request, res: Response) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({ message: 'Database connection successful' });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ message: 'Database connection failed' });
    }
});  

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;