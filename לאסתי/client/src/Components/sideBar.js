import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
//import { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { classNames } from 'primereact/utils';
import "./a.css";

const SidebarComponent = () => {
  const [visible, setVisible] = useState(false);
  let menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => {
        setVisible(false);
      },
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      command: () => {
        setVisible(false);
      },
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-envelope',
      command: () => {
        setVisible(false);
      },
    },
  ];

  const menu = <Menu model={menuItems} />;

  return (
    <div className="a">
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} />

      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div className="p-d-flex p-ai-center p-jc-center">
          <img
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            alt="logo"
            width="70"
            className="p-mr-2"
          />
          <span className="p-mr-auto p-mb-3">Brand Name</span>
        </div>
        {menu}
      </Sidebar>
      </div>
  );
};

export default SidebarComponent;
