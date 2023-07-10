class AuthService {
  login(token: string): void {
    // Set the authentication token in localStorage
    localStorage.setItem('token', token);
  }

  logout(): void {
    // Remove the authentication token from localStorage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

const authService = new AuthService();
export default authService;
