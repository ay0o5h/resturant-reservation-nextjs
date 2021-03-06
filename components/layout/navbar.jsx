import { GlobalOutlined } from '@ant-design/icons';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Popover } from "antd";
import Cookies from "js-cookie";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import avatarProfile from "../../public/images/avatar.svg";
import logo from "../../public/images/logo2.svg";


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Reservation', 'Logout',];
const language = ['en', 'ar'];
export const langs = Cookies.get("lang") !== undefined ? Cookies.get("lang") : 'en';
const Navbar = () => {
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const t = useTranslations('home');

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [lang, setLang] = useState("en");
    const Router = useRouter();
    useEffect(() => {
        const token = Cookies.get("token");
        const user = Cookies.get("user");
        if (token) setUser(JSON.parse(user));
        if (token) setToken(token);
        console.log(user)

    }, []);
    const handleLogout = async () => {
        await Cookies.remove("token");
        await Cookies.remove("user");
        Router.reload();
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLanguage = (v) => {
        // localStorage.setItem('lang', JSON.stringify(v));
        Cookies.set("lang", v);
        Router.push("/");
        setLang(() => v)
    }
    const content = (

        <div>
            {/* {language.map((l) => (
                <p key={l} style={{ cursor: 'pointer' }} onClick={() => handleLanguage(l)} >
                    {l}
                </p>
            ))} */}
            <Link
                style={{ color: '#000' }}
                activeClassName={locale === "en"}
                href={asPath}
                locale="en"
            >en</Link>
            <br />
            <Link
                style={{ color: '#000' }}

                activeClassName={locale === "ar"}
                href={asPath}
                locale="ar"
            >ar</Link>

        </div>
    );
    return (
        <div className="nav-dev">
            <AppBar position="static" style={{
                direction: `${locale === "en" ? "ltr" : "rtl"
                    }`
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <div className="logoDiv" >
                                <Image className="logo" src={logo} width="40px" height="40px" />
                                <h1>{t("logo")}</h1>
                            </div>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >

                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        </Box>


                        {!token ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Link href="/login">
                                    <a className="btn-login">{t("login")}</a>
                                </Link>
                                <Popover trigger="click" style={{ marginTop: '20px' }} placement="bottom" content={content}>
                                    <GlobalOutlined style={{ color: '#398AB9', fontSize: '30px', margin: '0 15px', paddingTop: '10px' }} />
                                </Popover>
                            </Box>
                        ) : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={avatarProfile} alt={user.firstName} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px', mx: '10px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{user.firstName}</Typography>
                                    </MenuItem>
                                    <MenuItem >
                                        <Typography textAlign="center"><Link href="/reservation" style={{ color: 'black' }}>{t("Reservation")}</Link></Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">{t("Logout")}</Typography>
                                    </MenuItem>

                                </Menu>
                                <Popover trigger="click" placement="bottom" content={content}>
                                    <GlobalOutlined style={{ color: '#398AB9', fontSize: '30px', marginRight: '7px', marginLeft: '7px' }} />
                                </Popover>
                            </Box>
                        )}

                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default Navbar;