export interface Theme {
  colors: {
    main: string;
  };
  spacing: (factor: number) => string;
}
