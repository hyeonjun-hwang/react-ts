export interface Topic {
    id: number;
    author: string; // 해당 토픽을 작성한 유저의 id
    category: string;
    content: string;
    created_at: string | Date;
    status: string;
    thumbnail: string;
    title: string;
    user_id : string
}
