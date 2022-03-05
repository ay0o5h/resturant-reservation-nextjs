import { GlobalOutlined } from '@ant-design/icons';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Popover } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import avatarProfile from "../../public/images/avatar.svg";
import logo from "../../public/images/logo2.svg";
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Reservation', 'Logout',];
const language = ['EN', 'AR'];
const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    const Router = useRouter();
    useEffect(() => {
        const token = Cookies.get("token");
        const user = Cookies.get("user");
        setUser(JSON.parse(user))
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
        console.log(v)
    }
    const content = (

        <div>
            {language.map((l) => (
                <p key={l} style={{ cursor: 'pointer' }} onClick={() => handleLanguage(l)} >
                    {l}
                </p>
            ))}

        </div>
    );
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <div className="logoDiv">
                            <Image className="logo" src={logo} width="40px" height="40px" />
                            <h1>reservtable</h1>
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
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>


                    {!token ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Link href="/login">
                                <a className="btn-login">login</a>
                            </Link>
                            <Popover trigger="click" style={{ marginTop: '10px' }} placement="bottom" content={content}>
                                <GlobalOutlined style={{ color: '#398AB9', fontSize: '30px', marginLeft: '15px', paddingTop: '10px' }} />
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
                                sx={{ mt: '45px' }}
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
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Reservation</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>

                            </Menu>
                            <Popover trigger="click" placement="bottom" content={content}>
                                <GlobalOutlined style={{ color: '#398AB9', fontSize: '30px', marginLeft: '15px' }} />
                            </Popover>
                        </Box>
                    )}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;