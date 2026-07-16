/// <reference types="node" />

declare module "mcapitr" {
  export interface ServerStatusOptions {
    legacy?: boolean;
    bedrock?: boolean;
  }

  export interface PlayerSample {
    name: string;
    id?: string;
  }

  export interface ServerPlayers {
    online: number;
    max: number;
    sample?: PlayerSample[];
  }

  export interface ServerVersion {
    name: string;
    protocol: number;
    name_clean?: string;
  }

  export interface ServerMotd {
    raw: string;
    clean: string;
    html: string;
  }

  export interface ServerStatusResponse {
    offline: boolean;
    error?: string;
    players?: ServerPlayers;
    version?: ServerVersion;
    motd?: ServerMotd;
    favicon?: string;
    roundTripLatency?: number;
    query?: {
      host: string;
      port: number;
      bedrock?: boolean;
    };
  }

  export interface PopularServer {
    address: string;
    online: number;
    max: number;
    favicon: string;
    motd: string;
    version: string;
    queryCount: number;
  }

  export interface RecentCheck {
    name: string;
    status: string;
    players: string;
    version: string;
    lastCheck: string;
  }

export default class MCAPITR {

/**
     * Generates an iframe widget URL for a server
     * @param address Server address (IP or domain)
     * @param size Widget size ('small', 'medium', 'large')
     * @param theme Widget theme ('dark' or 'light')
     */
    widget(address: string, size?: 'small' | 'medium' | 'large', theme?: 'dark' | 'light'): string;
  }
}
