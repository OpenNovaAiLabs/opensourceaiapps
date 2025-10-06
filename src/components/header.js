import React from "react"
import { Link } from "gatsby"
import {
  Box,
  PseudoBox,
  Text,
  useColorMode,
  useDisclosure,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/core"
import Logo from "./logo"
import MyLogo from "./logo.png";

export default function Header({ children, location }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const navItem = ({ name, to, my, onClick }) => (
    <Link to={to} onClick={onClick}>
      <PseudoBox
        fontSize=".875rem"
        color="white"
        fontWeight="500"
        bg={location.pathname === to && "#304571"}
        _hover={{ color: "gray.50", bg: location.pathname != to && "#1a294c" }}
        px={2}
        py={1}
        mx={2}
        borderRadius={3}
        my={my}
      >
        {name}
      </PseudoBox>
    </Link>
  )

  return (
    <Box
      bg="gray.800"
      boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
    >
      <Box px={{ md: "2rem" }}>
        <Box
          as="nav"
          position="relative"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          p=".75rem"
        >
          <Box flex={3}>
            <Link to="/">
              <Box display="flex" my={3} pr={2}>
                <Box minWidth="46px" maxWidth="0px">
                  <img
                      src={MyLogo}
                      style={{ height: "50px", borderRadius: "8px" }}
                  />
                </Box>
                <Box>
                  <Text
                    color="gray.200"
                    pl=".6rem"
                    fontWeight={800}
                    fontSize="sm"
                    lineHeight=".8rem"
                    letterSpacing="widest"
                  >
                    OPENSOURCE
                  </Text>
                  <Text
                    color="white"
                    pl={2}
                    fontWeight={500}
                    fontSize="4xl"
                    lineHeight="2.3rem"
                    letterSpacing=".5px"
                  >
                    AI Apps
                  </Text>
                </Box>
              </Box>
            </Link>
          </Box>
          <>
            <Popover>
              {({ isOpen, onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button
                      ml="auto"
                      px={1}
                      bg="transparent"
                      color="#9fa6b2"
                      display={{
                        base: "flex",
                        sm: "none",
                      }}
                      _hover={{ bg: "#374151", color: "#fff" }}
                      ref={btnRef}
                      onClick={onOpen}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6H20M4 12H20M4 18H20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent zIndex={4} width="200px" py={2} bg="gray.800">
                    <PopoverBody>
                      {process.env.NODE_ENV === "development" &&
                        navItem({
                          to: "/edit",
                          name: "Edit",
                          my: 2,
                          onClick: onClose,
                        })}
                      {navItem({
                        to: "/category",
                        name: "Alternatives",
                        my: 2,
                        onClick: onClose,
                      })}
                      {navItem({
                        to: "/requests",
                        name: "Requests",
                        my: 2,
                        onClick: onClose,
                      })}
                      {navItem({
                        to: "/about",
                        name: "About",
                        my: 2,
                        onClick: onClose,
                      })}
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>
          </>
          <Box display={{ base: "none", sm: "flex" }}>
            {process.env.NODE_ENV === "development" &&
              navItem({ to: "/edit", name: "Edit" })}
            {navItem({ to: "/category", name: "Alternatives" })}
            {navItem({ to: "/requests", name: "Requests" })}
            {navItem({ to: "/about", name: "About" })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
