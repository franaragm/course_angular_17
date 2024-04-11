export type CookiesStatus = 'pending' | 'rejected' | 'essentials' | 'all';

export type UserStatus = {
  cookies: CookiesStatus;
  isAnonymous: boolean;
  credit: number;
};
