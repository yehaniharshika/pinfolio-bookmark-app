import { Lilita_One, Montserrat, Nunito, Rubik_Gemstones } from "next/font/google";

export const nunito = Nunito({
  weight: ['200','300','400','500','600','700','800','900'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
});

export const lilitaOne = Lilita_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lilita',
});

export const rubikGemstones = Rubik_Gemstones({
    weight: ['400'],
    subsets: ["latin"]
})

export const montserrat = Montserrat({
    weight: ['100','200','300','400','500','600','700','800','900'],
    subsets:['latin','latin-ext']
})
