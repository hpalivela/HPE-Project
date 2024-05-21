import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Stack } from '@mui/material';
import './DiagPie.css'
const items1 = [
  { value: 150, label: 'Series A ( ID )' },
  { id: 'id_B', value: 15, label: 'Series B' },
  { id: 'id_C', value: 20, label: 'Series C' },
  { id: 'id_D', value: 30, label: 'Series D' },
];
const colors1 = ['skyblue','orange','black','lightgreen'];
const items2 = [
  { value: 20, label: 'Series X ( ID )' },
  { id: 'id_Y', value: 25, label: 'Series Y' },
  { id: 'id_Z', value: 130, label: 'Series Z' },
  { id: 'id_W', value: 30, label: 'Series W' },
];
const colors2 = ['skyblue','orange','black','lightgreen'];
export default function OnSeriesItemClick() {
  const [selectedLabel1, setSelectedLabel1] = React.useState('');
  const [selectedLabel2, setSelectedLabel2] = React.useState('');

  const handleClick1 = (event, itemIdentifier, item) => {
    setSelectedLabel1(item.label);
  };

  const handleClick2 = (event, itemIdentifier, item) => {
    setSelectedLabel2(item.label);
  };

  return (
    <div>
      <h4 style={{ color: 'skyblue' }}>Recommended Actions</h4>
      <div>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          sx={{ width: '100%', overflow: 'hidden' }} // Hide overflow to remove scrollbar
        >
          <Typography
            component="pre"
            sx={{ maxWidth: { xs: '100%', md: '50%', flexShrink: 1 }, overflow: 'hidden' }}
          >
            {selectedLabel1}
          </Typography>

          <PieChart
            series={[
              {
                data: items1,
              },
            ]}
            colors={colors1}
            onClick={handleClick1}
            width={350}
            height={200}
            margin={{ right: 200 }}
          />
        </Stack>
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Diagnoses Type By Scores</p>
      </div>
      <div>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          sx={{ width: '100%', overflow: 'hidden' }} // Hide overflow to remove scrollbar
        >
          <Typography
            component="pre"
            sx={{ maxWidth: { xs: '100%', md: '50%', flexShrink: 1 }, overflow: 'hidden' }}
          >
            {selectedLabel2}
          </Typography>

          <PieChart
            series={[
              {
                data: items2,
              },
            ]}
            colors={colors2}
            onClick={handleClick2}
            width={350}
            height={200}
            margin={{ right: 200 }}
          />
        </Stack>
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Diagnoses Type By Scores</p>
      </div>
    </div>
  );
}
