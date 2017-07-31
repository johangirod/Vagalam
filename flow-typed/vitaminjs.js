//  @flow
import type { React$Component } from 'react';

type styleType = { [string]: string };
declare var withStyles: <StyledComponent: React$Component>(
    style: styleType,
) => StyledComponent => StyledComponent;
