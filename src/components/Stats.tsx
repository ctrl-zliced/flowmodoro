import React from 'react';
import {Typography as Text} from '@mui/material';

const Stats = () => {
    const [sessions, setSessions] = React.useState(0);

  return (
    <div className="flex flex-col items-start justify-between">
        <Text variant="body2">Flow: 1:45 hrs (2 Flows)</Text>
        <Text variant="body2">Break: 21 mins </Text>
    </div>
  );
};

export default Stats;
