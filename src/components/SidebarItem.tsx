import clsx from "clsx";
import { NavLink, NavLinkProps } from "react-router-dom";

export type SidebarItemProps = NavLinkProps;
const SidebarItem = ({ className, children, ...props }: SidebarItemProps) => {
  return (
    <NavLink {...props} className={clsx("flex items-center gap-2", className)}>
      {children}
    </NavLink>
  );
};

export default SidebarItem;
