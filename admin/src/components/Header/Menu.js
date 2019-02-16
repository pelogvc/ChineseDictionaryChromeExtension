import React from 'react';
import { Menu, Icon } from 'antd';

const MenuComponent = ({setPage, page}) => {
    return (
        <div>
            <Menu 
            className="App-menu"
            mode="inline"
            theme="light"
            defaultSelectedKeys={[page]}
            selectedKeys={[page]}
            >
                <Menu.Item key="setting" onClick={() => setPage('setting')}>
                    <Icon type="setting" />
                    설정
                </Menu.Item>
                <Menu.Item key="recently" onClick={() => setPage('recently')}>
                    <Icon type="ordered-list" />
                    단어장
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default MenuComponent;