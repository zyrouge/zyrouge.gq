import axios from "axios";

const isProd = import.meta.env.MODE === "production";

const apiBase = isProd
    ? "https://server.zyrouge.gq"
    : "http://localhost:8080";

const requester = axios.create({
    baseURL: apiBase,
    withCredentials: true
});

export interface APIPlan {
    name: string;
    role?: string;
    maxRequests: number;
    requestInterval: number;
    tier: number;
}

export interface UserInfo {
    userID: string;
    username?: string;
    api?: {
        logs: {
            message: string;
            time: number;
        }[];
        token?: string;
    }
    discord?: {
        id: string;
        username: string;
        discrim: string;
        avatar: string;
        email: string;
    }
    github?: {
        id: string;
        username: string;
        dispname: string;
        avatarURL: string;
        email: string;
    }
    level?: {
        points: number;
        level: number;
    }
    createdAt: number;
    inServer: boolean;
	staff: boolean;
    plan: APIPlan;
}

export interface IResponse {
    message?: string;
    error?: string;
    user?: UserInfo | null;
    logged?: boolean;
}

interface IAPIDocsField {
    roup: string;
    type: string;
    optional: boolean;
    field: string;
    description: string;
}

export interface IBadge {
    name: string;
    url: string;
    thresh: number;
}

export interface IAPIDocsResponse {
    plans: { [s: string]: APIPlan; };
    docs: {
        name: string;
        url: string;
        type: string;
        parameter: {
            fields: {
                Parameter: IAPIDocsField[];
            };
        };
        success: {
            fields: {
                [s: string]: IAPIDocsField[];
            };
        };
    }[];
    apiInfo: {
        url: string;
        version: string;
        generator: {
            time: string;
        };
    };
}

export interface IBasicUserInfo {
    id: string;
    username: string | undefined;
    createdAt: number;
    badges: IBadge[];
    avatar: string;
    isUser: boolean;
}

export interface IDetailedInfo {
    user: UserInfo;
    details: {
        api: {
            currentRequests: {
                resetAt: number | null;
                remaining: number;
                count: number;
                startTime: number | null;
            };
        };
        username: string;
        createdAt: number;
        badges: {
            name: string;
            url: string;
            thresh: number;
        }[];
        avatar: string;
    };
}

export interface IEditableUserInfo {
    username?: string;
}

const API = {
    /* Base URLs */
    BaseURL: apiBase,
    APIBase: `${apiBase}/api`,
    Client: requester,

    /* Authentication */
    DiscordLogin: `${apiBase}/auth/discord/login`,
    GithubLogin: `${apiBase}/auth/github/login`,
    Logout: `${apiBase}/logout`,

    /* User Details */
    GetBasicInfo: () => requester.get<IResponse>("/profile/me/basic"),
    GetDetailedInfo: () => requester.get<IDetailedInfo>("/profile/me/details"),
    GetUserInfo: (userID: string = "me") => requester.get<IResponse & {
        userInfo: IBasicUserInfo;
    }>(`/profile/${userID}`),
    UpdateInfo: (nUser: IEditableUserInfo) => requester.patch<IResponse>("/profile/me/details", nUser),
    ChangeAPIKey: () => requester.post<IResponse>("/profile/me/details/key"),
    RemoveAPIKey: () => requester.delete<IResponse>("/profile/me/details/key"),

    /* API */
    GetAPIDocs: () => requester.get<IAPIDocsResponse>("/api/docs")
}

export default API;

export function getUserInfo(info?: { logged?: boolean; user?: UserInfo | null; } | null) {
    if (!info || !info.hasOwnProperty("logged") || typeof info.logged !== "boolean") return undefined;
    return {
        logged: info.logged,
        user: info.logged && info.user ? info.user : null
    }
}