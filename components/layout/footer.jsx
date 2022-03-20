import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

const Footer = () => {
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const t = useTranslations('home');

    return (
        <div className="footer">
            <hr />

            <center><p  ><span style={{ textAlign: `${locale === 'en' ? 'left' : 'right'}` }}>&copy; 2021 {" "}</span>{t("footer")} </p></center>
        </div>
    );
};
export default Footer;