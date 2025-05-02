import { Outlet } from 'react-router-dom';

const AllUpdatesLayout = () => {
  return (
    <div>
      <h2>All Updates</h2>
      {/* Add nav links if needed */}
      <Outlet /> {/* This is where TechUpdates or EnglishUpdates will render */}
    </div>
  );
};

export default AllUpdatesLayout;
