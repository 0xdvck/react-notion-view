export type UserStatus = "active" | "inactive" | "pending";
export type UserPriority = "low" | "medium" | "high";

export type User = {
    id: string;
    name: string;
    company: string;
    status: UserStatus;
    priority: UserPriority;
}