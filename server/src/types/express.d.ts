import type { ISession } from '../models/Session';
import type { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      session?: ISession;
    }
  }
}
