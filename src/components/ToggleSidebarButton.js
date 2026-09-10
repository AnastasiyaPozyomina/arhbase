export default function ToggleSidebarButton() {
    const { isSidebarOpen, toggleSidebar } = useDocSidebarContext();
    return (
      <button onClick={toggleSidebar} style={{ marginLeft: '20px' }}>
        {isSidebarOpen ? 'Скрыть меню' : 'Показать меню'}
      </button>
    );
  }