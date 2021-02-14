import {
  Avatar,
  AvatarBadge,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Auth } from "../../Utils/firebase";
import { TextContext } from "../TextProvider";

interface Props {
  name?: string | null;
  url?: string | null;
}

const UserAvatar = (props: Props) => {
  const text = React.useContext(TextContext);
  const avatarSize = useBreakpointValue({
    base: "sm",
    xs: "sm",
    sm: "md",
    md: "md",
  });

  return (
    <Menu>
      <MenuButton>
        <Avatar
          cursor="pointer"
          src={props.url ? props.url : ""}
          name={props.name ? props.name : ""}
          size={avatarSize}
        />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <NavLink to="/change-language">
            {text.UserAvatar.changeLanguage}
          </NavLink>
        </MenuItem>
        <MenuItem
          onClick={() => {
            Auth.signOut();
          }}
        >
          {text.UserAvatar.signOut}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserAvatar;
