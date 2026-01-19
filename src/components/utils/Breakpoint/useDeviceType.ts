import {useMediaQuery} from "react-responsive";
type DeviceType = 'isDesktop' | 'isTablet' | 'isMobile';

export function useDeviceType(minTabletWidth = 768, minDesktopWidth = 1440): DeviceType {
    const isDesktop = useMediaQuery({minWidth: minDesktopWidth});
    const isTablet=useMediaQuery({minWidth: minTabletWidth, maxWidth: (minDesktopWidth - 1)})

    return isDesktop ? "isDesktop" : isTablet ? "isTablet" : "isMobile";
}

