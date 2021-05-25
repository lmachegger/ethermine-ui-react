import './App.css';
import React, { useEffect } from 'react';
import Header from './components/Header';
import StatContent from './components/StatContent';
import { fetchData } from './utils/fetch-data';
import { useState } from 'react';
import { defaultData } from './utils/default-data';
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from './Theme';

const App = () => {
  const [stats, setStats] = useState(defaultData);

  useEffect(() => {
    fetchData((data) => {
      setStats(data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <StatContent data={stats} />
      </div>
    </ThemeProvider>
  );
};

export default App;
