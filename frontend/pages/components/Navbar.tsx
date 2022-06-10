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
  font-size: 16px;
  font-weight: 500;
  padding: 0 12px;
  margin: 0 8px;
  text-decoration: none;
  border-radius: 5px;
  list-style: none;
  line-height: 32px;
  // text-align: left;
  text-align: center;
  cursor: pointer;
`;
const Nav = styled.nav`
  transition: background 0.2s linear;
  background: 0 0;
  display: block;
`;
const Navbar: any = () => {
  return (
    <Nav>
      <NavbarWrapper>
        <NavbarHeader>
          <Link href="/">
            <NavbarLink>Frome</NavbarLink>
          </Link>
        </NavbarHeader>
        <Stretchy></Stretchy>
        {/* <NavbarSubheader>
          <NavbarLink href="/login">link1</NavbarLink>
        </NavbarSubheader> */}
        <NavbarSubheader>
          <Link href="/signin">
            <NavbarLink>Sign In</NavbarLink>
          </Link>
        </NavbarSubheader>
        <NavbarSubheader>
          <Link href="/login">
            <NavbarLink>Get Started</NavbarLink>
          </Link>
        </NavbarSubheader>

        {/* <Link href="/login">login</Link> */}
      </NavbarWrapper>
    </Nav>
  );
};

export default Navbar;
