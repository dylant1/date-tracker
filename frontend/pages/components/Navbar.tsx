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
    border-color: #7bdaa1;
    color: #7bdaa1;
  }
  border: 1px solid rgba(232, 232, 244, 0.1);
`;
const Login = styled.div`
  font-weight: 500;
  opacity: 0.6;
  font-size: 1.2rem;
  &:hover {
    opacity: 1;
    transition: 0.5s;
    cursor: pointer;
  }
`;
const NavbarLogo = styled(NavbarLink)`
  &:hover {
    background-color: #121215;
    color: white;
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
  position: sticky;
  top: 0;
`;
const Navbar: any = () => {
  return (
    <Nav>
      <NavbarWrapper>
        <NavbarHeader>
          <Link href="/">
            <NavbarLogo>Frome</NavbarLogo>
          </Link>
        </NavbarHeader>
        <Stretchy></Stretchy>
        <NavbarSubheader>
          <Link href="/signup">
            <NavbarLink>Sign Up</NavbarLink>
          </Link>
        </NavbarSubheader>
        {/* <NavbarSubheader> */}
        <Link href="/login">
          <Login>or log in</Login>
        </Link>
      </NavbarWrapper>
    </Nav>
  );
};

export default Navbar;
