//  @flow
import type { React$Component } from 'react';

type styleType = { [string]: string };
type WithStyleConnector<P> = {
    (component: StatelessComponent<P>): Class<React$Component<P>>,
    <Def, St>(component: Class<React$Component<Def, P, St>>): Class<React$Component<Def, P, St>>,
};
declare module 'vitaminjs' {
    declare export function withStyles<P>(style: styleType): WithStyleConnector<P>;
}
