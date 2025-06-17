export {};

declare global {
  interface Window {
    env: {
      REACT_APP_CUSTOM_ENVIRONMENT: string;
      REACT_APP_BACKEND_API: string;
      REACT_APP_BRAND_NAME: string;
      REACT_APP_BRAND_FULL_NAME: string;
      REACT_APP_BRAND_CONTACT_EMAIL: string;
      REACT_APP_BRAND_LOGO: string;
      REACT_APP_BRAND_DOMAIN_PLACEHOLDER: string;
      REACT_APP_BRAND_LOGO_NAVBAR_WIDTH: string;
      REACT_APP_BRAND_LOGO_NAVBAR_HEIGHT: string;
      REACT_APP_BRAND_LOGO_AUTH_WIDTH: string;
      REACT_APP_BRAND_PUBLIC_FOLDER: string;
    };
  }
}
