import React, { useState } from "react";
import Form from "../../Components/Common/From/Form";
import AdminForm from "../../Components/Admin/AdminForm";

export default function AddDiscount() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        className="bg-dark-green text-white px-4 py-2 rounded"
        onClick={() => setIsFormOpen(true)}
      >
        Open Admin Form
      </button>

      <Form isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <AdminForm />
      </Form>
    </div>
  );
}
