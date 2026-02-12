/**
 * Configurazione di PostCSS.
 * Utilizzato per trasformare il CSS con JavaScript.
 * In questo progetto, viene usato principalmente per integrare Tailwind CSS 4.0
 * nel processo di build del CSS.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
