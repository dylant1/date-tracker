import styled from "styled-components";
import Link from "next/link";
const HeroWrapper = styled.div`
  max-width: 1180px;
  padding: calc(40vh) 22px;
  padding-top: 30vh;
  padding-bottom: 45vh;
  margin: 50px auto;
  height: auto;
  text-align: center;
  display: block;
  overflow: hidden;
  @media (max-width: 1180px) {
    max-width: 800px;
  }
`;
const Main = styled.div`
  // overflow: hidden;
  display: block;
`;
const Header = styled.div`
  font-size: 76px;
  font-weight: 800;
  margin: 0;
  padding: 0;
  line-height: 1.1em;
  display: block;
  @media (max-width: 1180px) {
    font-size: 50px;
  }
`;

const Subheader = styled.div`
  font-size: 24px;
  margin: 1em 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

const NavbarWrapper = styled.ul`
  max-width: 1180px;
  margin: 0 auto;
  padding: 10px 22px;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  @media (max-width: 1180px) {
    max-width: 800px;
  }
`;
const NavbarSubheader = styled.li`
  font-size: 16px;
  list-style: none;
  line-height: 32px;
  margin-top: 4px;
  margin-left: 8px;
  margin-right: 8px;
  text-align: left;
  vertical-align: middle;
  //   padding: 0 8px;
`;

const NavbarHeader = styled.li`
  font-size: 21px;
  list-style: none;
  line-height: 32px;
  margin-top: 4px;
  text-align: left;
  display: list-item;
  font-weight: 700;
`;

const Stretchy = styled.li`
  flex: 1 1 0px;
  list-style: none;
  line-height: 32px;
  margin-top: 4px;
  text-align: left;
  vertical-align: middle;
  display: list-item;
`;
// const SignIn = styled(NavbarLink)`
//   display: inline-block;
//   font-size: 16px;
//   font-weight: 500;
//   padding: 0 12px;
//   margin: 0 8px;
//   text-decoration: none;
//   border-radius: 5px;
// `;
export {
  NavbarWrapper,
  HeroWrapper,
  NavbarHeader,
  NavbarSubheader,
  Header,
  Subheader,
  Main,
  Stretchy,
};
