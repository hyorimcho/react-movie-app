import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle, MdOutlineSearch } from "react-icons/md";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ModalPortal from "./Modal/ModalPortal";
import Modal from "./Modal/Modal";
import useToggle from "../hooks/useToggle";
import useLocalStorage from "../hooks/useLocalStorage";

const NavBar = () => {
  const [toggle, setToggle] = useToggle();
  const [auth, setAuth] = useLocalStorage("auth", false);
  const [session, setSession] = useLocalStorage("session", null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuth(false);
    }, 1000 * 60 * 60);
    return () => {
      clearTimeout(timer);
    };
  }, [auth]);

  const logout = () => {
    setAuth(false);
    setSession(null);
    navigate("/");
  };

  return (
    <StyledNav>
      <Container>
        <Logo>
          <Link to="/">Home</Link>
        </Logo>

        <RightWrapper>
          <SearchWrapper>
            <MdOutlineSearch />
            <SearchBar type="text" id="search" />
          </SearchWrapper>
          {auth && session ? (
            <>
              <StyledLink to="/account">
                <MdOutlineAccountCircle />
              </StyledLink>
              <Button type="button" onClick={logout}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button type="button" onClick={setToggle}>
              로그인
            </Button>
          )}
          <AnimatePresence>
            {toggle ? (
              <ModalPortal>
                <Modal
                  setToggle={setToggle}
                  auth={auth}
                  setAuth={setAuth}
                  setSession={setSession}
                />
              </ModalPortal>
            ) : null}
          </AnimatePresence>
        </RightWrapper>
      </Container>
    </StyledNav>
  );
};
export default NavBar;

const StyledNav = styled.nav`
  width: 100%;
  background-color: #fff;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 1px solid lightgray;
`;

const Container = styled.div`
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 6px;
  }
`;

const SearchBar = styled.input`
  padding: 0.25rem 1.5rem;
  border: 1px solid lightgray;
  background-color: lightgray;
  min-height: 30px;
  width: 250px;
`;

const Button = styled.button`
  border: 1px solid #000;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  min-height: 30px;
`;

const StyledLink = styled(Link)`
  svg {
    width: 24px;
    height: 24px;
  }
`;
