export enum UserRole {
  Admin = "Admin",
  Employee = "Employee",
  Customer = "Customer",
}

export interface LoginResponseDto {
  isAuthenticated: boolean;
  userRole: UserRole;
  token: string;
}
