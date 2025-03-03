import { getUserById } from "@/actions/get-user-by-id";
import { auth } from "@/auth";
import { EditUserForm } from "@/components/edit-user-form";
import { redirect } from "next/navigation";

type Params = Promise<{ userId: string }>;

export default async function EditUserPage({ params }: { params: Params }) {
  const session = await auth();
  
    if (!session) redirect("/login");
	const { userId } = await params;
  const userData = await getUserById(userId)
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Edit User</h1>
			<EditUserForm user={userData} />
		</div>
	);
}
