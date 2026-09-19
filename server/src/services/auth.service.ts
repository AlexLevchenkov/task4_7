class AuthService {
  async login(data: { email: string; password: string }) {
    return {
      email: data.email,
      uid: 'firebase-user',
    };
  }

  async register(data: { email: string; password: string; confirmPassword?: string }) {
    return {
      email: data.email,
      uid: 'firebase-user',
    };
  }

  async logout(_userId: string): Promise<void> {
    return;
  }

  async refreshToken(_userId: string): Promise<string> {
    return 'firebase-id-token';
  }
}

export default new AuthService();