export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: User;
  weak_password: string | null; 
}

interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    phone: string;
    confirmed_at: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    is_anonymous: boolean;
  }