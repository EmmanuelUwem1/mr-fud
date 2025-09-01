import Link from "next/link";
import Avatar from "./avater-circle";
import { useUser } from "@/context/userContext";
export default function UserProfileAvatar() {
    return (
      <Link
        href="/profile"
        className="inline-flex relative cursor-pointer -right-4"
      >
        <Avatar borderColor="#00C3FE" border src="/Image holder.png" />
      </Link>
    );
}