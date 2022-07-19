import React, { useCallback, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {}

const withLayout = (Page: React.ComponentType) => {
  const WithLayout = (props: Props) => {
    const [isSidebarExpand, setIsSidebarExpand] = useState(true);

    const onToggleSidebarExpand = useCallback(() => setIsSidebarExpand((isSidebarExpand) => !isSidebarExpand), []);

    return (
      <div className="text-white flex flex-col min-h-screen">
        <Header onToggleSidebarExpand={onToggleSidebarExpand} />
        <div className="flex-1 flex [&>*]:h-[calc(100vh-75px)]">
          <Sidebar isSidebarExpand={isSidebarExpand} onToggleSidebarExpand={onToggleSidebarExpand} />
          <main className="bg-color-secondary flex-1 p-10 pb-0 scrollbar-primary">
            <Page {...props} />
          </main>
        </div>
      </div>
    );
  };

  return WithLayout;
};

export default withLayout;
