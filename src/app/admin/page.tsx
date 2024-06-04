"use client";

import { useSession } from "next-auth/react";

import ButtonAuth from "../components/button-auth";
import SessionAuthProvider from "../components/session-auth-provider";

function AdminPage() {
  return (
    <SessionAuthProvider>
      <AdminPageContent />
    </SessionAuthProvider>
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