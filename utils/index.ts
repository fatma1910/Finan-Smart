const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };
  
  import { drizzle } from 'drizzle-orm/neon-http';
const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL!);
  export default formatNumber;