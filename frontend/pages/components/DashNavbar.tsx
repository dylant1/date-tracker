import Link from "next/link";
import {
  NavbarWrapper,
  NavbarHeader,
  NavbarSubheader,
  Stretchy,
} from "../../styles/components";
import styled from "styled-components";
const NavbarLink = styled.a`
  display: inline-block;
  font-size: 1.4rem;
  line-height: 1.5rem;
  font-weight: 500;
  padding: 7px 12px 8px 12px;
  margin: 0 8px;
  text-decoration: none;
  list-style: none;
  line-height: 32px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    opacity: 0.6;
  }
`;
const Add = styled.div`
  padding: 0px 10px;
  background-color: #32cd32;
  font-size: 30px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: green;
    transition: 0.5s;
  }
`;

const NavbarLogo = styled(NavbarLink)`
  &:hover {
    background-color: #121215;
    color: white;
    opacity: 1;
  }
  outline: 0;
  border: 0;
  color: #e8e8f4;
  font-size: 1.5rem;
  line-height: 32px;
  font-weight: 700;
`;
const Nav = styled.nav`
  transition: background 0.2s linear;
  background: 0 0;
  display: block;
`;
const DashNavbar: any = () => {
  return (
    <Nav>
      <NavbarWrapper>
        <NavbarHeader>
          <Link href="/home">
            <NavbarLogo>Frome</NavbarLogo>
          </Link>
        </NavbarHeader>
        <Stretchy></Stretchy>
        <NavbarSubheader>
          <Link href="/explore">
            <NavbarLink>Explore</NavbarLink>
          </Link>
        </NavbarSubheader>
        <Link href="/home/create">
          <Add>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              +
            </span>
          </Add>
        </Link>
      </NavbarWrapper>
    </Nav>
  );
};

export default DashNavbar;
