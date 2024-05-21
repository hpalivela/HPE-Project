import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import dayjs from 'dayjs';
import { LineChart } from '@mui/x-charts/LineChart';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Performance = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [chartData, setChartData] = useState({ xLabels: [], uData: [], pData: [] });
  const [startDateTime, setStartDateTime] = useState(dayjs().subtract(24, 'hours'));
  const [endDateTime, setEndDateTime] = useState(dayjs());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3050/');
      if (response.status === 200 && response.data) {
        setPerformanceData(response.data);
      } else {
        throw new Error("Unexpected response structure.");
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && performanceData?.perfomanceData) {
      handleViewChange('perfomance/24hours');
    }
  }, [performanceData, loading]);

  const handleDateTimeChange = (setter) => (newDate) => {
    setter(newDate);
  };

  const handleViewChange = (view) => {
    if (!performanceData?.perfomanceData) {
      console.warn('performanceData is not available');
      return;
    }

    switch (view) {
      case 'perfomance/24hours':
        setChartData(performanceData.perfomanceData.last24HoursData || { xLabels: [], uData: [], pData: [] });
        break;
      case 'perfomance/weekly':
        setChartData(performanceData.perfomanceData.weeklyData || { xLabels: [], uData: [], pData: [] });
        break;
      case 'perfomance/biweekly':
        setChartData(performanceData.perfomanceData.biweeklyData || { xLabels: [], uData: [], pData: [] });
        break;
      default:
        console.warn(`Unknown view: ${view}`);
        break;
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.post('http://localhost:3050/performance/datarange', {
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      });
      setChartData(response.data.data || { xLabels: [], uData: [], pData: [] });
    } catch (error) {
      console.error('Error posting data:', error);
      setError('Error posting data. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const series = [
    { data: chartData?.uData, label: 'U-Data', color: 'blue' },
    { data: chartData?.pData, label: 'P-Data', color: 'darkblue' },
  ];

  return (
    <div>
      {error && (
        <div style={{ color: 'red', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <div className="d-flex justify-content-end" style={{ marginRight: '50px' }}>
        <DropdownButton title="Change View" id="dropdown-basic-button" className="mt-1">
          <Dropdown.Item onClick={() => handleViewChange('perfomance/24hours')}>24-Hour</Dropdown.Item>
          <Dropdown.Item onClick={() => handleViewChange('perfomance/weekly')}>Weekly</Dropdown.Item>
          <Dropdown.Item onClick={() => handleViewChange('perfomance/biweekly')}>Biweekly</Dropdown.Item>
          <Dropdown.Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <DateTimePicker
                  label="Start Date and Time"
                  value={startDateTime}
                  onChange={handleDateTimeChange(setStartDateTime)}
                />
                <DateTimePicker
                  label="End Date and Time"
                  value={endDateTime}
                  onChange={handleDateTimeChange(setEndDateTime)}
                />
                <button onClick={handleFetchData}>Fetch Data</button>
              </div>
            </LocalizationProvider>
          </Dropdown.Item>
        </DropdownButton>
      </div>

      {chartData?.xLabels?.length > 0 && (
        <LineChart
          width={900}
          height={200}
          series={series}
          xAxis={[{ scaleType: 'point', data: chartData?.xLabels }]}
        />
      )}
    </div>
  );
};

export default Performance;
