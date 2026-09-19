import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';
import prisma from 'config/database';

const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      return;
    }

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp();
      return;
    }

    console.warn('Firebase Admin is not configured. Auth middleware will reject all requests.');
  }
};

initializeFirebaseAdmin();

export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      data: null,
      message: 'Unauthorized: missing Firebase token',
    });
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin not initialized');
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    await prisma.user.upsert({
      where: { id: decodedToken.uid },
      update: { login: decodedToken.email ?? decodedToken.uid },
      create: {
        id: decodedToken.uid,
        login: decodedToken.email ?? decodedToken.uid,
        passwordHash: '',
        salt: '',
      },
    });

    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email ?? decodedToken.uid,
    };

    next();
  } catch (error) {
    res.status(401).json({
      data: null,
      message: 'Unauthorized: invalid Firebase token',
    });
  }
};
