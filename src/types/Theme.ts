export interface Theme {
  id: string;

  name: string;

  author?: string;

  version?: string;

  colors: {
    background: string;

    surface: string;

    primary: string;

    secondary: string;

    text: string;

    textSecondary: string;

    accent: string;

    danger: string;
  };

  assets: {
    wallpaper?: string;

    logo?: string;

    cursor?: string;

    sounds?: string;

    music?: string;
  };

  typography: {
    fontFamily: string;

    titleSize: number;

    textSize: number;
  };
}