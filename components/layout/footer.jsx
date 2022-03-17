import { translate } from '../../translate';
const Footer = () => {
    return (
        <div className="footer">
            <hr />
            <p style={{ textAlign: `${langs === 'en' ? 'left' : 'right'}` }} >&copy; 2021 {" "}{translate[langs]["footer"]} </p>
        </div>
    );
};
export default Footer;