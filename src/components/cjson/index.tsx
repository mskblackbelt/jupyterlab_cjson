import * as React from 'react';
import { Provider } from 'react-redux';
import { IChemJson } from '@openchemistry/types';
import { wc } from '../common/webcomponent';

import store from '../common'

import { makeStyles } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

// declare module '@mui/styles/defaultTheme' {
  // // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // interface DefaultTheme extends Theme {}
// }


const theme = createTheme();

export default makeStyles(
  (theme) => ({
    avatarExpense: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
    },
  }),
  { defaultTheme: theme }
);

export interface IProps {
  data: IChemJson;
  metadata: {
    moleculeRenderer: string;
    showSpectrum: boolean;
    showVolume: boolean;
    showIsoSurface: boolean;
    showMenu: boolean;
    mo: number | string;
    isoValue: number;
    mode: number;
    play: boolean;
    activeMapName?: string;
    colors?: [number, number, number][];
    colorsX?: number[];
    opacities?: number[];
    opacitiesX?: number[];
  };
}

export interface IState {
}


export class CJSONComponent extends React.Component<IProps, IState> {

  render() {
    const { data, metadata } = this.props;

    // We use React.createElement(...) here otherwise tsc complains about
    // our custom element.
    const ref = wc(
      // Events
      {},
      // Props
      {
        cjson: data,
        iOrbital: metadata.mo,
        iMode: metadata.mode,
        ...metadata
      }
    );
    const molecule = React.createElement('oc-molecule', {
      ref
    });

    return (
      <div>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <div style={{width: '100%', height: '40rem'}}>
                {molecule}
              </div>
            </Provider>
          </ThemeProvider>
        </StyledEngineProvider>
      </div>
    );
  }
}
