import { useState } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import StockDashboard from './components/StockDashboard';
import PlaceholderPage from './components/PlaceholderPage';

/**
 * App Component
 * 
 * The main entry point of the application.
 * It handles the global layout structure including the Sidebar (Desktop) and BottomNav (Mobile).
 * It also acts as a simple router, rendering different components based on the `activeModule` state.
 */
function App() {
  // State to track the currently active module (e.g., 'stocks', 'real-estate')
  const [activeModule, setActiveModule] = useState('stocks');

  /**
   * Renders the content area based on the active module.
   * Currently, only 'stocks' is fully implemented. Other modules show a placeholder.
   */
  const renderContent = () => {
    switch (activeModule) {
      case 'home':
        return <PlaceholderPage title="홈" />;
      case 'stocks':
        return <StockDashboard />;
      case 'real-estate':
        return <PlaceholderPage title="부동산" />;
      case 'bank':
        return <PlaceholderPage title="예금/적금" />;
      case 'cards':
        return <PlaceholderPage title="카드" />;
      case 'ledger':
        return <PlaceholderPage title="가계부" />;
      case 'menu':
        return <PlaceholderPage title="전체 메뉴" />;
      default:
        return <StockDashboard />;
    }
  };

  return (
    <>
      {/* 
        Sidebar Navigation 
        - Visible only on Desktop/Tablet (md breakpoint and up)
        - Hidden on Mobile
      */}
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      {/* 
        Main Layout Container
        - Handles responsive padding and positioning
      */}
      <Layout>
        {renderContent()}
      </Layout>

      {/* 
        Bottom Navigation
        - Visible only on Mobile (below md breakpoint)
        - Hidden on Desktop
      */}
      <BottomNav activeModule={activeModule} onModuleChange={setActiveModule} />
    </>
  );
}

export default App;
