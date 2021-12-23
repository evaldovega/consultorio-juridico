import { FaAngleRight } from "react-icons/fa";

const MigaPan = ({ children }) => {
  const total = children.length - 1;
  return (
    <div className="d-flex align-items-center mb-4 migaPan">
      {children.map((c, index) => (
        <>
          {c}
          {index < total ? <FaAngleRight /> : null}
        </>
      ))}
    </div>
  );
};
export default MigaPan;
