import {useDeviceType} from "./useDeviceType.tsx";
import type {ReactNode} from "react";

export const DesktopBreakpoint = ({children}: { children: ReactNode }) => {
    return useDeviceType()==="isDesktop" ? children : null
}
export const TabletBreakpoint = ({children}: { children: ReactNode }) => {
    return useDeviceType()==="isTablet" ? children : null
}
export const MobileBreakpoint = ({children}: { children: ReactNode }) => {
    return useDeviceType()==="isMobile" ? children : null
}