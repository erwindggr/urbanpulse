import { useMediaQuery as chakraUseMediaQuery } from "@chakra-ui/react";

export const usePhoneScreenMediaQuery = () => chakraUseMediaQuery("(max-width: 930px)");
export const useTabletScreenMediaQuery = () => chakraUseMediaQuery("(min-width: 931px) and (max-width: 1450px)");
export const useDesktopScreenMediaQuery = () => chakraUseMediaQuery("(min-width: 1201px)");
