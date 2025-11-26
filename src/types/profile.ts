export interface Profile {
    id: number; 
    created_at: string | Date; 
    user_id: string; // auth.users.id 와 매핑
    nickname: string | null; 
    sector: string | null; 
    position: string | null; 
    avatar_url: string | null; 
  }