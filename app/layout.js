import "styles/globals.css";
import { Poppins, Aboreto } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { MainMenu } from "components/MainMenu";
import { getMenu } from "utils/getMenu";

config.autoAddCss = false;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-poppins"
});

const aboreto = Aboreto({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-aboreto"
});

export default async function RootLayout({ children }) {
  const data = await getMenu();

  return (
    <html className={`${poppins.variable} ${aboreto.variable}`} prefix="og: http://ogp.me/ns#" lang="fr-CA">
    <head>
      <link rel="profile" href="https://gmpg.org/xfn/11" />
    </head>
    <body className="font-body">
    <MainMenu items={data.mainMenuItems} callToActionButton={data.callToActionButton} />
    {children}
    </body>
    </html>
  );
}