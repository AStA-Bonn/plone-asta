import { useState } from 'react';
import './mobilemenu.css';
import { NavLink, useHistory } from 'react-router-dom';

const DropdownMobileMenu = ({ item, lang, close }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="dropdown-container" key={item.url}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          basic
          onClick={(e) => {
            setIsOpen(!isOpen);
            e.preventDefault();
          }}
          className="dropdown-button"
        >
          <p className="dropdown-button-text">{item.title}</p>
        </Button>
      </div>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        {item.items.map((dropdownitem) => (
          <div
            key={dropdownitem.url}
            onClick={() => {
              close();
            }}
          >
            <NavItem className="navItem" item={dropdownitem} lang={lang} style={{ padding: '1rem', marginBottom: '2rem', fontSize: '1rem' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export function MobileMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  console.log(props);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const history = useHistory();

  const toggleSubMenu = (pageIndex) => {
    if (openSubMenu === pageIndex) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(pageIndex);
    }
  };

  const { items, closeMenu } = props;

  const nav = (url) => {
    history.push(url);
    closeMenu();
  };

  console.log(props);
  return (
    <div className="menu-list">
      {items.map((page, i) => (
        <div className="menu-item" style={{ padding: '1rem' }} key={page.url}>
          <span className="menu-toggle" onClick={() => (page.items.length > 0 ? toggleSubMenu(i) : nav(page.url))}>
            <span>{page.title}</span>
            {page.items.length > 0 && <span className="submenu-indicator">{openSubMenu === i ? '▲' : '▼'}</span>}{' '}
          </span>
          {openSubMenu === i && page.items.length > 0 && (
            <ul className="submenu-list">
              {page.items.map((subpage, subIndex) => (
                <li key={subIndex} className="submenu-item" onClick={() => nav(subpage.url)}>
                  {subpage.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
