export interface TokenResponse {
  status: string;
  code: number;
  message: string;
  document: Document;
}

export interface Document {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class TokenRequest {
  username: string;
  password: string;
}
