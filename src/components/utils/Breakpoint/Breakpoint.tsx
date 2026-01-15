import {useMediaQuery} from "react-responsive";
import type {ReactNode} from "react";

type DeviceType = 'isDesktop' | 'isTablet' | 'isMobile';

export function DeviceType(minTabletWidth = 768, minDesktopWidth = 1440): DeviceType {
    const isDesktop = useMediaQuery({minWidth: minDesktopWidth});
    const isTablet=useMediaQuery({minWidth: minTabletWidth, maxWidth: (minDesktopWidth - 1)})

    return isDesktop ? "isDesktop" : isTablet ? "isTablet" : "isMobile";
}

export const DesktopBreakpoint = ({children}: { children: ReactNode }) => {
    return DeviceType()==="isDesktop" ? children : null
}
export const TabletBreakpoint = ({children}: { children: ReactNode }) => {
    return DeviceType()==="isTablet" ? children : null
}
export const MobileBreakpoint = ({children}: { children: ReactNode }) => {
    return DeviceType()==="isMobile" ? children : null
}