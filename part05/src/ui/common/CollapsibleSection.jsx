import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const CollapsibleSection = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const hiddenStyle = { display: isOpen ? "none" : "" };
  const visibleStyle = { display: isOpen ? "" : "none" };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => {
    return {
      toggle,
    };
  });

  return (
    <div className="collapsible-section">
      <div style={hiddenStyle}>
        <button onClick={toggle}>{props.toggleLabel}</button>
      </div>
      <div style={visibleStyle}>
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  );
});

CollapsibleSection.displayName = "CollapsibleSection";

CollapsibleSection.propTypes = {
  toggleLabel: PropTypes.string.isRequired,
};

export default CollapsibleSection;
