import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';
import Axios from 'axios';
import { useAuth } from "./context/AuthContext.jsx";

const drawerWidth = 240;
const navItems = ['Login', 'Register'];

const items = {
  Login: '/login',
  Register: '/register',
}

function DrawerAppBar(props) {
  const { window } = props;
  const { currentUser, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [electronicsFiltered, setElectronicsFilteredProducts] = useState([]);
  const URL = "http://localhost:8000/api/v1";

  const filterDataByCategory = (category) => {
    return products.filter(item => item.category === category);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    Axios.get(URL + "/products").then(res => {
      console.log(res)
      return res.data;
    }).then(async data => {
      setProducts(data);
      const electronicsFiltered = filterDataByCategory("Electronics");
      await setElectronicsFilteredProducts(electronicsFiltered);
      console.log(electronicsFiltered);
    })
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" fontFamily={"monospace"} sx={{ my: 2 }}>
        A3-Products
      </Typography>
      <Divider />
      <List>
        {currentUser ? <ListItemButton onClick={logout}>
          <ListItemText primary="Logout" />
        </ListItemButton> : navItems.map(
          (item) => {
            return <Link to={items[item]} key={item}>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          }
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar  >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            fontFamily={"monospace"}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            A3-Products
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {currentUser ? <ListItemButton onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItemButton> : navItems.map(
              (item) => {
                return (
                  <Link to={items[item]} key={item}>
                    <Button fontFamily={"monospace"} sx={{ color: '#fff' }}>{item}</Button>
                  </Link>
                );
              }
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">

        <Toolbar />

        {electronicsFiltered.map((item) => {

          return <div className="ele" key={item._id}>
            <h1>{item.title}</h1>
            <h2>{item.price.amount}</h2>
            <h3>{item.description}</h3>
            <img
              src={item.images[0]}
              alt={item.title}
              loading="lazy"
              width={100}
            />
          </div>
        }
        )}
      </Box>


    </Box>

  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;