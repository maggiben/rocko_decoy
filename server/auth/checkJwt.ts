import { Request, Response, NextFunction } from 'express';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    // TODO parse oauth token
    const placeholderToken = 'super-cali-fragil-istic-expi-ali-doscious';

    if(token === placeholderToken) {
        next();
    } else {
        res.status(401).send('Unauthorized: Invalid token'); // Token is invalid
      }
  } else {
    // If the Authorization header is missing or doesn't have a Bearer token, return a 401 Unauthorized response
    res.status(401).send('Unauthorized');
  }
};

export default checkJwt;
