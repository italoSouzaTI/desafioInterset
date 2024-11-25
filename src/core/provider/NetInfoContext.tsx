import React, { useState, createContext, useEffect, ReactNode } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNetInfoStore } from "@store/useNetInfoStore";

interface NetInfoProps {
    connection: boolean;
}

type ChildrenNetInfoProps = {
    children: ReactNode;
};

export const NetInfoContext = createContext<NetInfoProps>({} as NetInfoProps);

const NetInfoProvider: React.FC<ChildrenNetInfoProps> = ({ children }) => {
    const netInfo = useNetInfo();
    const { handleConnection } = useNetInfoStore((state) => state);

    useEffect(() => {
        console.log("netInfo.isConnected");
        if (netInfo.isConnected == true && netInfo.type != "vpn") {
            handleConnection(netInfo.isConnected);
        } else {
            handleConnection(netInfo.isConnected);
        }
    }, [netInfo.isConnected]);

    return <NetInfoContext.Provider value={{ connection }}>{children}</NetInfoContext.Provider>;
};

export default NetInfoProvider;
