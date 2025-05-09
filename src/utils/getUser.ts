import type { IUser } from "@/types";

export default () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = user === "{}" ? null : (user as IUser);
    return response;
};
