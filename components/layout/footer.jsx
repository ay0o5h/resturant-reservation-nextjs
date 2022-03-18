import { translate } from '../../translate';
import { langs } from './navbar';
const Footer = () => {
    return (
        <div className="footer">
            <hr />

            <center><p  ><span style={{ textAlign: `${langs === 'en' ? 'left' : 'right'}` }}>&copy; 2021 {" "}</span>{translate[langs]["footer"]} </p></center>
        </div>
    );
};
export default Footer;