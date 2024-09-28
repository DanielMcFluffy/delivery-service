import React from "react";

export const Loading = ({showLoading}: {showLoading: boolean}) => {

  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (!showLoading) {
      setTimeout(() => {
        setIsVisible(false)
      }, 500);
    }

    return setIsVisible(true);
  }, [showLoading])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
          ${isVisible ? 'visible' : 'invisible'}
          transition-opacity duration-400 ease-in-out 
          ${showLoading ? "opacity-100 visible" : "opacity-0"}`}
      >
        <div className="text-white text-xl">Loading...</div>
      </div>
    </>
  );
}