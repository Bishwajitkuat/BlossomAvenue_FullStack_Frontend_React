export interface LoginResponseDto {
  isAuthenticated: boolean;
  userRole: string;
  token: string;
}
