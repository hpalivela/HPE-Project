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


const IOPS = () => {
  const [fullData, setFullData] = useState(null); // Full data set
  const [chartData, setChartData] = useState(); // Data for the chart
  const [startDateTime, setStartDateTime] = useState(dayjs().subtract(24, 'hours')); // Default to last 24 hours
  const [endDateTime, setEndDateTime] = useState(dayjs()); // Default to current time
  const [loading, setLoading] = useState(true); // Start in a loading state
  const [error, setError] = useState(null); // For error messages

  // Fetch all data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3050/'); // Adjust this to your API endpoint
      if (response.status === 200 && response.data) {
        // console.log(response.data,"response.data")
        setFullData(response.data); // Store the full data set
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
    if (!loading && fullData?.networkData) {
      handleViewChange('network/24hours'); // Default to 24-hour view on initial load
    }
  }, [fullData, loading]);

  const handleDateTimeChange = (setter) => (newDate) => {
    setter(newDate); // Set the new date/time
  };
  const handleViewChange = (view) => {
    // const now = dayjs();
    switch (view) {
      case 'network/24hours':
        setChartData(fullData.networkData.last24HoursData)
        break;
      case 'network/weekly':
        // console.log(fullData?.networkData?.weeklyData,"fullData.networkData.weeklyData)");
        setChartData(fullData.networkData.weeklyData)
        break;
      case 'network/biweekly':
        setChartData(fullData.networkData.biweeklyData)
        break;
      default:
        console.warn(`Unknown view: ${view}`);
        break;
    }
  };

  const handleFetchData = async () => {
    try {
    console.log(startDateTime,endDateTime,"selected dates")
      const response = await axios.post('http://localhost:3050/network/datarange', {
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      });
      console.log(startDateTime, endDateTime)
      // console.log('Data posted successfully:', response.data);
      setChartData(response.data.data)
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
  console.log(chartData, "chartData")
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
          <Dropdown.Item onClick={() => handleViewChange('network/24hours')}>24-Hour</Dropdown.Item>
          <Dropdown.Item onClick={() => handleViewChange('network/weekly')}>Weekly</Dropdown.Item>
          <Dropdown.Item onClick={() => handleViewChange('network/biweekly')}>Biweekly</Dropdown.Item>
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
export default IOPS;








