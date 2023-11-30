import Axios from "axios";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";

function FormList({ onFormSelect }) {
  const [formData, setFormData] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchFormID();
  }, []);

  const fetchFormID = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await Axios.get(
        "http://localhost:9003/admin/form/allForms",
        {
          headers: headers,
        }
      );

      if (response.data.status === true) {
        setFormData(response.data.data);
      } else {
        console.error("Error fetching forms:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const openForm = () => {
    setShow(true);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <Button customButtonStyle="w-full" type="button" onClick={openForm} variant="primary">
        Assign form to this event
      </Button>

      {show && (
        <><select
          className="w-full p-2 rounded-[4px] h-[40px] mt-4 border-2"
          onChange={(e) => {
            setSelectedFormId(e.target.value);
          }}

          onClick={openForm}
        >
          <option value="" disabled hidden>
            List...
          </option>
          {formData.map((item) => (
            <option key={item.formId} value={item.formId}>
              {item.formId}
            </option>
          ))}
        </select>
        </>
      )}
    </div>
  );
}

export default FormList;
