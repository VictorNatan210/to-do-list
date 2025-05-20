import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getAll(): string[] | null {
    if (this.isBrowser) {
      const tasks: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key === "index") {
          continue;
        }
        if (key) {
          const value = window.localStorage.getItem(key);
          if (value !== null) {
            tasks.push(value);
          }
        }
      }
      return tasks;
    }
    return null;
  }

  taskExists(task: string): boolean {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith("task_")) {
        const value = window.localStorage.getItem(key);
        if (value?.trim().toLowerCase() === task.trim().toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  get(key: string): string | null {
    if (this.isBrowser) {
      return window.localStorage.getItem(key);
    }
    return null;
  }

  set(key: string, value: string): void {
    if (this.isBrowser) {
      window.localStorage.setItem(key, value);
    }
  }

  remove(key: string): void {
    if (this.isBrowser) {
      window.localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser) {
      window.localStorage.clear();
    }
  }
}