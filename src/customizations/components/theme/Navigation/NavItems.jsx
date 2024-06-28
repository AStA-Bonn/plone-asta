import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button } from 'semantic-ui-react';

import NavItem from '@plone/volto/components/theme/Navigation/NavItem';

import './dropdownmenu.css';

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
            <NavItem item={dropdownitem} lang={lang} style={{ padding: '1rem', marginBottom: '2rem', fontSize: '1rem' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const NavItems = ({ items, lang, closeMenu }) => {
  const handleItemClick = (e, { name }) => {
    closeMenu();
    var dropdownmenu = document.getElementsByClassName('hamburger hamburger--spin is-active');
    dropdownmenu.length > 0 && dropdownmenu[0].classList.remove('is-active');
    var dropdownmenuitems = document.getElementsByClassName('mobile-menu');
    dropdownmenuitems.length > 0 && dropdownmenuitems[0].classList.remove('mobile-menu-enter-done');
    dropdownmenuitems.length > 0 && dropdownmenuitems[0].classList.add('mobile-menu-exit', 'mobile-menu-exit-active');
  };

  // shift operates on the array. Copy array to prevent overwriting the global array
  items = [...items];
  items.shift();
  return (
    <>
      <div className="computer large screen widescreen only">
        <div className="flexTop">
          {items.map((item) =>
            item && item.items && item.items.length > 0 ? (
              <Dropdown text={item.title} className="item" id="dropdown-menu" key={item.url}>
                <Dropdown.Menu key={item.url}>
                  {item.items.map((dropdownitem) => (
                    <Dropdown.Item
                      onClick={handleItemClick}
                      value={dropdownitem.title}
                      text={dropdownitem.title}
                      key={dropdownitem.url}
                      // closeOnChange={true}
                      as={Link}
                      to={dropdownitem.url === '' ? '/' : dropdownitem.url}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <NavItem item={item} lang={lang} key={item.url} />
            ),
          )}
        </div>
      </div>
      <div className="mobile tablet only mobile-dropdown">
        {items.map((item) =>
          item && item.items && item.items.length > 0 ? (
            <DropdownMobileMenu key={item.url} item={item} lang={lang} close={() => closeMenu()} />
          ) : (
            <div
              key={item.url}
              onClick={() => {
                closeMenu();
              }}
              style={{ marginBottom: '1rem', width: '100%', display: 'flex', justifyContent: 'center', fontSize: '1rem !important' }}
            >
              <NavItem item={item} lang={lang} style={{ fontSize: '1rem' }} />
            </div>
          ),
        )}
      </div>
    </>
  );
};

export default NavItems;
