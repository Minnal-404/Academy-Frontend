import React from "react";

const RejectReasonBox = ({
  title = "Reason for Rejection",
  onCancel,
  onReject,
  reason,
  setReason,
}) => {
  return (
    <div
      style={{
        minWidth: "500px",
      }}
      className="border border-danger border-5 rounded p-5 bg-black d-flex flex-column gap-4"
    >
      <h4 className="text-danger">{title}</h4>

      <textarea
        className="form-control"
        placeholder="Enter the reason for rejection"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      ></textarea>

      <div className="d-flex justify-content-center gap-5">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onReject}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default RejectReasonBox;
