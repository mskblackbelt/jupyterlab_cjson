import * as React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import AccessTime from '@mui/icons-material/AccessTime';
import AutoRenew from '@mui/icons-material/Autorenew';
import Backup from '@mui/icons-material/Backup';
import Done from '@mui/icons-material/Done';
import Help from '@mui/icons-material/Help';
import Launch from '@mui/icons-material/Launch';
import ReportProblem from '@mui/icons-material/ReportProblem';
import Notes from '@mui/icons-material/Notes';

import {blue, grey, indigo, lightGreen, red} from '@mui/material/colors';


import { CalculationState } from '../../utils/constants';
import { IconButton } from '@mui/material';

const blue200 = blue['200'];
const blue500 = blue['500'];
const red500 = red['500'];
const lightGreen200 = lightGreen['200'];
const lightGreenA700 = lightGreen['A700'];
const grey300 = grey['300'];
const indigoA200 = indigo['A200'];

const statusToStyle = (status) => {
    const iconMap = {
      [CalculationState.initializing.name]: {
        icon: <Launch/>,
        color: indigoA200,
      },
      [CalculationState.queued.name]: {
        icon: <AccessTime/>,
        color: lightGreen200,
      },
      [CalculationState.running.name]: {
        icon: <AutoRenew/>,
        color: lightGreenA700
      },
      [CalculationState.error.name]: {
        icon: <ReportProblem/>,
        color: red500,
      },
      [CalculationState.complete.name]: {
        icon: <Done/>,
        color: blue500,
      },
      [CalculationState.uploading.name]: {
        icon: <Backup/>,
        color: blue200,
      }
    };

    if (status in iconMap) {
      return iconMap[status]
    }
    else {
      return {
        icon: <Help/>,
        color: grey300
      }
    }
}

class CalculationMonitorTable extends React.Component {
  render() {
    const { calculations, title,  onSelect } = this.props;

    return (
      <div>
        <Typography variant="subheading" color="textSecondary" align="center">{title}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip="ID">ID</TableCell>
              <TableCell tooltip="Code">Code</TableCell>
              <TableCell tooltip="Type">Version</TableCell>
              <TableCell tooltip="The Status">Status</TableCell>
              <TableCell tooltip="The Status">Logs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calculations.map( (calculation, index) => {
              const code = calculation.code || {name: null, version: null};
              return (
                <TableRow key={index}>
                  <TableCell>{calculation.name}</TableCell>
                  <TableCell>{code.name ? code.name : ''}</TableCell>
                  <TableCell>{code.version ? code.version : ''}</TableCell>
                  <TableCell>
                    <Chip
                      style={{backgroundColor: 'transparent'}}
                      avatar={
                        <Avatar style={{backgroundColor: statusToStyle(calculation.status).color, color: 'white'}}>
                          {statusToStyle(calculation.status).icon}
                        </Avatar>
                      }
                      label={calculation.status ? calculation.status.toUpperCase() : ''}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {onSelect(calculation.name)}} size="large">
                      <Notes/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

// CalculationMonitorTable.propTypes = {
//   calculations: PropTypes.array,
//   title: PropTypes.string,
// }

CalculationMonitorTable.defaultProps = {
  calculations: [],
  title: 'Pending Calculations'
}

export default CalculationMonitorTable
