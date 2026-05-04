import { Role } from "./types";

export interface MenuItem {
  label: string;
  link: string;
  icon: string;
  roles: Role[];
}
