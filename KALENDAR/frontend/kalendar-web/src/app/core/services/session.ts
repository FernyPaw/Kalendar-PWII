import { Injectable } from '@angular/core';

export type UserRole = 'cliente' | 'cafeteria' | 'admin';

export type CafeStatus = 'pending' | 'approved' | 'rejected';

export interface SessionUser {
  name: string;
  username: string;
  role: UserRole;
  profileImage: string;
  cafeStatus?: CafeStatus;
}

@Injectable({
  providedIn: 'root'
})
export class Session {
  currentUser: SessionUser | null = null;

  approvalMessageShown = false;

  logout(): void {
    this.currentUser = null;
    this.approvalMessageShown = false;
  }
}