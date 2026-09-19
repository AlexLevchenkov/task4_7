import { Request, Response } from 'express';
import { apiResponse } from 'utils/response';
import authService from 'services/auth.service';

class AuthController {
	async login(req: Request, res: Response): Promise<void> {
		try {
			const token = await authService.login({...req.validated});
			apiResponse(res, { token });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async register(req: Request, res: Response): Promise<void> {
		try {
			const user = await authService.register({...req.validated});
			apiResponse(res, { user }, 201);
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		try {
			await authService.logout(req.user.id);
			apiResponse(res, { message: 'Logged out successfully' });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}

	async refreshToken(req: Request, res: Response): Promise<void> {
		try {
			const newToken = await authService.refreshToken(req.user.id);
			apiResponse(res, { token: newToken });
		} catch (error: any) {
			apiResponse(res, { message: error.message ?? 'An error occurred' }, error.statusCode ?? 500);
		}
	}
}

export default new AuthController();