import React from "react";
import { useState } from "react";
import FormList from "../FormList";
import EventFormModal from "./EventFormModal";

function ComonEventFormID() {
  const [selectedFormId, setSelectedFormId] = useState(undefined);

  const handleFormSelect = (formId) => {
    setSelectedFormId(formId);
  };

  return (
    <div>
      <FormList onFormSelect={handleFormSelect} />
      <EventFormModal selectedFormId={selectedFormId} />
    </div>
  );
}

export default ComonEventFormID;
