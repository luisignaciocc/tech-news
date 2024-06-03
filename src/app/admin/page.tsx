"use client";

import ButtonAuth from "../components/ButtonAuth";
import SessionAuthProvider from "../context/SessionAuthProvider";

function AdminPage() {
  return (
    <SessionAuthProvider>
      <div>AdminPage</div>
      <ButtonAuth></ButtonAuth>
    </SessionAuthProvider>
  );
}

export default AdminPage;
