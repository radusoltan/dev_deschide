import {getItem} from "../../utils/menu";
import {Link, NavLink, useLocation, useParams, useRoutes} from "react-router-dom";
import {AppstoreOutlined, MailOutlined, PieChartOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {Menu} from "antd";

export const Navigation = () => {
    const {pathname} = useLocation()
    console.log('route', pathname)
    const {t} = useTranslation()
    const items = [
        getItem(<Link to='/'>{t('menu.dashboard')}</Link>, '/', <PieChartOutlined />),
        getItem(t("menu.content.head"), 'content', <MailOutlined />, [
            getItem(<NavLink to="/content/categories">{t('menu.content.categories')}</NavLink>, '/content/categories'),
            getItem(<NavLink to="/content/articles">{t('menu.content.articles')}</NavLink>, '/content/articles'),
        ]),
        getItem(t('menu.management.head'), 'management', <AppstoreOutlined />, [
            getItem(<NavLink to="/management/users">{t("menu.management.users")}</NavLink>, '/management/users'),
            getItem(<NavLink to="/management/roles">{t("menu.management.roles")}</NavLink>, '/management/roles'),
            getItem(<NavLink to="/management/permissions">{t("menu.management.permissions")}</NavLink>, 'management/permissions'),
        ]),
    ]
    return <Menu
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={['content', 'management']}
        mode="inline"
        theme="dark"
        items={items}
    />
}
