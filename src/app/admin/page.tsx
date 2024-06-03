"use client";

import { useSession, SessionProvider } from "next-auth/react";
import ButtonAuth from "../components/ButtonAuth";

function AdminPage() {
  return (
    <SessionProvider>
      <AdminPageContent />
    </SessionProvider>
  );
}

function AdminPageContent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>AdminPage</div>
      <ButtonAuth></ButtonAuth>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
}

export default AdminPage;
