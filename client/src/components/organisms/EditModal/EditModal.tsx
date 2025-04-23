// // src/components/organisms/EditModal/EditModal.tsx
// import React from 'react';
// import Modal from 'react-modal';
// import Input from '@components/atoms/Input/Input';
// import Button from '@components/atoms/Button/Button';

// interface EditModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   editText: string;
//   onEditTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   editAssignedTo: string;
//   onEditAssignedToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSubmit: () => void;
//   onCancel: () => void;
// }

// const EditModal: React.FC<EditModalProps> = ({
//   isOpen,
//   onRequestClose,
//   editText,
//   onEditTextChange,
//   editAssignedTo,
//   onEditAssignedToChange,
//   onSubmit,
//   onCancel,
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Edit Task"
//       className="edit-modal"
//       overlayClassName="edit-modal-overlay"
//     >
//       <div className="edit-modal__header">Edit Task</div>
//       <div className="edit-modal__body">
//         <Input
//           type="text"
//           placeholder="Task description"
//           value={editText}
//           onChange={onEditTextChange}
//           className="edit-modal__input"
//         />
//         <Input
//           type="text"
//           placeholder="Assigned to"
//           value={editAssignedTo}
//           onChange={onEditAssignedToChange}
//           className="edit-modal__input"
//         />
//       </div>
//       <div className="edit-modal__actions">
//         <Button onClick={onSubmit}>Save Changes</Button>
//         <Button onClick={onCancel}>Cancel</Button>
//       </div>
//     </Modal>
//   );
// };

// export default EditModal;

// src/components/organisms/EditModal/EditModal.tsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Input from '@components/atoms/Input/Input';
import Button from '@components/atoms/Button/Button';
import Select from '@components/atoms/Select/Select';
import Label from '@components/atoms/Label/Label';

interface Employee {
  _id: string;
  name: string;
}

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editText: string;
  onEditTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editAssignedTo: string;
  onEditAssignedToChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  userInfo?: { token: string }; // Added userInfo prop
}

// const BASE_URL = 'http://localhost:7000';
const BASE_URL = 'https://task-mngmt-infoempleados.onrender.com';

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  editText,
  onEditTextChange,
  editAssignedTo,
  onEditAssignedToChange,
  onSubmit,
  onCancel,
  userInfo,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!userInfo) return;
      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(
          `${BASE_URL}/api/users/employees`,
          config
        );
        setEmployees(data as Employee[]);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [userInfo]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
      className="edit-modal"
      overlayClassName="edit-modal-overlay"
    >
      <div className="edit-modal__header">Edit Task</div>
      <div className="edit-modal__body">
        <Input
          type="text"
          placeholder="Task description"
          value={editText}
          onChange={onEditTextChange}
          className="edit-modal__input"
        />
        <Label htmlFor="assignedTo" className="task-form__label" required>
          Assign To
        </Label>
        <Select
          id="assignedTo"
          value={editAssignedTo}
          onChange={onEditAssignedToChange}
          className="task-form__input"
          required
          ariaLabel="Assign To Dropdown"
          ariaRequired
          disabled={loading}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </Select>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="edit-modal__actions">
        <Button onClick={onSubmit}>Save Changes</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default EditModal;