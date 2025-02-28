import { getUserById } from "@/actions/get-user-by-id";
import { EditUserForm } from "@/components/edit-user-form";

export default async function EditUserPage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUserById(params.userId);

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <EditUserForm data={params?.userId} />
    </div>
  );
}