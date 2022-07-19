import React from 'react';
import ReactDOM from 'react-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
interface Props {}

const LoadingScreen = (props: Props) => {
  return ReactDOM.createPortal(
    <div className="bg-transparent-300 fixed z-[1000] top-0 left-0 flex justify-center items-center w-screen h-screen">
      <MoreHorizIcon className="text-[100px] text-white animate-bounce" />
    </div>,
    document.getElementById('portal')!,
  );
};

export default LoadingScreen;
