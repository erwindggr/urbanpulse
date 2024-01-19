import { useMediaQuery as chakraUseMediaQuery } from "@chakra-ui/react";

export const usePhoneScreenMediaQuery = () => chakraUseMediaQuery("(max-width: 800px)");
export const useTabletScreenMediaQuery = () => chakraUseMediaQuery("(min-width: 801px) and (max-width: 1200px)");
export const useDesktopScreenMediaQuery = () => chakraUseMediaQuery("(min-width: 1201px)");
