import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { replace } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Action } from 'typesafe-actions';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Fade } from '@mui/material';
import { logout } from '../../modules/auth/redux/authReducer';
import { ROUTES } from '../../configs/routes';

interface Props {
  onToggleSidebarExpand: () => void;
}

const Header = ({ onToggleSidebarExpand }: Props) => {
  const [isOpenUserPopup, setIsOpenUserPopup] = useState(false);
  const user = useSelector((state: IAppState) => state.profile.user);
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();

  const onOpenUserPopup = useCallback(() => setIsOpenUserPopup(true), []);
  const onCloseUserPopup = useCallback(() => setIsOpenUserPopup(false), []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(replace(ROUTES.login));
  };

  return (
    <header className="z-50 bg-color-primary sticky top-0 left-0 flex justify-between items-center h-[75px] p-5 shadow-primary shadow-color-secondary">
      <div className="flex items-center">
        <MenuIcon className="text-3xl text-gray-400 mr-4 hover:text-white" onClick={onToggleSidebarExpand} />
        <Link to={ROUTES.home}>
          <h1 className="text-3xl">Gear Focus Admin</h1>
        </Link>
      </div>
      <div className="relative group" onMouseOver={onOpenUserPopup} onMouseLeave={onCloseUserPopup}>
        <PersonOutlineIcon className="text-3xl text-gray-400 group-hover:text-white" />
        <Fade in={isOpenUserPopup} timeout={600} easing="ease-out">
          <div className="bg-white text-sm text-black absolute right-0 min-w-[200px] p-4 rounded-lg">
            <Link className="hover:text-color-blue" to={`${ROUTES.userUserDetail}/${user?.profile_id}`}>
              My profile
            </Link>
            <p className="text-gray-400 mb-2">{user?.login}</p>
            <p className="text-black cursor-pointer hover:text-color-blue" onClick={onLogout}>
              Log out
            </p>
          </div>
        </Fade>
      </div>
    </header>
  );
};

export default Header;
