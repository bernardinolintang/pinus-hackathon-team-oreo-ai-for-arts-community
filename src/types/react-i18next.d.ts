// Type declarations for react-i18next
declare module 'react-i18next' {
  import { ComponentType } from 'react';
  
  export interface UseTranslationResponse {
    t: (key: string, options?: any) => string;
    i18n: any;
    ready: boolean;
  }
  
  export function useTranslation(namespace?: string): UseTranslationResponse;
  
  export const Trans: ComponentType<any>;
  export const Translation: ComponentType<any>;
  export const I18nextProvider: ComponentType<any>;
}

