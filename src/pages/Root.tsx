import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
} from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
// import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

interface NavToggleProps {
  expand: boolean;
  onChange: (event: React.MouseEvent) => void;
}
const NavToggle: React.FC<NavToggleProps> = ({ expand, onChange }) => {
  return (
    <Navbar className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={
            <CogIcon
              style={{ width: 20, height: 20 }}
              //    size="sm"
            />
          }
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const Root = () => {
  const [expand, setExpand] = React.useState(true);
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: "flex", flexDirection: "column" }}
          width={expand ? 260 : 56}
          collapsible
        >
          {expand && (
            <Sidenav.Header>
              <div
                style={{
                  padding: 18,
                  fontSize: 16,
                  height: 56,
                  background: "#34c3ff",
                  color: " #fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <span style={{ marginLeft: 5 }}> BRAND</span>
              </div>
            </Sidenav.Header>
          )}
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["3"]}
            // appearance="inverse"
          >
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
                <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Families"
                  icon={<MagicIcon />}
                  placement="rightStart"
                >
                  <NavLink to="/Families">
                    <Nav.Item eventKey="3-1" href="/Families">
                      Show Families
                    </Nav.Item>
                  </NavLink>

                  <NavLink to="/add-family">
                    <Nav.Item eventKey="3-2" href="/add-family">
                      Add Family
                    </Nav.Item>
                  </NavLink>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container>
          <Header></Header>
          <Content>
            <div>
              <Outlet />
            </div>
          </Content>
        </Container>
      </Container>
    </div>
  );
};

export default Root;
