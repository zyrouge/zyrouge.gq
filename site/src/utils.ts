import { AxiosError } from "axios";
import { UserInfo } from "./api";

export function getAxiosErrorMessage(err: AxiosError) {
    if (!err.response) return `${err.message}`;
    const statement =
        typeof err.response.data === "object"
            ? err.response.data.error
            : err.response.data;
    return `${err.response.status} - ${statement}`;
}

export const store = {
    getUser() {
        const raw = localStorage.getItem("userinfo");
        const user: UserInfo | null = raw ? JSON.parse(raw) : null;
        return user;
    },
    setUser(info: UserInfo) {
        localStorage.setItem("userinfo", JSON.stringify(info));
    }
}

export function random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function getAvatarFromInfo(user: UserInfo) {
    if (user.discord && user.discord.avatar)
		return `https://cdn.discordapp.com/avatars/${user.discord.id}/${user.discord.avatar}.${user.discord.avatar.startsWith("a_") ? "gif" : "png"}?size=1280`;

	if (user.github && user.github.avatarURL) return user.github.avatarURL;
    if (user.discord && user.discord.discrim)
        return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discord.discrim) % 5}.png?size=1280`;

	return `https://cdn.discordapp.com/embed/avatars/${random([0, 1, 2, 3, 4])}.png?size=1280`;
}